const quotes = [
  {
    text: "Love is composed of a single soul inhabiting two bodies.",
    author: "Aristotle",
  },
  {
    text: "You're sweeter than a box of Valentine's Day chocolates.",
    author: "Unknown",
  },
  {
    text: "Are you a magician? Because when I look at you, everyone else disappears.",
    author: "Unknown",
  },
  {
    text: "I must be a snowflake, because I've fallen for you.",
    author: "Unknown",
  },
  {
    text: "Do you have a map? Because I keep getting lost in your eyes.",
    author: "Unknown",
  },
  {
    text: "Your smile must be a black hole, because it's pulling me in.",
    author: "Unknown",
  },
  {
    text: "If you were a vegetable, you'd be a cute-cumber.",
    author: "Unknown",
  },
  {
    text: "Is your name Google? Because you have everything I've been searching for.",
    author: "Unknown",
  },
  {
    text: "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    author: "Unknown",
  },
  {
    text: "Are you a campfire? Because you're hot and I want s'more.",
    author: "Unknown",
  },
  { text: "If you were a triangle, you'd be acute one.", author: "Unknown" },
  {
    text: "Do you have a sunburn, or are you always this hot?",
    author: "Unknown",
  },
  {
    text: "Is your name Wi-Fi? Because I'm feeling a connection.",
    author: "Unknown",
  },
  {
    text: "Are you a time traveler? Because I can't imagine my future without you.",
    author: "Unknown",
  },
  {
    text: "Do you have a pencil? Because I want to erase your past and write our future.",
    author: "Unknown",
  },
  {
    text: "Are you a parking ticket? Because you've got 'FINE' written all over you.",
    author: "Unknown",
  },
  {
    text: "Do you have a mirror in your pocket? Because I can see myself in your pants.",
    author: "Unknown",
  },
  {
    text: "Is your dad a boxer? Because you're a knockout.",
    author: "Unknown",
  },
  { text: "Are you French? Because Eiffel for you.", author: "Unknown" },
  { text: "Do you have a name, or can I call you mine?", author: "Unknown" },
  {
    text: "Are you a bank loan? Because you have my interest.",
    author: "Unknown",
  },
  {
    text: "Do you have a quarter? Because I want to call my mom and tell her I met 'the one'.",
    author: "Unknown",
  },
  {
    text: "Are you a light bulb? Because you brighten up my day.",
    author: "Unknown",
  },
  {
    text: "Do you have a compass? Because I keep getting lost in your eyes.",
    author: "Unknown",
  },
  { text: "Are you a volcano? Because I lava you.", author: "Unknown" },
  {
    text: "Do you have a license? Because you're driving me crazy.",
    author: "Unknown",
  },
  {
    text: "Are you a snowstorm? Because you're making my heart race.",
    author: "Unknown",
  },
  {
    text: "Do you have a twin? Because I've found my other half.",
    author: "Unknown",
  },
  {
    text: "Are you a star? Because your beauty lights up the night.",
    author: "Unknown",
  },
  {
    text: "Do you have a magnet? Because I'm attracted to you.",
    author: "Unknown",
  },
  {
    text: "Are you a dictionary? Because you add meaning to my life.",
    author: "Unknown",
  },
  {
    text: "Do you have a watch? Because I need to know the time I'll fall in love with you.",
    author: "Unknown",
  },
  {
    text: "Are you a gardener? Because you've planted a seed in my heart.",
    author: "Unknown",
  },
  {
    text: "Do you have a spaceship? Because your beauty is out of this world.",
    author: "Unknown",
  },
  { text: "Are you a painter? Because you color my world.", author: "Unknown" },
  {
    text: "Do you have a flashlight? Because you light up my life.",
    author: "Unknown",
  },
];

let currentIndex = 0;

function displayQuote() {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");

  quoteText.textContent = quotes[currentIndex].text;
  quoteAuthor.textContent = `— ${quotes[currentIndex].author}`;

  currentIndex = (currentIndex + 1) % quotes.length;
}

setInterval(displayQuote, 5000); // Change quote every 5 seconds
displayQuote(); // Initial call to display the first quote

const quoteContainer = document.getElementById("quote-container");

