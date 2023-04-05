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

let actualQuestion = 1;
let allQuestions = questions.length;

function init() {
  let questionCounter = document.getElementById("question-counter");
  questionCounter.innerHTML = `
  <b>${actualQuestion}</b> von <b>${allQuestions}</b> Fragen
  `;
}
