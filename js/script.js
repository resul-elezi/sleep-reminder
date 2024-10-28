"use strict";

const currentTime = document.getElementById("current-time");
const sleepTimeInput = document.getElementById("sleep-time-input");
const dayProgressBar = document.getElementById("day-progress");

const timeOutput = document.getElementById("output-time");
// Initializing value if one is stored
timeOutput.textContent = localStorage.getItem("bed-time") || "";

const submitBtn = document.getElementById("submit-btn");
const themeToggle = document.getElementById("toggleTheme");
const themeIcon = document.getElementById("themeIcon");
const logoIcon = document.getElementById("logo");
let isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";

/**
 * Gets the current time and returns a string represeting it.
 */
function getCurrentTimeString() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    let timeString = hours + ":" + minutes + ":" + seconds;
    return timeString;
}

/**
 * Converts a time string in the format "hh:mm" to a percentage representation of the day.
 */
function timeToPercentage(timeString) {
    // time in format hh:mm
    let time = timeString.split(":");
    let current_minutes = parseInt(time[0]) * 60 + parseInt(time[1]); // Gets the total minutes until the current time

    const minutes_in_day = 60 * 24;

    let output = (current_minutes * 100) / minutes_in_day;
    return output;
}

/**
 * Fecthes the sunrise and sunset data for a given location
 */
async function getSunData(location) {
    const [lat, lng] = location;
    try {
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
        if (!response.ok) {
            console.error(`Error fetching data: ${response.status} ${response.statusText}`);
            return null;
        }

        const json_data = await response.json();

        // Check if json_data contains the expected results
        if (!json_data.results) {
            console.error("Error retrieving sunset and sunrise data");
            return null;
        }

        return json_data.results;
    } catch (error) {
        console.error("An error occurred while fetching sun data:", error);
        return null;
    }
}
const temp_location = [36.72016, -4.42034];
const sun_data_promise = getSunData(temp_location);

/**
 * @param {string} time Any string representing time that may need to be formatted correctly.
 * @returns The string as proper format hh:mm
 */
function formatRegularTime(time) {
    // ensures format hh:mm
    let input = time.split(":");
    input[0] = input[0].length === 1 ? "0" + input[0] : input[0];
    input[1] = input[1].length === 1 ? "0" + input[1] : input[1];
    return input[0] + ":" + input[1];
}

/**
 * Creates the linear-gradient string for a marker given the time as a percentage
 */
function generateMarkerGradient(time_percentage, { marker_width = 0.25, color = "#000a" } = {}) {
    return `linear-gradient(90deg, transparent ${time_percentage - marker_width}%, ${color} ${time_percentage - marker_width}%, ${color} ${
        time_percentage + marker_width
    }%, transparent ${time_percentage + marker_width}%)`;
}

// Current time
async function showTime() {
    const current_time = getCurrentTimeString();
    currentTime.innerHTML = current_time;

    let sun_data = await sun_data_promise;
    if (!sun_data) return; // Early exit if data not available

    // Gets the data necessary
    const sunrise_time = formatRegularTime(sun_data.sunrise);
    const sunset_time = "1" + formatRegularTime(sun_data.sunset).slice(1, 4);
    const sunrise_percent = timeToPercentage(sunrise_time);
    const sunset_percent = timeToPercentage(sunset_time);
    const current_time_percent = timeToPercentage(current_time);
    const bed_time_percent = timeToPercentage(formatRegularTime(localStorage.getItem("bed-time") || "00:00"));

    // Colors the progress bar
    dayProgressBar.style.background = `linear-gradient(135deg, 
    #8A2BE2, 
    #FFB347 ${sunrise_percent}%, 
    #D0D8DD ${sunset_percent - sunrise_percent / 2}%,
    #8A2BE2 ${sunset_percent}%), 
    ${generateMarkerGradient(sunrise_percent)}, 
    ${generateMarkerGradient(sunset_percent)}, 
    ${generateMarkerGradient(bed_time_percent, {
        color: "#c3cf", // bed time
    })},
    ${generateMarkerGradient(current_time_percent, {
        marker_width: 0.15,
        color: "#ffff", // current time
    })}
    `;
}
showTime();
setInterval(showTime, 1000);

// Sleep Time
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let enteredTime = sleepTimeInput.value;

    // Stores value from when the user would like to go to bed.
    localStorage.setItem("bed-time", enteredTime);

    timeOutput.textContent = enteredTime;
});

// Light/Dark mode

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    themeIcon.src = isDarkMode ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg";
    logoIcon.src = isDarkMode ? "assets/images/logo-no-background.svg" : "assets/images/logo-no-background-light.svg";
}

function initializeTheme() {
    themeIcon.src = isDarkMode ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg";
    logoIcon.src = isDarkMode ? "assets/images/logo-no-background.svg" : "assets/images/logo-no-background-light.svg";
}

initializeTheme();
themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme();
});
