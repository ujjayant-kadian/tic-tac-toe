'use strict';

const resetGameStatus = function () {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = 'none';
  let gameBoardIndex = 0;
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData.length; j++) {
      gameData[i][j] = 0;
      const gameBoardItem = gameBoardElement.children[gameBoardIndex];
      gameBoardItem.textContent = '';
      gameBoardItem.classList.remove('disabled');
      gameBoardIndex++;
    }
  }
};

const startNewGame = function () {
  if (!players[0].name || !players[1].name) {
    alert('Please set custom player names for both players!');
    return;
  }
  resetGameStatus();
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = 'block';
};

const checkForGameOver = function () {
  //for rows
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //for cols
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
};

const selectGameField = function (event) {
  if (event.target.tagName !== 'LI' || gameIsOver) return;

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert('Please select an empty field!');
    return;
  }

  selectedField.textContent = players[activePlayer].sybmol;
  selectedField.classList.add('disabled');

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  activePlayer = Number(!activePlayer);
  activePlayerNameElement.textContent = players[activePlayer].name;
};

const endGame = function (winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = 'block';
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = `It's a draw!`;
  }
};
