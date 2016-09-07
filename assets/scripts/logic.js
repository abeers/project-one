'use strict';

const app = require('./app');

const winConditions = {
  'horz0': 0,
  'horz1': 0,
  'horz2': 0,
  'vert0': 0,
  'vert1': 0,
  'vert2': 0,
  'diag0': 0,
  'diag1': 0,
};

const incrementGameConditions = (winCondArray, player) => {
  let increment = 0;
  if (player === 'x') {
    increment = 1;
  }
  else if (player === 'o') {
    increment = -1;
  }

  for (let i = 0; i < winCondArray.length; i++) {
    let condition = winCondArray[i];
    app.winConditions[condition] += increment;
  }
};

const setGameConditions = (data) => {
  let cellArray = data.game.cells;
  app.winConditions = winConditions;

  for (let i = 0; i < cellArray.length; i++) {
    let winCondArray = $('[data-id=' + i + ']').data('win-conditions');
    incrementGameConditions(winCondArray, cellArray[i]);
  }

};

const isValidMove = (index) => {
  let boardArray = app.user.currentGame.cells;
  if (boardArray[index] === '') {
    return true;
  } else {
    return false;
  }
};

const isGameWin = () => {
  let gameConditions = app.winConditions;

  for (let condition in gameConditions) {
    if (Math.abs(gameConditions[condition]) === 3) {
      return true;
    }
  }

  return false;
};

const isGameTie = () => {
  if (isGameWin()) {
    return false;
  } else {
    let boardArray = app.user.currentGame.cells;

    for (let i = 0; i < boardArray.length; i++) {
      if (boardArray[i] === '') {
        return false;
      }
    }

    return true;
  }
};

const isGameOver = () => {
  if (isGameWin() || isGameTie()) {
    return true;
  } else {
    return false;
  }
};

const changePlayer = () => {
  if (app.player === 'x') {
    app.player = 'o';
  }
  else if (app.player === 'o') {
    app.player = 'x';
  }
};

module.exports = {
  isGameOver,
  isGameWin,
  isGameTie,
  isValidMove,
  changePlayer,
  setGameConditions,
  incrementGameConditions
};
