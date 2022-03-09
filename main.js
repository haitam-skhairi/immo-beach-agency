// Locale Storge //

// Conditions of randomize Background Images In Landing Page

let backgroundOption = true;
let backgroundInterval;

// Get Color from Locale Storage to The main color

let mainColor = localStorage.getItem("main_color");

document.documentElement.style.setProperty("--main-color", mainColor);

document.querySelectorAll(".setting-bar .colors li").forEach((el) => {
  el.classList.remove("active");
  if (el.dataset.color === mainColor) {
    el.classList.add("active");
  }
});

// Get Background from Locale Storage to The Landing Background Choosed

let choosedBackground = localStorage.getItem("choosed_bg");

if (choosedBackground !== null) {
  if (choosedBackground === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".setting-bar .random-bg span").forEach((el) => {
    el.classList.remove("active");
  });

  // Set class active

  if (choosedBackground === "true") {
    document
      .querySelector(".setting-bar .random-bg span.play")
      .classList.add("active");
  } else {
    document
      .querySelector(".setting-bar .random-bg span.pause")
      .classList.add("active");
  }
}

// Setting Bar //

let settingBar = document.querySelector(".setting-bar");
let settingIcon = document.querySelector(".setting-bar .icon i");

// Stop Propagation onclick in Childrens of setting bar
settingBar.onclick = function (e) {
  e.stopPropagation();
};

settingIcon.addEventListener("click", (e) => {
  e.target.classList.toggle("fa-spin");
  settingBar.classList.toggle("open");
  settingBar.classList.toggle("box-shadow");
});

// Setting Colors

let settingColorsli = document.querySelectorAll(".setting-bar .box .colors li");

settingColorsli.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Hundle Active
    hundleActive(e);

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("main_color", e.target.dataset.color);
  });
});

// Reset All Setting From the Locale Storage

let resetButton = document.querySelector(".setting-bar .box button");

resetButton.onclick = function () {
  // clear all items
  // localStorage.clear();
  // clear some items
  localStorage.removeItem("main_color");
  localStorage.removeItem("choosed_bg");
  window.location.reload();
};

// Close the setting bar when clicking outside of it

document.addEventListener("click", (e) => {
  if (e.target !== settingBar && e.target !== settingIcon) {
    settingIcon.classList.remove("fa-spin");
    settingBar.classList.remove("open");
  }
});

// Toggel Menu

const openToggelMenu = document.querySelector("header .bars-icon i.open");
const closeToggelMenu = document.querySelector("header .bars-icon i.close");
const toggelMenu = document.querySelector("header .toggel-menu");
const toggelMenuLinks = document.querySelectorAll("header .toggel-menu a");

openToggelMenu.addEventListener("click", () => {
  openToggelMenu.style.display = "none";
  closeToggelMenu.style.display = "block";
  toggelMenu.classList.add("open");
});

closeToggelMenu.addEventListener("click", () => {
  closeToggelMenu.style.display = "none";
  openToggelMenu.style.display = "block";
  toggelMenu.classList.remove("open");
});

toggelMenuLinks.forEach((a) => {
  a.addEventListener("click", () => {
    toggelMenu.classList.remove("open");
    closeToggelMenu.style.display = "none";
    openToggelMenu.style.display = "block";
  });
});

toggelMenuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Hundle Active
    hundleActive(e);

    // Scroll to Section
    document.querySelector(link.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Nav Bar
// const sections = document.querySelectorAll("section");
const navBarLinks = document.querySelectorAll("header .links a");

navBarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Hundle Active
    hundleActive(e);

    // Scroll to Section
    document.querySelector(link.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Set Background Tranparent when Scroll bottom

let header = document.querySelector("header");
let aboutUs = document.querySelector(".about-us");

window.addEventListener("scroll", () => {
  if (window.scrollY >= aboutUs.offsetTop - 70) {
    header.style.backgroundColor = "rgba(17, 25, 71, 0.7)";
  } else {
    header.style.backgroundColor = "rgba(17, 25, 71)";
  }
});

// Section Landing Random Background //

let landing = document.querySelector(".landing");
let landingBgArray = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
];
let randomBgSpans = document.querySelectorAll(".setting-bar .random-bg span");

randomBgSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    hundleActive(e);

    // Randomize Background if condition

    if (e.target.dataset.random === "play") {
      backgroundOption = true;
      randomizeImgs();

      // Set Option Random Background In Locale Storage

      localStorage.setItem("choosed_bg", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      // Set Option Random Background In Locale Storage

      localStorage.setItem("choosed_bg", false);
    }
  });
});

// Randomize Function

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      landing.style.backgroundImage =
        "url('images/landing/" +
        landingBgArray[Math.floor(Math.random() * landingBgArray.length)] +
        "')";
    }, 10000);
  }
}
randomizeImgs();

// Section Skills //

let skills = document.querySelector(".skills");

let skillsSpans = document.querySelectorAll(".skills .prog-holder .prog span");

window.addEventListener("scroll", () => {
  if (window.scrollY >= skills.offsetTop - 100) {
    skillsSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
});

// Section Gallery //

let galleryImgs = document.querySelectorAll(".gallery .imgs-gallery .box img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", () => {
    let popupOverly = document.createElement("div");

    // Append popup overly in body
    document.body.appendChild(popupOverly);

    popupOverly.className = "popup-overly";

    let popupGallerybox = document.createElement("div");

    popupGallerybox.className = "popup-box-img";

    let popupGalleryHead = document.createElement("h2");

    popupGalleryHead.style.paddingBottom = "20px";

    let popupGalleryHeadTextNode = document.createTextNode(img.alt);

    popupGalleryHead.appendChild(popupGalleryHeadTextNode);

    popupGallerybox.appendChild(popupGalleryHead);

    let popupGalleryImg = document.createElement("img");

    popupGalleryImg.style.width = "100%";
    popupGalleryImg.style.height = "100%";
    popupGalleryImg.src = img.src;

    // Close span popup
    let popupCloseSpan = document.createElement("span");

    popupCloseSpan.className = "close-popup-span";

    // Append span in popup box
    popupGallerybox.appendChild(popupCloseSpan);

    let popupCloseSpanTextNode = document.createTextNode("X");

    popupCloseSpan.appendChild(popupCloseSpanTextNode);

    // Append target img in popup box
    popupGallerybox.appendChild(popupGalleryImg);

    // Append popup box in body
    document.body.appendChild(popupGallerybox);

    popupCloseSpan.onclick = function () {
      popupGallerybox.style.display = "none";
      popupOverly.style.display = "none";
    };
  });
});

// Hundle Active State
function hundleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
}
