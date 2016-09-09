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
    $('#player-turn').html("Congratulations Player " + app.player);
  } else if (logic.isGameTie()) {
    $('#player-turn').html("Tie");
  }
};

const updatePlayerTurn = () => {
  $('#player-turn').html("Player " + app.player + ", it's your turn");
};


const hideForm = (formId) => {
  $(formId).hide();
};

const showForm = (event) => {
  $('form').hide();
  let buttonId = event.target.id;
  let formId = '#' + buttonId.slice(0, -7);
  $(formId).show();
};

const showMenu = () => {
  $('#dropmenu').show();
};

const hideMenu = () => {
  $('#dropmenu').hide();
};

const toggleSignInButtons = () => {
  $('.nav-button').toggle();
  $('#sign-in-name').toggle();
};

const signUpSuccess = (data) => {
  console.log(data);
};

const signInSuccess = (data) => {
  app.user = data.user;
  $('#sign-in-name').html(app.user.email);
  toggleSignInButtons();
  $('#welcome').html("Hello, " + app.user.email);
};

const changePasswordSuccess = () => {
  console.log("Password successfully changed.");
};

const signOutSuccess = () => {
  app.user = null;
  console.log("Sign out successful");
  toggleSignInButtons();
  $('.board').hide();
  $('#welcome').html("Thanks for playing!");
  $('#welcome').show();
  $('#player-turn').hide();
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
  $('#welcome').hide();
};

const startGameSuccess = (data) => {
  console.log("Start game successful");
  console.log(data);
  app.user.currentGame = data.game;
};

const updateGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data);
  updatePlayerTurn();
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
  celebration,
  hideForm,
  showForm,
  showMenu,
  hideMenu,
  toggleSignInButtons,
  updatePlayerTurn
};
