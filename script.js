let questions = [
  {
    question: "Wer hat JavaScript erfunden?",
    answer_1: "Brendan Fraser",
    answer_2: "Peter Pan",
    answer_3: "Brendan Eich",
    answer_4: "Peter Eich",
    right_answer: 3,
  },
  {
    question: "In welchem Jahr ging Youtube online?",
    answer_1: "2003",
    answer_2: "2005",
    answer_3: "2008",
    answer_4: "2009",
    right_answer: 2,
  },
  {
    question: "Wer hat die Super Mario Melodie komponiert?",
    answer_1: "Shinji Mikami",
    answer_2: "Hajao Miyazaki",
    answer_3: "Shigeru Miyamoto",
    answer_4: "Koji Kondo",
    right_answer: 4,
  },
  {
    question: "Wieviel MHz hatte die Intel-CPU des ersten IBM-PCs?",
    answer_1: "4,77 MHz",
    answer_2: "13,5 MHz",
    answer_3: "1,23 MHz",
    answer_4: "8.9 MHz",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let rightAnswered = 0;

let allQuestions = questions.length;

// page elements

let questionTitle = document.getElementById("question-title");
let answerList = [
  document.getElementById("answer_1"),
  document.getElementById("answer_2"),
  document.getElementById("answer_3"),
  document.getElementById("answer_4"),
];
let answer01 = document.getElementById("answer_1");
let answer02 = document.getElementById("answer_2");
let answer03 = document.getElementById("answer_3");
let answer04 = document.getElementById("answer_4");
let questionCounter = document.getElementById("question-counter");
let btnNext = document.querySelector("#btn-next");

let questionBody = document.getElementById("question-body").innerHTML;

// audio

let AUDIO_RIGHT = new Audio("sound/right.wav");
let AUDIO_WRONG = new Audio("sound/wrong.wav");
let AUDIO_SUCCESS = new Audio("sound/success.wav");

function init() {
  showQuestion();
}

function restartGame() {
  document.getElementById("question-body").innerHTML = questionBody;
  currentQuestion = 0;
  rightAnswered = 0;
  questionTitle = document.getElementById("question-title");
  answer01 = document.getElementById("answer_1");
  answer02 = document.getElementById("answer_2");
  answer03 = document.getElementById("answer_3");
  answer04 = document.getElementById("answer_4");
  questionCounter = document.getElementById("question-counter");
  btnNext = document.querySelector("#btn-next");

  showQuestion();
}

// output

function showQuestion() {
  if (currentQuestion >= questions.length) {
    AUDIO_SUCCESS.play();
    showEndScreen();
  } else {
    questionOutput();
  }
}

function questionOutput() {
  let question = questions[currentQuestion];

  questionTitle.innerHTML = question["question"];
  answer01.innerHTML = question["answer_1"];
  answer02.innerHTML = question["answer_2"];
  answer03.innerHTML = question["answer_3"];
  answer04.innerHTML = question["answer_4"];

  showProgressBar(currentQuestion, allQuestions);

  questionCounter.innerHTML = `
  <b>${currentQuestion + 1}</b> von <b>${allQuestions}</b> Fragen
  <br>
  <b>${rightAnswered}</b> Fragen richtig
  `;
}

function showEndScreen() {
  document.getElementById("question-body").innerHTML = `
    <img src="./img/trophy.png" class="card-img-top" alt="question-mark">
    <div id="end-screen">
        <h2>GAME FINISHED
        <br>
        <div id="progress" class="progress">
          <div id="progress-bar" class="progress-bar" role="progressbar" style="width: 0%;">
            XX %
          </div>;
        </div>
        <br>
        Du hast <b>${rightAnswered}</b> von <b>${allQuestions}</b> Fragen richtig beantwortet
        </h2>
        <br><br>
        <button class="btn btn-primary w-100" type="button" onclick="restartGame()">Restart</button>
      </div>
    `;
  showProgressBar(currentQuestion, allQuestions);
}

function showProgressBar(actual, all) {
  let actualPercent = actual * (100 / all);
  let progressBar = document.getElementById("progress-bar");
  if (actualPercent > 100) {
    actualPercent = 100;
  }

  progressBar.innerHTML = `${actualPercent.toFixed()}%`;
  progressBar.style.width = `${actualPercent}%`;
}

// answer logic

function answer(answer) {
  if (btnNext.disabled == true) {
    let question = questions[currentQuestion];
    let selectedQuestion = answer.slice(-1);

    let rightAnswerIndex = question["right_answer"];
    let rightAnswer = `answer_${rightAnswerIndex}`;

    if (selectedQuestion == rightAnswerIndex) {
      rightAnswerOutput(answer);
    } else {
      wrongAnswerOutput(answer, rightAnswer);
    }
  }
  btnNext.disabled = false;
}

function rightAnswerOutput(answer) {
  rightAnswered++;
  document.getElementById(answer).parentNode.classList.add("bg-success");
  AUDIO_RIGHT.currentTime = 0;
  AUDIO_RIGHT.play();
}

function wrongAnswerOutput(answer, rightAnswer) {
  document.getElementById(answer).parentNode.classList.add("bg-danger");
  document.getElementById(rightAnswer).parentNode.classList.add("bg-success");
  AUDIO_WRONG.currentTime = 0;
  AUDIO_WRONG.play();
}

function nextQuestion() {
  btnNext.disabled = true;
  currentQuestion++;

  showQuestion();
  resetQuestionColor();
}

function resetQuestionColor() {
  // for (let i = 0; i < 4; i++) {
  //   answerList[i].parentNode.classList.remove("bg-success");
  //   answerList[i].parentNode.classList.remove("bg-danger");
  // }
  answer01.parentNode.classList.remove("bg-success");
  answer01.parentNode.classList.remove("bg-danger");
  answer02.parentNode.classList.remove("bg-success");
  answer02.parentNode.classList.remove("bg-danger");
  answer03.parentNode.classList.remove("bg-success");
  answer03.parentNode.classList.remove("bg-danger");
  answer04.parentNode.classList.remove("bg-success");
  answer04.parentNode.classList.remove("bg-danger");
}
