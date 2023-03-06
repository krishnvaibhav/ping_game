'use strict';
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const winMsg0 = document.querySelector('#won0');
const winMsg1 = document.querySelector('#won1');
winMsg0.classList.add('hidden');
winMsg1.classList.add('hidden');
document.querySelector('#namei0').addEventListener('keydown', function (e) {
  const playerName = document.querySelector('#namei0').value;
  if (e.key === 'Enter') {
    document.querySelector('#name--0').textContent = playerName;
    document.querySelector('.NAMEI0').classList.add('hidden');
  }
});
document.querySelector('#namei1').addEventListener('keydown', function (e) {
  const playerName = document.querySelector('#namei1').value;
  if (e.key === 'Enter') {
    document.querySelector('#name--1').textContent = playerName;
    document.querySelector('.NAMEI1').classList.add('hidden');
  }
});

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0el.textContent = 0;
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  score1el.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector('#won0').classList.add('hidden');
  document.querySelector('#won1').classList.add('hidden');
  // player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   generating random number
    diceEl.classList.remove('hidden');
    //   showing dice
    diceEl.src = `dice-${dice}.png`;
    // changing dice value
    if (dice !== 1) {
      currentScore += dice;
      // change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    // document.querySelector(`#won${activePlayer}`).classList.remove('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    playing = false;
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});
btnNew.addEventListener('click', init);
