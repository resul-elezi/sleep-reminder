"use strict";

let currentTime = document.getElementById("current-time");
let sleepTimeInput = document.getElementById("sleep-time-input");
let timeOutput = document.getElementById("output-time");
let submitBtn = document.getElementById("submit-btn");
let sleepAmount = document.getElementById("sleep-amount-input");
let sleepAmountOutput = document.getElementById("output-amount");
let sleepAmountSubmit = document.getElementById("sleep-amount-btn");
let wakeUpTime = document.getElementById("output-wake-up");


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
    timeOutput.textContent = "You will go to sleep at: " + enteredTime;
});

//sleep amount

sleepAmountSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let enteredAmount = sleepAmount.value;
    sleepAmountOutput.textContent = "You like to sleep for: "+enteredAmount+" hours";
});

//wake up time

sleepAmountSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let enteredAmount = sleepAmount.value;
    let enteredTime = sleepTimeInput.value;
    let wakeUp = parseInt(enteredTime.split(":")[0]) + parseInt(enteredAmount);
    if(wakeUp > 24) {
        wakeUp = wakeUp - 24;
    }
    wakeUpTime.textContent = "You should wake up at: "+wakeUp+":" + enteredTime.split(":")[1];
});