const questions = [
  {
    question: "Which is the largest animal in the world ?",
    answers: [
      {
        text: "Shark",
        correct: "false",
      },
      { text: "Blue Whale", correct: "true" },
      { text: "Elephant", correct: "false" },
      { text: "Giraffe", correct: "false" },
    ],
  },
  {
    question: "Which is the smallest country in the world ?",
    answers: [
      {
        text: "Vatican City",
        correct: "true",
      },
      { text: "Bhutan", correct: "false" },
      { text: "Nepal", correct: "false" },
      { text: "Sri Lanka", correct: "false" },
    ],
  },
  {
    question: "What is the capital city of France?",
    answers: [
      {
        text: "Paris",
        correct: "true",
      },
      { text: "Berlin", correct: "false" },
      { text: "Madrid", correct: "false" },
      { text: "London", correct: "false" },
    ],
  },
  {
    question: "What is the name of the longest river in the world?",
    answers: [
      {
        text: "Nile",
        correct: "true",
      },
      { text: "Amazon", correct: "false" },
      { text: "Yangtze", correct: "false" },
      { text: "Danube", correct: "false" },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector(".answer-button");
const nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNO = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    // add event
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) answerBtn.removeChild(answerBtn.firstChild);
}
function selectAnswer(e) {
  let selectBtn = e.target;
  let isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored${score}out of${questions.length}!.`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextBtn.addEventListener("click", function(){
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
