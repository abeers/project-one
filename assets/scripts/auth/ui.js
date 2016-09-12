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
    $('#' + app.player + "-winner").html('You Win!');
    $('#' + app.player + "-winner").show();
    $('.turn').hide();
    let game1 = {};
    game1.cells = ['d',app.player,'d',app.player,'l',app.player,'d',app.player,'d'];
    let game2 = {};
    game2.cells = [app.player,'l',app.player,'l','d','l',app.player,'l',app.player];
    let game3 = {};
    game3.cells = ['l','d','l','d',app.player,'d','l','d','l'];

    let timeInterval = 250;
    let cycles = 8;
    let frames = 3;
    for (let i = 1; i < cycles; i++) {
      setTimeout(renderGameBoard, timeInterval*(frames*i - 2), game1);
      setTimeout(renderGameBoard, timeInterval*(frames*i - 1), game2);
      setTimeout(renderGameBoard, timeInterval*(frames*i), game3);
    }
    setTimeout(renderGameBoard, timeInterval*(frames*cycles), app.user.currentGame);
  } else if (logic.isGameTie()) {
    $('.winner').html('Tie');
    $('.winner').show();
    $('.turn').hide();
    let game1 = {};
    game1.cells = ['d','l','l','l','d','l','l','l','d'];
    let game2 = {};
    game2.cells = ['l','d','l','l','d','l','l','d','l'];
    let game3 = {};
    game3.cells = ['l','l','d','l','d','l','d','l','l'];
    let game4 = {};
    game4.cells = ['l','l','l','d','d','d','l','l','l'];

    let timeInterval = 250;
    let cycles = 6;
    let frames = 4;
    for (let i = 1; i < cycles; i++) {
      setTimeout(renderGameBoard, timeInterval*(frames*i - 3), game1);
      setTimeout(renderGameBoard, timeInterval*(frames*i - 2), game2);
      setTimeout(renderGameBoard, timeInterval*(frames*i - 1), game3);
      setTimeout(renderGameBoard, timeInterval*(frames*i), game4);
    }
    setTimeout(renderGameBoard, timeInterval*(frames*cycles), app.user.currentGame);
  }
};

// const setPlayers = () => {
//   $('#x-player').html(app.user.currentGame.player_x.email);
//   $('#o-player').html(app.user.currentGame.player_o.email);
// };

const updatePlayerTurn = () => {
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
  $('#sign-in-message').hide();
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

const signUpSuccess = () => {
  $('#sign-in').show();
};

const signInSuccess = (data) => {
  app.user = data.user;
  $('#sign-in-name').html(app.user.email);
  $('#instructions').show();
  $('#goodbye').hide();
  toggleSignInButtons();
};

const changePasswordSuccess = () => {
  // console.log("Password successfully changed.");
};

const signOutSuccess = () => {
  app.user = null;
  toggleSignInButtons();
  $('.board').hide();
  $('#goodbye').show();
  $('.player-bar').hide();
  $('#total-games').hide();
  $('#instructions').hide();
  $('#game-title').removeClass('header-attack header-defend header-x header-o');
};

const getGamesSuccess = (data) => {
  app.user.games = data.games;
  $('#total-games').html("G: " + data.games.length).show();
};

const getGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
  logic.setGameConditions();
  updatePlayerTurn();
  $('.board').show();
  $('#instructions').hide();
  $('.winner').hide();
};

const startGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
  logic.setGameConditions();
  $('.board').show();
  $('#instructions').hide();
  $('.player-bar').show();
  $('.left-side .turn').show();
  $('.right-side .turn').hide();
  $('#game-title').removeClass('header-attack header-defend header-x header-o');
  $('#game-title').addClass('header-' + app.player);
  if (app.mode === 'tactico') {
    $('#game-title').removeClass('header-' + app.player);
    updatePlayerTurn();
    logic.changePlayer();
    $('#' + app.player + '-turn').html('Defend');
    $('#game-title').addClass('header-' + app.player + ' header-defend');
  }
  $('.winner').hide();
};

const updateGameSuccess = (data) => {
  app.user.currentGame = data.game;
  renderGameBoard(data.game);
  celebration();
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
