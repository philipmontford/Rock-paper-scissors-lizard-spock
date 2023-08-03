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
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "lizard",
  },
  {
    name: "lizard",
    beats: "spock",
  },
  {
    name: "spock",
    beats: "scissors",
  },
  {
    name: "scissors",
    beats: "lizard",
  },
  {
    name: "paper",
    beats: "spock",
  },
  {
    name: "rock",
    beats: "scissors"
  },
  {
    name: "lizard",
    beats: "paper",
  },
  {
    name: "spock",
    beats: "rock",
  },
];

const optionButtons = document.querySelectorAll('.option_btn');
const gameDivs = document.querySelectorAll('.game');
const resultsDivs = document.querySelectorAll('.results');
const resultDivs = document.querySelectorAll('.results_result');

const resultWinner = document.querySelector('.results_winner');
const resultText = document.querySelector('.results_text');

const playAgainBtn = document.querySelector('.play-again');

// Game Logic
optionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const optionName = button.dataset.option;
    const option = OPTIONS.find((option) => option.name === optionName);
    choose(option);
  });
});

function choose(option) {
  const aioption = aiChoose();
  displayResults([option, aioption]);
  displayWinner([option, aioption]);
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
    }, idx * 1000);
  });

  gameDivs.forEach((gameDiv) => gameDiv.classList.toggle('hidden'));
  resultsDivs.forEach((resultsDiv) => resultsDiv.classList.toggle('hidden'));
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win!";
      resultDivs[0].classList.toggle('winner');
    } else if (aiWins) {
      resultText.innerText = "You lose!";
      resultDivs[1].classList.toggle('winner');
    } else {
      resultText.innerText = "It's a draw!";
      resultDivs[0].classList.toggle('winner');
    }

    resultWinner.classList.toggle('hidden');
    resultsDivs.forEach((resultsDiv) => resultsDiv.classList.toggle('show-winner'));
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Play Again
playAgainBtn.addEventListener('click', () => {
  gameDivs.forEach((gameDiv) => gameDiv.classList.toggle('hidden'));
  resultsDivs.forEach((resultsDiv) => resultsDiv.classList.toggle('hidden'));

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove('winner');
  });
  
  resultText.innerText = "";
  resultWinner.classList.toggle('hidden');
  resultsDivs.forEach((resultsDiv) => resultsDiv.classList.toggle('show-winner'));
});

// Show/Hide Rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
