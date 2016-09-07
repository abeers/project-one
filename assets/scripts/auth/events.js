'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
const logic = require('../logic');

const app = require('../app');

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.signUp(data)
    .done(ui.signUpSuccess)
    .fail(ui.failure);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.signIn(data)
    .done(ui.signInSuccess)
    .fail(ui.failure);
};

const onChangePassword = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .fail(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();

  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
};

const onGetGames = function (event) {
  event.preventDefault();

  api.getGames()
    .done(ui.getGamesSuccess)
    .fail(ui.failure);
};

const onGetGame = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.getGame(data)
    .done(ui.getGameSuccess, ui.renderGameBoard, logic.setGameConditions)
    .fail(ui.failure);
};

const onStartGame = function (event) {
  event.preventDefault();

  api.startGame()
    .done(ui.startGameSuccess)
    .fail(ui.failure);
};

const buildUpdateDataFromClick = function (event) {
  let cellClicked = event.target;

  let data = {};
  data.game = {};
  data.game.cell = {};
  data.game.cell.index = $(cellClicked).data('id');
  data.game.cell.value = app.player;
  data.game.over = logic.isGameOver();

  return data;
};

const onUpdateGame = function (event) {
  event.preventDefault();
  let index = $(event.target).data('id');

  if (!app.user.currentGame.over && logic.isValidMove(index)) {
    let data = buildUpdateDataFromClick(event);
    let indexWins = $('[data-id=' + index + ']').data('win-conditions');
    logic.incrementGameConditions(indexWins, app.player);

    api.updateGame(data)
      .done(ui.updateGameSuccess, ui.renderGameBoard)
      .fail(ui.failure);

    if(logic.isGameWin()) {
      ui.winningCelebration(app.player);
    } else if (logic.isGameTie()) {
      ui.tieCelebration();
    } else {
      logic.changePlayer();
    }
  }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('#index-games').on('submit', onGetGames);
  $('#show-game').on('submit', onGetGame);
  $('#start-game').on('submit', onStartGame);
  $('.cell').on('click', onUpdateGame);
};

module.exports = {
  addHandlers,
};
