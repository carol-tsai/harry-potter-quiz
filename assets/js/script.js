// Fetch elements from document
var startBtn = document.querySelector("#start");
var firstPg = document.querySelector("#first-page");
var quiz = document.querySelector("#quiz");
var timer = document.querySelector("#timer");

var secondsLeft = 30;
var questions = [
   {
      question: "Who is the author of the Harry Potter books?",
      choices: ["C.S. Lewis", "J.K. Rowling", "J.R.R. Tolkein", "Rick Riordan"]
   },
   {
      question: "Where does Harry go to school?",
      choices: ["Princeton", "Oxford", "Hogwarts", "Eton"]
   },
   {
      question: "What is the name of Harry's owl?",
      choices: ["Bart", "Sally", "Sarah", "Hedwig"]
   }
];

var questionPos = 0;


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

function showQuestion() {
   var questionEl = document.getElementById("question-title");
   questionEl.textContent = questions[questionPos].question;
   for (i=0;i < questions[questionPos].choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.textContent = questions[questionPos].choices[i];
      // TODO add event listener for each button
   }
   questionPos++;
}

function nextQuestion() {

}


// When start button is clicked, timer starts and a question in presented
startBtn.addEventListener("click", function () {
   firstPg.setAttribute("style", "display: none;");
   quiz.setAttribute("style", "display: block;");
   showQuestion();
   console.log(questionPos);
   timer.textContent = "Time: " + secondsLeft;
   setTime();
   for (i = 0; i < questions[questionPos].choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.addEventListener("click", showQuestion);
   }
})
