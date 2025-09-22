'use strict';

const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();   
//displays current score on the webpage

document.querySelector('.js-rock-btn').addEventListener('click', () => playGame('Rock'));
document.querySelector('.js-paper-btn').addEventListener('click', () => playGame('Paper'));
document.querySelector('.js-scissors-btn').addEventListener('click', () => playGame('Scissors'));
document.querySelector('.js-reset-btn').addEventListener('click', () => resetScore());


function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `<p>Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</p>`;
}


function pickComputerMove() {
  const randomNum = Math.random();

  return (
    randomNum >= 0 && randomNum < 1/3)? 'Rock':
    (randomNum >= 1/3 && randomNum < 2/3)? 'Paper':
    'Scissors';
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  //generates computerMove
        
  let result = '';

  if (playerMove === 'Rock') {      
    result = (computerMove === 'Scissors')? 'You win.':
    (computerMove === 'Paper')? 'You lose.': 'Tie.';
  } else if (playerMove === 'Paper') {
    result = (computerMove === 'Rock')? 'You win.':
    (computerMove === 'Scissors')? 'You lose.': 'Tie.';
  } else if (playerMove === 'Scissors') {
    result = (computerMove === 'Paper')? 'You win.':
    (computerMove === 'Rock')? 'You lose.': 'Tie.';
  };
  //compares player & computer moves

  switch (result) {                
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
  //update game result object & save it to localStorage

  updateScoreElement();
  //display updated score on the webpage        

  document.querySelector('.js-result').innerHTML = `<p>${result}</p>`;
  //display game result on the webpage

  document.querySelector('.js-moves')  
    .innerHTML = `<p> You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer </p>`;
  //display player & computer moves on the webpage
} 


function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
  //update score on the wabpage & save it to local storage
}