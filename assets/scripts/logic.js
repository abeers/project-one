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

const clearGameConditions = () => {
  for (let condition in winConditions) {
    winConditions[condition] = 0;
  }
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

const setGameConditions = () => {
  app.player = 'x';
  clearGameConditions();
  let cellArray = app.user.currentGame.cells;
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

  if (app.mode === 'tactico') {
    let boardArray = app.user.currentGame.cells;
    let count = 0;
    for (let i = 0; i < boardArray.length; i++) {
      if (app.player === boardArray[i]) {
        if (++count === 5) {
          return true;
        }
      }
    }
  }

  return false;
};

const isGameTie = () => {
  let boardArray = app.user.currentGame.cells;

  if (isGameWin()) {
    return false;
  } else if (app.mode === 'standard') {

    for (let i = 0; i < boardArray.length; i++) {
      if (boardArray[i] === '') {
        return false;
      }
    }

  } else if (app.mode === 'tactico') {
    let count = 0;

    for (let i = 0; i < boardArray.length; i++) {
      if (boardArray[i] === '') {
        if (++count === 2) {
          return false;
        }
      }
    }

  }
  return true;
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
