'use strict';

const app = require('../app');
const logic = require('../logic');



const clearGameBoard = () => {
  $('.cell').removeClass('x-occupied');
  $('.cell').removeClass('o-occupied');
};

const renderGameBoard = (data) => {
  const cellArray = data.game.cells;

  for (let i = 0; i < cellArray.length; i++) {
    if(cellArray[i] !== '') {
      $('[data-id=' + i + ']').addClass(cellArray[i] + '-occupied');
    }
  }
};

const celebration = () => {
  if (logic.isGameWin()) {
    alert("Congratulations Player " + app.player);
  } else if (logic.isGameTie()) {
    alert("Tie");
  }
};




const signUpSuccess = (data) => {
  console.log(data);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log("Welcome," + app.user.email);
  $("#user").html(app.user);
  $('nav > button').show();
  $('#sign-in-button').hide();
  $('#sign-up-button').hide();
};

const changePasswordSuccess = () => {
  console.log("Password successfully changed.");
};

const signOutSuccess = () => {
  app.user = null;
  console.log("Sign out successful");
  $('nav > button').hide();
  $('#sign-in-button').show();
  $('#sign-up-button').show();
  $('.board').hide();
};

const getGamesSuccess = (data) => {
  app.user.games = data.games;
  console.log(app.user);
};

const getGameSuccess = (data) => {
  clearGameBoard();

  app.user.currentGame = data.game;
  renderGameBoard(data);
  logic.setGameConditions();
  // console.log(data);
  console.log("Got game " + data.game.id);
  $('.board').show();
};

const startGameSuccess = (data) => {
  console.log("Start game successful");
  console.log(data);
  app.user.currentGame = data.game;
};

const updateGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data);
  celebration();
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  getGamesSuccess,
  getGameSuccess,
  startGameSuccess,
  updateGameSuccess,
  renderGameBoard,
  celebration
};
