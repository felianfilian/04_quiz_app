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
];

let currentQuestion = 0;

let actualQuestion = 1;
let allQuestions = questions.length;

let questionTitle = document.getElementById("question-title");
let answer01 = document.getElementById("answer_1");
let answer02 = document.getElementById("answer_2");
let answer03 = document.getElementById("answer_3");
let answer04 = document.getElementById("answer_4");
let btnNext = document.querySelector("#btn-next");

function init() {
  let questionCounter = document.getElementById("question-counter");

  showQuestion();

  questionCounter.innerHTML = `
  <b>${actualQuestion}</b> von <b>${allQuestions}</b> Fragen
  `;
}

// output

function showQuestion() {
  let question = questions[currentQuestion];

  questionTitle.innerHTML = question["question"];
  answer01.innerHTML = question["answer_1"];
  answer02.innerHTML = question["answer_2"];
  answer03.innerHTML = question["answer_3"];
  answer04.innerHTML = question["answer_4"];
}

// main

function answer(answer) {
  let question = questions[currentQuestion];
  let selectedQuestion = answer.slice(-1);

  let rightAnswerIndex = question["right_answer"];
  let rightAnswer = `answer_${rightAnswerIndex}`;

  if (selectedQuestion == rightAnswerIndex) {
    document.getElementById(answer).parentNode.classList.add("bg-success");
  } else {
    document.getElementById(answer).parentNode.classList.add("bg-danger");
    document.getElementById(rightAnswer).parentNode.classList.add("bg-success");
  }

  btnNext.removeAttribute("disabled");
}
