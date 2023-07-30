//Prevent animation on load
setTimeout(() => {
  Document.body.classList.remove('preload')
}, 500);




//DOM
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const OPTIONS = [
  {
    name: "paper",
    beats: "rock"
  },
  {
    name: "scissors",
    beats: "paper"
  },
  {
    name: "rock",
    beats: "lizard"
  },
  {
    name: "lizard",
    beats: "spock"
  },
  {
    name: "spock",
    beats: "scissors"
  },
  {
    name: "scissors",
    beats: "lizard"
  },
  {
    name: "paper",
    beats: "spock"
  },
  {
    name: "rock",
    beats: "scissors"
  },
  {
    name: "lizard",
    beats: "paper"
  },
  {
    name: "spock",
    beats: "rock"
  },
]

const optionButton = document.querySelectorAll('.option-btn')
const gameDiv = document.querySelectorAll('.game')
const resultsDiv = document.querySelectorAll('.results')
const resultDivs = document.querySelectorAll('.results-results')


//Game Logic 
optionButton.forEach ( button )


//Show/Hide Rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});


