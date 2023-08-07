// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove('preload');
}, 500);

// DOM
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const OPTIONS = [
  {
    name: "paper",
    beats: ["rock", "spock"],
  },
  {
    name: "scissors",
    beats: ["paper", "lizard"],
  },
  {
    name: "rock",
    beats: ["scissors", "lizard"],
  },
  {
    name: "lizard",
    beats: ["paper", "spock"],
  },
  {
    name: "spock",
    beats: ["rock", "scissors"],
  },
];

const optionButtons = document.querySelectorAll('.option_btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results_result');

const resultWinner = document.querySelector('.results_winner');
const resultText = document.querySelector('.results_text');

const playAgainBtn = document.querySelector('.play-again');

const scoreNumber = document.querySelector('.score_number');
let score = 0;

// Game Logic
optionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const optionName = button.dataset.option;
    const option = OPTIONS.find((option) => option.name === optionName);
    choose(option);
  });
});

function choose(option) {
  const aiOption = aiChoose();
  displayResults([option, aiOption]);
  displayWinner([option, aiOption]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="option ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
      resultDiv.classList.toggle('winner', false);
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden", true);
  resultsDiv.classList.toggle("hidden", false);
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win!";
      resultDivs[0].classList.toggle('winner', true);
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "You lose!";
      resultDivs[1].classList.toggle('winner', true);
      keepScore(-1);
    } else {
      resultText.innerText = "Draw!";
    }

    resultWinner.classList.toggle("hidden", false);
    resultsDiv.classList.toggle("show-winner", true);
  }, 1000);
}


function isWinner(results) {
  return results[0].beats.includes(results[1].name);
}

  function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// Play Again
playAgainBtn.addEventListener('click', () => {
  gameDiv.classList.toggle("hidden", false);
  resultsDiv.classList.toggle("hidden", true);

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove('winner');
  });

  resultText.innerText = "";
  resultWinner.classList.toggle('hidden', true);
  resultsDiv.classList.toggle("show-winner", false);
});

// Show/Hide Rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
