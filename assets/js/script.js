// Fetch elements from document
var startBtn = document.querySelector("#start");
var firstPg = document.querySelector("#first-page");
var quiz = document.querySelector("#quiz");
var timer = document.querySelector("#timer");

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
      question: "What is the name of Harry's owl?",
      choices: ["Bart", "Sally", "Sarah", "Hedwig"],
      correct: "Hedwig"
   },
   {
      question: "Which Harry Potter book features a flying car?",
      choices: ["Chamber of Secrets", "Goblet of Fire", "Sorcerer's Stone", "Half Blood Prince"],
      correct: "Chamber of Secrets"
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
         sendMessage(); //Todo change to show end page
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
   if (questionPos>questions.length) {
      // Todo take people to ending page
   }
}

function nextQuestion(event) {
   var answer = event.target;
   var correct = questions[questionPos].correct;
   if (answer.textContent != correct) {
      secondsLeft -= 5;
   }
   questionPos++;
   showQuestion();
}


// When start button is clicked, timer starts and a question in presented. When an answer is clicked, another question is displayed
startBtn.addEventListener("click", function () {
   firstPg.setAttribute("style", "display: none;");
   quiz.setAttribute("style", "display: block;");
   showQuestion();
   timer.textContent = "Time: " + secondsLeft;
   setTime();
   for (i = 0; i < questions[questionPos].choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.addEventListener("click", nextQuestion);
   }
})
