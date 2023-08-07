// Wait for 500ms and then remove the preload class to prevent animation on load
setTimeout(() => {
  document.body.classList.remove('preload');
}, 500);

// Select DOM elements
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

// Define game options and their winning combinations
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

// Select option buttons, game container, results container, and result elements
const optionButtons = document.querySelectorAll('.option_btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results_result');

// Select result winner element and result text element
const resultWinner = document.querySelector('.results_winner');
const resultText = document.querySelector('.results_text');

// Select play again button and score number element
const playAgainBtn = document.querySelector('.play-again');
const scoreNumber = document.querySelector('.score-number');

// Initialize score
let score = 0;

// Add click event listeners to option buttons
optionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const optionName = button.dataset.option;
    const option = OPTIONS.find((opt) => opt.name === optionName);
    choose(option);
  });
});

// Function to handle user's choice and AI's choice
function choose(option) {
  const aiOption = aiChoose();
  displayResults([option, aiOption]);
  displayWinner([option, aiOption]);
}

// Function to randomly choose AI's option
function aiChoose() {
  const rand = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[rand];
}

// Function to display chosen options
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

  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');
}

// Function to display winner and update score
function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = 'You Win!';
      resultDivs[0].classList.toggle('winner');
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = 'You Lose!';
      resultDivs[1].classList.toggle('winner');
      keepScore(-1);
    } else {
      resultText.innerText = "It's a Draw!";
    }

    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
  }, 1000);
}

// Function to check if the user wins
function isWinner(results) {
  return results[0].beats.includes(results[1].name);
}

// Function to update and display score
function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// Add click event listener to play again button
playAgainBtn.addEventListener('click', () => {
  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('winner');
  });

  resultText.innerText = '';
  resultWinner.classList.toggle('hidden');
  resultsDiv.classList.toggle('show-winner');
});

// Add click event listeners to show/hide rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
