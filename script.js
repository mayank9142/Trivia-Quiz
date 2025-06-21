const questions = [
  {
    category: "Science",
    question: "Which company recently announced the first room-temperature superconductor breakthrough (2023)?",
    options: ["Tesla", "NASA", "LK-99 Lab Korea", "CERN"],
    answer: 2
  },
  {
    category: "Science",
    question: "What AI model by Google was released in 2023 to compete with ChatGPT?",
    options: ["Gemini", "Bard", "Atlas", "Perplexity"],
    answer: 0
  },
  {
    category: "History",
    question: "Which country recently removed the British monarchy as its head of state (2023)?",
    options: ["Barbados", "Jamaica", "Australia", "New Zealand"],
    answer: 0
  },
  {
    category: "History",
    question: "Who became the first female President of India?",
    options: ["Pratibha Patil", "Sonia Gandhi", "Indira Gandhi", "Droupadi Murmu"],
    answer: 0
  },
  {
    category: "Technology",
    question: "What’s the name of Apple’s spatial computing headset launched in 2024?",
    options: ["iLens", "Vision Pro", "Air Pro", "iSight"],
    answer: 1
  },
  {
    category: "Technology",
    question: "Which company owns ChatGPT?",
    options: ["Google", "Meta", "OpenAI", "Amazon"],
    answer: 2
  },
  {
    category: "Entertainment",
    question: "Which film won Best Picture at the Oscars 2024?",
    options: ["Oppenheimer", "Barbie", "Killers of the Flower Moon", "The Holdovers"],
    answer: 0
  },
  {
    category: "Entertainment",
    question: "Which Indian movie entered the Oscars nomination list for Best Original Song in 2023?",
    options: ["Pathaan", "Jawan", "RRR", "Kantara"],
    answer: 2
  },
  {
    category: "Sports",
    question: "Who won the 2023 ICC Cricket World Cup?",
    options: ["India", "Australia", "England", "South Africa"],
    answer: 1
  },
  {
    category: "Sports",
    question: "Which footballer won the Ballon d'Or in 2023?",
    options: ["Erling Haaland", "Lionel Messi", "Mbappé", "Cristiano Ronaldo"],
    answer: 1
  },
  {
    category: "General Knowledge",
    question: "Which city will host the 2036 Olympics (recently proposed)?",
    options: ["New Delhi", "Doha", "Los Angeles", "Ahmedabad"],
    answer: 3
  },
  {
    category: "General Knowledge",
    question: "Which company replaced Twitter's bird logo with an 'X' in 2023?",
    options: ["Meta", "OpenAI", "X Corp", "Google"],
    answer: 2
  },
  {
    category: "Space",
    question: "Which country became the first to land on the Moon’s south pole in 2023?",
    options: ["USA", "Russia", "China", "India"],
    answer: 3
  },
  {
    category: "Space",
    question: "What is the name of India’s successful 2023 lunar mission?",
    options: ["Chandrayaan-2", "ISRO-Lunar", "Chandrayaan-3", "Vikram-II"],
    answer: 2
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let progress = 0;

const categoryElem = document.getElementById('category');
const questionElem = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElem = document.getElementById('score');
const highScoreElem = document.getElementById('high-score');
const timeElem = document.getElementById('time');
const progressElem = document.getElementById('progress');
const startButton = document.getElementById('start');

if (localStorage.getItem('highScore')) {
  highScoreElem.innerText = localStorage.getItem('highScore');
}

function startGame() {
  score = 0;
  currentQuestionIndex = 0;
  scoreElem.innerText = score;
  startButton.disabled = true;
  timeLeft = 60;
  timeElem.innerText = timeLeft;
  shuffledQuestions = [...questions];
  shuffle(shuffledQuestions);
  timerInterval = setInterval(updateTimer, 1000);
  loadQuestion();
}

function loadQuestion() {
  const questionData = shuffledQuestions[currentQuestionIndex];
  categoryElem.innerText = `Category: ${questionData.category}`;
  questionElem.innerText = questionData.question;

  const shuffledAnswers = [...questionData.options];
  shuffle(shuffledAnswers);

  answerButtons.forEach((btn, index) => {
    btn.innerText = shuffledAnswers[index];
    btn.classList.remove('correct', 'incorrect');
    btn.disabled = false;
  });

  progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  progressElem.style.width = `${progress}%`;
}

function updateTimer() {
  timeLeft--;
  timeElem.innerText = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    endGame();
  }
}

function checkAnswer(selectedIndex) {
  const questionData = shuffledQuestions[currentQuestionIndex];
  const correctAnswerText = questionData.options[questionData.answer];

  if (answerButtons[selectedIndex].innerText === correctAnswerText) {
    answerButtons[selectedIndex].classList.add('correct');
    score++;
  } else {
    answerButtons[selectedIndex].classList.add('incorrect');
  }

  scoreElem.innerText = score;
  answerButtons.forEach(btn => btn.disabled = true);
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  clearInterval(timerInterval);
  alert(`Game Over! Your score: ${score}`);
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
    highScoreElem.innerText = score;
  }
  startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
answerButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => checkAnswer(index));
});
