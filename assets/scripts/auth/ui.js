'use strict';

const app = require('../app');
const logic = require('../logic');



const clearGameBoard = () => {
  $('.cell').removeClass('x-occupied o-occupied d-occupied l-occupied');
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
    $('#' + app.player + "-winner").show();
    $('.turn').hide();
    let game1 = {};
    game1.cells = ['d',app.player,'d',app.player,'l',app.player,'d',app.player,'d'];
    let game2 = {};
    game2.cells = [app.player,'l',app.player,'l','d','l',app.player,'l',app.player];
    let game3 = {};
    game3.cells = ['l','d','l','d',app.player,'d','l','d','l'];

    let timeInterval = 300;
    let cycles = 10;
    let frames = 3;
    for (let i = 1; i < cycles; i++) {
      setTimeout(renderGameBoard, timeInterval*(frames*i - 2), game1);
      setTimeout(renderGameBoard, timeInterval*(frames*i - 1), game2);
      setTimeout(renderGameBoard, timeInterval*(frames*i), game3);
    }
    setTimeout(renderGameBoard, timeInterval*(frames*cycles), app.user.currentGame);
  } else if (logic.isGameTie()) {
    // $('#player-turn').html("Tie");
  }
};

const setPlayers = () => {
  $('#x-player').html(app.user.currentGame.player_x.email);
  $('#o-player').html(app.user.currentGame.player_o.email);
};

const updatePlayerTurn = () => {
  // $('#player-turn').html("Player " + app.player + ", it's your turn");
  $('.turn').toggle();
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
  $('.winner').hide();
};

const getGamesSuccess = (data) => {
  app.user.games = data.games;
  console.log(app.user);
  $('#total-games').html(data.games.length + " games played").show();
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
  $('.winner').hide();
};

const startGameSuccess = (data) => {
  console.log("Start game successful");
  console.log(data);
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
  logic.setGameConditions();
  // setPlayers();
  updatePlayerTurn();
  $('.board').show();
  $('#instructions').hide();
  $('.player-bar').show();
  $('.left-side .turn').show();
  $('.right-side .turn').hide();
  $('.winner').hide();
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
