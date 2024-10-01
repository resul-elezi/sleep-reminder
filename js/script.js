"use strict";

let currentTime = document.getElementById("current-time");
let sleepTimeInput = document.getElementById("sleep-time-input");
let timeOutput = document.getElementById("output-time");
let submitBtn = document.getElementById("submit-btn");

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
