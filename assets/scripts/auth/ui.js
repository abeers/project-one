'use strict';

const app = require('../app');
const logic = require('../logic');



const clearGameBoard = () => {
  $('.cell').removeClass('x-occupied');
  $('.cell').removeClass('o-occupied');
};

const renderGameBoard = (game) => {
  clearGameBoard();
  const cellArray = game.cells;

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
};

const changePasswordSuccess = () => {
  console.log("Password successfully changed.");
};

const signOutSuccess = () => {
  app.user = null;
  console.log("Sign out successful");
  toggleSignInButtons();
  $('.board').hide();
  $('#instructions').html("Thanks for playing!");
  $('#instructions').show();
  $('#player-turn').hide();
};

const getGamesSuccess = (data) => {
  app.user.games = data.games;
  console.log(app.user);
};

const getGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
  logic.setGameConditions();
  // console.log(data);
  console.log("Got game " + data.game.id);
  updatePlayerTurn();
  $('.board').show();
  $('#instructions').hide();
};

const startGameSuccess = (data) => {
  console.log("Start game successful");
  console.log(data);
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
  logic.setGameConditions();
  updatePlayerTurn();
  $('.board').show();
  $('#instructions').hide();
};

const updateGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
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
