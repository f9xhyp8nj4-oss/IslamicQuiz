let questionEl, answersEl, timerEl, timerBar;
let timer;
let timeLeft = 10;
let current = 0;
let score = 0;
let selectedQuestions = [];

// Background audio
const bgAudio = document.getElementById("bg-audio");
function playAudio() {
  bgAudio.volume = 0.2;
  bgAudio.play().catch(() => {
    document.addEventListener('click', () => bgAudio.play(), { once: true });
  });
}
playAudio();

// Categories & questions
const categories = {
  "Prophets": [
    { question: "Who was the first prophet?", answers: ["Adam","Noah","Moses","Muhammad"], correct: 0 },
    { question: "Who was swallowed by a big fish?", answers: ["Yunus","Musa","Isa","Dawud"], correct: 0 },
    { question: "Which prophet built the Kaaba?", answers: ["Ibrahim","Musa","Nuh","Isa"], correct: 0 },
    { question: "Who is the last prophet in Islam?", answers: ["Isa","Musa","Muhammad","Dawud"], correct: 2 },
    { question: "Which prophet is known for patience?", answers: ["Ayyub","Nuh","Musa","Ibrahim"], correct: 0 },
    { question: "Which prophet led Israelites out of Egypt?", answers: ["Musa","Ibrahim","Nuh","Isa"], correct: 0 },
    { question: "Who received the Ten Commandments?", answers: ["Musa","Ibrahim","Isa","Dawud"], correct: 0 },
    { question: "Prophet Isa is known as?", answers: ["Jesus","John","Mohammad","Musa"], correct: 0 },
    { question: "Prophet Nuh built what?", answers: ["Ark","Temple","Mosque","Castle"], correct: 0 },
    { question: "Which prophet was tested with fire?", answers: ["Ibrahim","Musa","Dawud","Yunus"], correct: 0 }
  ],
  "Ramadan": [
    { question: "Fasting in Ramadan is obligatory. True or False?", answers: ["True","False"], correct: 0 },
    { question: "Which night is Laylat al-Qadr?", answers: ["1st Ramadan","10th Ramadan","27th Ramadan","15th Ramadan"], correct: 2 },
    { question: "Eid al-Fitr marks the end of?", answers: ["Muharram","Ramadan","Shawwal","Dhul-Hijjah"], correct: 1 },
    { question: "Suhoor is?", answers: ["Evening meal","Pre-dawn meal","Lunch","Snack"], correct: 1 },
    { question: "Iftar is?", answers: ["Evening meal to break fast","Morning prayer","Charity","Hajj ritual"], correct: 0 },
    { question: "Fasting is required for?", answers: ["All adults","Children","Sick people","Travelers"], correct: 0 },
    { question: "Ramadan is which month?", answers: ["9th","10th","12th","7th"], correct: 0 },
    { question: "Ramadan commemorates?", answers: ["Quran revelation","Prophet birth","Hijra","Hajj"], correct: 0 },
    { question: "Zakat al-Fitr is?", answers: ["Charity at end of Ramadan","Obligatory prayer","Hajj offering","Daily fast"], correct: 0 },
    { question: "Fasting is broken with?", answers: ["Dates","Water","Bread","Milk"], correct: 0 }
  ],
  "Pillars of Islam": [
    { question: "How many pillars of Islam are there?", answers: ["3","5","6","7"], correct: 1 },
    { question: "Shahada is?", answers: ["Prayer","Declaration of faith","Charity","Fasting"], correct: 1 },
    { question: "Salat is?", answers: ["Prayer","Charity","Fasting","Pilgrimage"], correct: 0 },
    { question: "Zakat is?", answers: ["Prayer","Charity","Fasting","Pilgrimage"], correct: 1 },
    { question: "Sawm is?", answers: ["Fasting","Charity","Pilgrimage","Prayer"], correct: 0 },
    { question: "Hajj is?", answers: ["Pilgrimage","Fasting","Prayer","Charity"], correct: 0 },
    { question: "Which pillar is prayer 5 times a day?", answers: ["Salat","Zakat","Sawm","Hajj"], correct: 0 },
    { question: "Declaration of faith is called?", answers: ["Shahada","Salat","Sawm","Hajj"], correct: 0 },
    { question: "Zakat is obligatory on?", answers: ["Wealth","Prayer","Fasting","Pilgrimage"], correct: 0 },
    { question: "Pilgrimage required if?", answers: ["Able physically & financially","All Muslims","Children","Sick"], correct: 0 }
  ],
  "Quran Knowledge": [
    { question: "What is the holy book of Islam?", answers: ["Bible","Quran","Torah","Zabur"], correct: 1 },
    { question: "The Quran was revealed to?", answers: ["Moses","Muhammad","Isa","Dawud"], correct: 1 },
    { question: "Quran is written in?", answers: ["Arabic","Hebrew","English","Persian"], correct: 0 },
    { question: "Which surah is longest?", answers: ["Al-Baqarah","Al-Fatiha","Yaseen","Al-Ikhlas"], correct: 0 },
    { question: "Quran has how many chapters?", answers: ["114","120","100","150"], correct: 0 },
    { question: "The Quran was revealed over how many years?", answers: ["23","20","30","15"], correct: 0 },
    { question: "The first revelation was in?", answers: ["Cave Hira","Kaaba","Medina","Ta’if"], correct: 0 },
    { question: "Which surah is called heart of Quran?", answers: ["Yaseen","Al-Baqarah","Al-Fatiha","An-Nas"], correct: 0 },
    { question: "Quran teaches?", answers: ["Faith & morals","Math","History only","Science"], correct: 0 },
    { question: "Quran forbids?", answers: ["Lying & injustice","Praying","Charity","Helping"], correct: 0 }
  ],
  "Hajj Knowledge": [
    { question: "Hajj pilgrimage is obligatory how many times?", answers: ["1","2","If able","Every year"], correct: 2 },
    { question: "Tawaf is?", answers: ["Circumambulation of Kaaba","Prayer","Fasting","Charity"], correct: 0 },
    { question: "Sa’i is?", answers: ["Walking between Safa & Marwah","Pilgrimage","Charity","Prayer"], correct: 0 },
    { question: "Ihram is?", answers: ["State of purity for Hajj","Prayer","Fasting","Charity"], correct: 0 },
    { question: "Hajj occurs in?", answers: ["Dhul-Hijjah","Ramadan","Shawwal","Muharram"], correct: 0 },
    { question: "Arafat day is?", answers: ["9th Dhul-Hijjah","10th Dhul-Hijjah","27th Ramadan","1st Muharram"], correct: 0 },
    { question: "Hajj is one of pillars? True or False?", answers: ["True","False"], correct: 0 },
    { question: "Sacrifice ritual during Hajj is?", answers: ["Qurbani","Fasting","Salat","Zakat"], correct: 0 },
    { question: "Kaaba is in?", answers: ["Mecca","Medina","Jerusalem","Ta’if"], correct: 0 },
    { question: "Hajj must be done by?", answers: ["Muslims able","All humans","Children","Sick"], correct: 0 }
  ]
};

