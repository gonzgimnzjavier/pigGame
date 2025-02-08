'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const setWinnerStyles = function () {
  playing = false;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--winner`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--active`);
};

// Rolling dice functionallity
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true switch player

    if (dice !== 1) {
      //Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current to active's player score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is already 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      setWinnerStyles();
    } else {
      //Finish Game or switch to the next player
      switchPlayer();
    }
  }
});

// Adding functionality to reset the game

btnNew.addEventListener('click', function () {
  console.log(`click in new game`);

  // Reset scores
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Reset current scores
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset game state
  playing = true;
  diceEl.classList.add('hidden');

  // Remove winner styles from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Ensure player 0 is always the starting player
  if (activePlayer === 1) {
    switchPlayer(); // Cambia a player 0 si el ganador era player 1
  }

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  activePlayer = 0; // Reiniciar a player 0
});
