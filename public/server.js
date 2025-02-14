const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const rateLimit = require("express-rate-limit");
const csurf = require("csurf");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs"); // Added to handle file operations

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key"; // Change this to a secure key
const JWT_SECRET = process.env.JWT_SECRET || "YOUR_SECRET_KEY"; // Use environment variable for secret
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/authdb"; // Use environment variable for MongoDB URI

const messagesFile = path.join(__dirname, "letters.json"); // Updated to letters.json

app.use(cors());
app.use(bodyParser.json());

// Use Helmet to secure HTTP headers
app.use(helmet());

// Rate limiting: limit each IP to 100 requests per 15 minutes to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Setup session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "lax",
    },
  })
);

// Setup CSRF protection middleware.
// Note: For APIs, you might need to adjust how you deliver the token to the client.
app.use(csurf());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple User model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  avatar: String, // optional avatar field
});
const User = mongoose.model("User", userSchema);

// Registration endpoint: POST /register
app.post("/register", async (req, res) => {
  const { username, password, avatar } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, avatar });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Login endpoint: POST /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare the provided password with the hashed one stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create a JSON Web Token that expires in 1 hour
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Optional: An endpoint to check the user's profile/session info
app.get("/profile", async (req, res) => {
  // Get token from header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // For example, retrieve the user's data from the database
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
});

// Logout endpoint: POST /logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed." });
    }
    res.clearCookie("connect.sid");
    return res.json({ message: "Logout successful." });
  });
});

// Serve static files (your HTML, CSS, JS)
app.use(express.static("public"));

// New code to retrieve love letter details and create a shareable link
// Retrieve stored love letter details (assumed stored in localStorage)
const details = JSON.parse(localStorage.getItem("valentineDetails"));
if (details) {
  // Construct a shareable link that points to share.html
  const shareableLink = `https://your-domain.com/share.html?name=${encodeURIComponent(
    details.name
  )}&senderPhone=${encodeURIComponent(
    details.phone
  )}&receiverPhone=${encodeURIComponent(
    details.receiverPhone
  )}&message=${encodeURIComponent(details.message)}`;
  // For example, set this URL as the href of an anchor element:
  $("#shareLink").attr("href", shareableLink);
}

// A simple API endpoint example
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/poetry", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "poetry.html"));
});

app.get("/ask-valentine", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ask-valentine.html"));
});

app.get("/love-letters", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "love-letters.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Handle CSRF token errors specifically
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token." });
  }
  next(err);
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error." });
});

// Create a Checkout session endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "ngn", // Nigerian Naira
            product_data: { name: "Send Valentine Message" },
            unit_amount: 100000, // Example: ₦100.00 (amount in kobo)
          },
          quantity: 1,
        },
      ],
      success_url: "https://your-domain.com/AskVal.html?payment=success",
      cancel_url: "https://your-domain.com/AskVal.html?payment=cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to read letters from the JSON file.
function readLetters(callback) {
  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) {
      // If file does not exist, return an empty array.
      if (err.code === "ENOENT") return callback(null, []);
      return callback(err);
    }
    try {
      const letters = JSON.parse(data);
      callback(null, letters);
    } catch (e) {
      callback(e);
    }
  });
}

// Helper function to write letters to the JSON file.
function writeLetters(letters, callback) {
  fs.writeFile(messagesFile, JSON.stringify(letters, null, 2), callback);
}

// API endpoint to get all letters.
app.get("/api/messages", (req, res) => {
  readLetters((err, letters) => {
    if (err) return res.status(500).json({ error: "Error reading letters." });
    res.json(letters);
  });
});

// API endpoint to post a new letter.
app.post("/api/messages", (req, res) => {
  const newLetter = req.body;
  newLetter.id = Date.now().toString();
  newLetter.timestamp = new Date().toISOString();

  readLetters((err, letters) => {
    if (err) return res.status(500).json({ error: "Error reading letters." });
    letters.push(newLetter);
    writeLetters(letters, (err) => {
      if (err)
        return res.status(500).json({ error: "Error saving the letter." });
      res.json(newLetter);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
