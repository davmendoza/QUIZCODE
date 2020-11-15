
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questElement = document.getElementById("questions");
var timeElement = document.getElementById("time");
var chElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initElement = document.getElementById("initials");
var feedBacck = document.getElementById("feedback");



function startQuiz() {
  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

 
  questElement.removeAttribute("class");

 
  timerId = setInterval(clockTick, 1000);

  
  timeElement.textContent = time;

  getQuestion();
}

function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];

  
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  
  chElement.innerHTML = "";

  
  currentQuestion.choices.forEach(function(choice, i) {
    
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    
    choiceNode.onclick = questionClick;

    
    chElement.appendChild(choiceNode);
  });
}

function questionClick() {
  
  if (this.value !== questions[currentQuestionIndex].answer) {
   
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    
    timeElement.textContent = time;

    
    

    feedBacck.textContent = "Wrong!";
  } else {
    

    feedBacck.textContent = "Correct!";
  }

  
  feedBacck.setAttribute("class", "feedback");
  setTimeout(function() {
    feedBacck.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionIndex++;

  
  if (currentQuestionIndex === questions.length) {
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

  
  questElement.setAttribute("class", "hide");
}

function clockTick() {
 
  time--;
  timeElement.textContent = time;

  
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
 
  var initials = initElement.value.trim();

  
  if (initials !== "") {
    
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

   
    var newScore = {
      score: time,
      initials: initials
    };

    
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  
  if (event.key === "Enter") {
    saveHighscore();
  }
}


submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;

initElement.onkeyup = checkForEnter;
