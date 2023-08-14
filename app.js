document.addEventListener("DOMContentLoaded", () => {
  const TIMEOUT_DELAY = 500;
  const OPTION_DELAY = 1000;

  // DOM elements
  const btnRules = document.querySelector(".rules-btn");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".modal");
  const optionButtons = document.querySelectorAll(".option_btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results_result");
  const resultWinner = document.querySelector(".results_winner");
  const resultText = document.querySelector(".results_text");
  const playAgainBtn = document.querySelector(".play-again");
  const scoreNumber = document.querySelector(".score-number");

  // Game options and scores
  const OPTIONS = [
    { name: "paper", beats: ["rock", "spock"] },
    { name: "scissors", beats: ["paper", "lizard"] },
    { name: "rock", beats: ["scissors", "lizard"] },
    { name: "lizard", beats: ["paper", "spock"] },
    { name: "spock", beats: ["rock", "scissors"] },
  ];
  let score = parseInt(localStorage.getItem("score")) || 0;
  scoreNumber.textContent = score;

  // Preload animation removal
  setTimeout(() => {
    document.body.classList.remove("preload");
  }, TIMEOUT_DELAY);

  // Event listeners
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const optionName = button.dataset.option;
      const option = OPTIONS.find((opt) => opt.name === optionName);
      choose(option);
    });
  });

  playAgainBtn.addEventListener("click", resetGame);
  btnRules.addEventListener("click", toggleRulesModal);
  btnClose.addEventListener("click", toggleRulesModal);

  // Choose user's option and AI's option
  function choose(option) {
    const aiOption = aiChoose();
    displayResults([option, aiOption]);
    displayWinner([option, aiOption]);
  }

  // Randomly choose AI's option
  function aiChoose() {
    const rand = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[rand];
  }

  // Display chosen options
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="option ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * OPTION_DELAY);
    });

    toggleElementVisibility(gameDiv);
    toggleElementVisibility(resultsDiv);
  }

  // Display winner and update score
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());

      if (userWins) {
        updateResultText("You Win", "41%", resultDivs[0]);
        keepScore(1);
      } else if (aiWins) {
        updateResultText("You Lose", "39%", resultDivs[1]);
        keepScore(-1);
      } else {
        updateResultText("Draw", "44%");
      }

      toggleElementVisibility(resultWinner);
      toggleElementVisibility(resultsDiv, "show-winner");
    }, OPTION_DELAY);
  }

  // Check if the user wins
  function isWinner(results) {
    return results[0].beats.includes(results[1].name);
  }

  // Update and display score
  function keepScore(point) {
    score += point;
    scoreNumber.textContent = score;
    localStorage.setItem("score", score.toString());
  }

  // Reset the game
  function resetGame() {
    toggleElementVisibility(gameDiv);
    toggleElementVisibility(resultsDiv);
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
    updateResultText("", "");
    toggleElementVisibility(resultWinner, "hidden");
    toggleElementVisibility(resultsDiv, "show-winner");
  }

  // Toggle rules modal
  function toggleRulesModal() {
    modalRules.classList.toggle("show-modal");
  }

  // Helper function to update result text and position
  function updateResultText(text, leftPosition, resultDiv = null) {
    resultText.textContent = text;
    resultText.style.left = leftPosition;
    if (resultDiv) {
      resultDiv.classList.toggle("winner");
    }
  }

  // Helper function to toggle element visibility and class
  function toggleElementVisibility(element, className = "hidden") {
    element.classList.toggle(className);
  }
});