// Display categories
function showCategories() {
  const categoriesDiv = document.getElementById("categories");
  categoriesDiv.innerHTML = "";
  for (let cat in categories) {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.add("category-btn");
    btn.onclick = () => startCategory(cat);
    categoriesDiv.appendChild(btn);
  }
}

// Start category
function startCategory(cat) {
  selectedQuestions = [...categories[cat]];
  current = 0;
  score = 0;
  setupQuizUI();
  loadQuestion();
}

// Setup quiz UI
function setupQuizUI() {
  document.getElementById("quiz-container").innerHTML = `
    <h1>Islamic Quiz</h1>
    <div id="timer-container">
      <div id="timer-bar"></div>
      <p id="timer">Time: 10</p>
    </div>
    <h2 id="question"></h2>
    <div id="answers"></div>
  `;
  questionEl = document.getElementById("question");
  answersEl = document.getElementById("answers");
  timerEl = document.getElementById("timer");
  timerBar = document.getElementById("timer-bar");
}

// Timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = "Time: " + timeLeft;
  timerBar.style.animation = "none";
  timerBar.offsetHeight;
  timerBar.style.animation = "timerAnim 10s linear forwards";

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      current++;
      if (current < selectedQuestions.length) loadQuestion();
      else showResult();
    }
  }, 1000);
}

// Load question
function loadQuestion() {
  startTimer();
  answersEl.innerHTML = "";
  const q = selectedQuestions[current];
  questionEl.textContent = q.question;

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      clearInterval(timer);
      const buttons = document.querySelectorAll("button");
      buttons.forEach(b => b.disabled = true);
      if (index === q.correct) { btn.classList.add("correct"); score++; }
      else { btn.classList.add("wrong"); buttons[q.correct].classList.add("correct"); }

      setTimeout(() => {
        current++;
        if (current < selectedQuestions.length) loadQuestion();
        else showResult();
      }, 800);
    };
    answersEl.appendChild(btn);
  });
}

// Show result
function showResult() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>Your score: ${score}/${selectedQuestions.length}</h2>
    <button id="restart">Restart Quiz</button>
    <div id="animation-container"></div>
  `;

  const animContainer = document.getElementById("animation-container");

  if (score === selectedQuestions.length) {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random()*100+"%";
      confetti.style.backgroundColor = `hsl(${Math.random()*360},70%,60%)`;
      animContainer.appendChild(confetti);
    }
  }

  if (score === 0) {
    const sad = document.createElement("div");
    sad.textContent = "😢";
    sad.classList.add("sad-face");
    animContainer.appendChild(sad);
  }

  document.getElementById("restart").onclick = showCategories;
}

// Initial load
showCategories();
