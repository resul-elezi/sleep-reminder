"use strict";

const currentTime = document.getElementById("current-time");
const sleepTimeInput = document.getElementById("sleep-time-input");
const timeOutput = document.getElementById("output-time");
const submitBtn = document.getElementById("submit-btn");
const themeToggle = document.getElementById("toggleTheme");
const themeIcon = document.getElementById("themeIcon");
const logoIcon = document.getElementById("logo");
let isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";

// Current time
function showTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    let timeString = hours + ":" + minutes + ":" + seconds;
    currentTime.innerHTML = timeString;
}
setInterval(showTime, 1000);

// Sleep Time
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let enteredTime = sleepTimeInput.value;
    timeOutput.textContent = enteredTime;
});

// Light/Dark mode 

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    themeIcon.src = isDarkMode ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg";
    logoIcon.src = isDarkMode ? "assets/images/logo-no-background-light.svg" : "assets/images/logo-no-background.svg";
  }
  
  function initializeTheme() {
    themeIcon.src = isDarkMode ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg";
    logoIcon.src = isDarkMode ? "assets/images/logo-no-background-light.svg" : "assets/images/logo-no-background.svg";
  }
  
  initializeTheme();
  
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTheme();
  });