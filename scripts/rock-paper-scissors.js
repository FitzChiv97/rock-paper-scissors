'use strict';

const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();   //displays current score on the webpage

function pickComputerMove() {
  const randomNum = Math.random();

  return (
    randomNum >= 0 && randomNum < 1/3)? 'Rock':
    (randomNum >= 1/3 && randomNum < 2/3)? 'Paper':
    'Scissors';
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();      //generates computerMove
  let result = '';

  if (playerMove === 'Rock') {                  //compares player & computer moves
    result = (computerMove === 'Scissors')? 'You win.':
    (computerMove === 'Paper')? 'You lose.': 'Tie.';

  } else if (playerMove === 'Paper') {
    result = (computerMove === 'Rock')? 'You win.':
    (computerMove === 'Scissors')? 'You lose.': 'Tie.';

  } else if (playerMove === 'Scissors') {
    result = (computerMove === 'Paper')? 'You win.':
    (computerMove === 'Rock')? 'You lose.': 'Tie.';
  };

  switch (result) {                //updates game result object & saves it to localStorage
    case 'You win.':
      score.wins += 1;
      break;

    case 'You lose.':
      score.losses += 1;
      break;

    default:
      score.ties += 1;
      break;
  };
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();        //displays updated score on the webpage

  document.querySelector('.js-result')  //displays game result 
    .innerHTML = result;

  document.querySelector('.js-moves')  //displays player & computer moves
    .innerHTML = ` You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer `;
} 

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}