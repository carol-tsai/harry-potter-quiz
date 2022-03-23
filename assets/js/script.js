// Document element variables
var startBtn = document.querySelector("#start");
var firstPg = document.querySelector("#first-page");
var quiz = document.querySelector("#quiz");
var timer = document.querySelector("#timer");
var endPg = document.querySelector("#ending");
var scoreEl = document.querySelector("#score");
var scorePgEl = document.querySelector("#score-page");
var initalEl = document.querySelector("#initials");
var scoreForm = document.querySelector("#score-form");
var initials = document.querySelector("#initials");
var highscoresEl = document.querySelector("#highscores")
var clearBtnEl = document.querySelector("#clear-btn");
var backBtnEl = document.querySelector("#back-btn");

// Global variables
var secondsLeft = 30;
var questions = [
   {
      question: "Who is the author of the Harry Potter books?",
      choices: ["C.S. Lewis", "J.K. Rowling", "J.R.R. Tolkein", "Rick Riordan"],
      correct: "J.K. Rowling"
   },
   {
      question: "Where does Harry go to school?",
      choices: ["Princeton", "Oxford", "Hogwarts", "Eton"],
      correct: "Hogwarts"
   },
   {
      question: "What is the name of Harry's owl?",
      choices: ["Bart", "Sally", "Sarah", "Hedwig"],
      correct: "Hedwig"
   },
   {
      question: "Which of these is NOT a teacher at Hogwarts",
      choices: ["Professor Snape", "Professor Wormtail", "Professor Umbridge", "Hagrid"],
      correct: "Professor Wormtail"
   },
   {
      question: "What does polyjuice potion do?",
      choices: ["Make you breathe underwater", "Make someone fall in love with you", "Transform you into another person", "Give you good luck"],
      correct: "Hedwig"
   },
   {
      question: "Which Harry Potter book features a flying car?",
      choices: ["Chamber of Secrets", "Goblet of Fire", "Sorcerer's Stone", "Half Blood Prince"],
      correct: "Chamber of Secrets"
   }
];
var questionPos = 0;
var highscores = JSON.parse(localStorage.getItem("highscores"));
var timerInterval;

// Functions

// Sets a timer 
function setTime() {
   timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
         
         showEnding(); 
      }

   }, 1000);
}

// Update quiz questions to show the next question in the questions array.
function showQuestion() {
   var questionEl = document.getElementById("question-title");
   if (questionPos >= questions.length) {
      showEnding();
      return;
   }
   questionEl.textContent = questions[questionPos].question;
   for (i=0;i < questions[questionPos].choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.textContent = questions[questionPos].choices[i];
   }

}

// Present player with the next question and decrement time for incorrect answers.
function nextQuestion(event) {
   var answer = event.target;
   var correct = questions[questionPos].correct;
   if (answer.textContent != correct) {
      if (secondsLeft >= 5) {
         secondsLeft -= 5;
      } else {
         secondsLeft = 0;
         showEnding();
      }
   }
   questionPos++;
   showQuestion();
}

// Show ending page and hide quiz, allow player to save their score
function showEnding() {
   clearInterval(timerInterval);
   endPg.setAttribute("style", "display: block;");
   quiz.setAttribute("style", "display: none;");
   scoreEl.textContent = "Your final score is " + secondsLeft + ".";
   scoreForm.addEventListener("submit", submitScore);
}

// Removes scores from local storage.
function clearScores() {
   highscores = [];
   storeScore();
   showHighscores();
}

// Show the first page, hide the score page, and set questions position back to 0.
function showFirstPg() {
   firstPg.setAttribute("style", "display: block;");
   scorePgEl.setAttribute("style", "display: none");
   questionPos = 0;
}

// Show the score page, hide the end page, and update the text of the highscores.
function showHighscores() {
   endPg.setAttribute("style", "display: none;");
   scorePgEl.setAttribute("style", "display: block");
   highscoresEl.innerHTML = "";
   var storedScores = JSON.parse(localStorage.getItem("highscores"));
   if (storedScores != null) {
      highscores = storedScores;
   }
   for (i = 0; i < highscores.length; i++) {
      var li = document.createElement("li");
      li.textContent = highscores[i];
      highscoresEl.appendChild(li);
   }
   clearBtnEl.addEventListener("click", clearScores);
   backBtnEl.addEventListener("click", showFirstPg);

}

// When the initials are submitted, save the initials and score as an item on the highscores array.
function submitScore(event) {
   event.preventDefault();
   var inputText = initials.value.trim();
   var toSave = inputText + " - " + secondsLeft;
   console.log(toSave);
   highscores.push(toSave);
   initials.value = ""
   storeScore();
   showHighscores();
}

// Store highscores to local storage.
function storeScore() {
   localStorage.setItem("highscores", JSON.stringify(highscores));
}

// When start button is clicked, timer starts and a question in presented. When an answer is clicked, another question is displayed
startBtn.addEventListener("click", function () {
   firstPg.setAttribute("style", "display: none;");
   quiz.setAttribute("style", "display: block;");
   showQuestion();
   secondsLeft = 30;
   timer.textContent = "Time: " + secondsLeft;
   setTime();
   for (i = 0; i < questions[questionPos].choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.addEventListener("click", nextQuestion);
   }
})
