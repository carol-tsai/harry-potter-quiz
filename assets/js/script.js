// Fetch elements from document
var startBtn = document.querySelector("#start");
var firstPg = document.querySelector("#first-page");
var quiz = document.querySelector("#quiz");
var timer = document.querySelector("#timer");

var secondsLeft = 5;

function setTime() {
   // Sets interval in variable
   var timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;

      if (secondsLeft === 0) {
         // Stops execution of action at set interval
         clearInterval(timerInterval);
         // Calls function to create and append image
         sendMessage();
      }

   }, 1000);
}


// When start button is clicked, timer starts and a question in presented
startBtn.addEventListener("click", function () {
   firstPg.setAttribute("style", "display: none;");
   quiz.setAttribute("style", "display: block;");
   timer.textContent = "Time: " + secondsLeft;
   setTime();
})