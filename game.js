const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which of the following are components of wireless sensor network?",
    choice1: "Sensor",
    choice2: "Sensor Nodes",
    choice3: "Gateway",
    choice4: "All of the above",
    answer: 4
  },
  {
    question: "Which of the following are components of a sensor node?",
    choice1: "Mesh Network",
    choice2: "Microcontroller",
    choice3: "GPU",
    choice4: "All of the above",
    answer: 2
  },
  {
    question: "Which sensor network topology has no single point of failure?",
    choice1: "Point-to-point",
    choice2: "Mesh",
    choice3: "Star",
    choice4: "All of the above",
    answer: 2
  },
  {
    question: "A sensor network is subject to a unique set of resource constraints such as",
    choice1: "Finite on-board battery power",
    choice2: "Limited  network communication bandwidth",
    choice3: "Both a and b",
    choice4: "None of the above",
    answer: 3
  },
  {
    question: "________ routes user queries or commands to appropriate nodes in a sensor network.",
    choice1: "Bridge",
    choice2: "Gateway",
    choice3: "Router",
    choice4: "None of the above",
    answer: 2
  },
  {
    question: "A sensor network is designed to collect information from a _________ enviroment.",
    choice1: "Logical",
    choice2: "Physical",
    choice3: "Both a and b",
    choice4: "None of the above",
    answer: 2
  },
  {
    question: "The challenges we face in designing sensor network systems and applications include ",
    choice1: "Limited Hardware",
    choice2: "Limited support for networking",
    choice3: "Limited support for software development",
    choice4: "All of the above",
    answer: 4
  },
  {
    question: "Each sensor has a finite sensing range, determined by the ______ floor of the sensor.",
    choice1: "Ground",
    choice2: "Noise",
    choice3: "All of the above",
    choice4: "None of the above",
    answer: 2
  },
  {
    question: "The greatest advantage of networked sensing are in improved __________",
    choice1: "Robustness",
    choice2: "Scalability",
    choice3: "Both a and b",
    choice4: "None of these",
    answer: 3
  },
  {
    question: "A ________ sensing system is inherently more robust against individual sensor node or link failures, because of redundancy in the network.",
    choice1: "Centralized",
    choice2: "Decentralized",
    choice3: "Both a and b",
    choice4: "None of these",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');

};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
