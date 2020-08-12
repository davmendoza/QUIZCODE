
var currentQIndex = 0;
var time = questions.length * 20;
var timerId;

var questionS = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialS = document.getElementById("initials");
var feedBack = document.getElementById("feedback");



function startQuiz() {
  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionS.removeAttribute("class");


  timerId = setInterval(clockTick, 1000);

  
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQIndex];

  
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  
  currentQuestion.choices.forEach(function(choice, i) {
    
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = choice;

    
    choiceNode.onclick = questionClick;

    
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  
  if (this.value !== questions[currentQIndex].answer) {
   
    time -= 20;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    

    feedBack.textContent = "Wrong!";
  } else {
    

    feedBack.textContent = "Correct!";
  }

  
  feedBack.setAttribute("class", "feedback");
  setTimeout(function() {
    feedBack.setAttribute("class", "feedback hide");
  }, 1000);

  currentQIndex++;

  
  if (currentQIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  
  clearInterval(timerId);

  
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  
  questionS.setAttribute("class", "hide");
}

function clockTick() {
  
  time--;
  timerEl.textContent = time;


  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  
  var initials = initialsEl.value.trim();

  
  if (initials !== "") {
    
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    
    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "scores.html";
  }
}

function checkForEnter(event) {

  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;