function getRandomColor() {
  const colors = [
    "#FFB6C1",
    "#FFC0CB",
    "#DC143C",
    "#FF69B4",
    "#FF1493",
    "#C71585",
    "#DB7093",
    "#E6E6FA",
    "#D8BFD8",
    "#DDA0DD",
    "#EE82EE",
    "#DA70D6",
    "#FF00FF",
    "#FF00FF",
    "#BA55D3",
    "#9370DB",
    "#8A2BE2",
    "#9400D3",
    "#9932CC",
    "#8B008B",
    "#800080",
    "#4B0082",
    "#6A5ACD",
    "#483D8B",
    "#7B68EE",
    "#ADFF2F",
    "#7FFF00",
    "#7CFC00",
    "#00FF00",
    "#32CD32",
    "#98FB98",
    "#90EE90",
    "#00FA9A",
    "#00FF7F",
    "#3CB371",
    "#2E8B57",
    "#228B22",
    "#008000",
    "#006400",
    "#9ACD32",
    "#6B8E23",
    "#556B2F",
    "#66CDAA",
    "#8FBC8F",
    "#20B2AA",
    "#008B8B",
    "#008080",
    "#00FFFF",
    "#00FFFF",
    "#E0FFFF",
    "#AFEEEE",
    "#7FFFD4",
    "#40E0D0",
    "#48D1CC",
    "#00CED1",
    "#5F9EA0",
    "#4682B4",
    "#B0C4DE",
    "#B0E0E6",
    "#ADD8E6",
    "#87CEEB",
    "#87CEFA",
    "#00BFFF",
    "#1E90FF",
    "#6495ED",
    "#7B68EE",
    "#4169E1",
    "#0000FF",
    "#0000CD",
    "#00008B",
    "#000080",
    "#191970",
    "#FFF8DC",
    "#FFEBCD",
    "#FFE4C4",
    "#FFDEAD",
    "#F5DEB3",
    "#DEB887",
    "#D2B48C",
    "#BC8F8F",
    "#F4A460",
    "#DAA520",
    "#B8860B",
    "#CD853F",
    "#D2691E",
    "#8B4513",
    "#A0522D",
    "#A52A2A",
    "#800000",
    "#FFFFFF",
    "#FFFAFA",
    "#F0FFF0",
    "#F5FFFA",
    "#F0FFFF",
    "#F0F8FF",
    "#F8F8FF",
    "#F5F5F5",
    "#FFF5EE",
    "#F5F5DC",
    "#FDF5E6",
    "#FFFAF0",
    "#FFFFF0",
    "#FAEBD7",
    "#FAF0E6",
    "#FFF0F5",
    "#FFE4E1",
    "#DCDCDC",
    "#D3D3D3",
    "#C0C0C0",
    "#A9A9A9",
    "#808080",
    "#696969",
    "#778899",
    "#708090",
    "#2F4F4F",
    "#000000",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = quotes[randomIndex];

  const quoteElement = document.createElement("div");
  quoteElement.className = "quote";
  quoteElement.textContent = quoteText;
  quoteElement.style.color = getRandomColor();
  quoteElement.style.backgroundColor = getRandomColor();

  quoteContainer.innerHTML = "";
  quoteContainer.appendChild(quoteElement);
}

displayRandomQuote();
setInterval(displayRandomQuote, 5000);
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Create a floating heart every second
setInterval(createHeart, 1000);

// Timer function to unlock the next page
function startTimer(endTime, display) {
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 0) {
      display.textContent = `${days} day${days > 1 ? "s" : ""} left`;
    } else {
      display.textContent = `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    if (distance < 0) {
      clearInterval(interval);
      display.textContent = "00:00:00";
      document.querySelector(".home-button").disabled = false;
      document.getElementById("nextPageLink").href = "index.html";
      document.getElementById("heartLock").style.display = "none";
      enableComingSoonLinks();
    }
  }, 1000);
}

function enableComingSoonLinks() {
  const links = document.querySelectorAll("a.coming-soon");
  links.forEach((link) => {
    link.classList.remove("coming-soon");
    link.style.pointerEvents = "auto";
    link.style.color = "#d60000";
    link.onclick = null;
  });
}

function isActivationTime() {
  const threshold = new Date("February 13, 2025 00:00:00").getTime();
  return new Date().getTime() >= threshold;
}

window.onload = function () {
  const activationThreshold = new Date("February 13, 2025 00:00:00").getTime();
  const display = document.querySelector("#timer");
  startTimer(activationThreshold, display);

  if (isActivationTime()) {
    enableComingSoonLinks();
  } else {
    const inactiveLinks = document.querySelectorAll("a.coming-soon");
    inactiveLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        alert("Coming soon, Available on the 13th");
      });
    });
  }

  document
    .getElementById("unlockButton")
    .addEventListener("click", function () {
      this.style.display = "none";
      document.getElementById("heartLock").style.display = "block";
    });
};
