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
    .done(ui.signUpSuccess, $('sign-up').hide())
    .fail(ui.failure);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.signIn(data)
    .done(ui.signInSuccess, $('#sign-in').hide())
    .fail(ui.failure);
};

const onChangePassword = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.changePassword(data)
    .done(ui.changePasswordSuccess, $('#change-password').hide())
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
    .done(ui.getGamesSuccess, $('#index-games').hide())
    .fail(ui.failure);
};

const buildGetDataFromGame = function (game) {
  let data = {};
  data.game = {};
  data.game.id = game.id;

  return data;
};

const onGetGame = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  // let data = buildGetDataFromGame(app.user.currentGame);
  // console.log(data);
  // console.log(buildGetDataFromApp());
  api.getGame(data)
    .done(ui.getGameSuccess, $('#show-game').hide())
    .fail(ui.failure);
};

const onStartGame = function (event) {
  event.preventDefault();

  api.startGame()
    .done(ui.startGameSuccess, $('#start-game').hide())
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
    let indexWins = $('[data-id=' + index + ']').data('win-conditions');
    logic.incrementGameConditions(indexWins, app.player);

    let data = buildUpdateDataFromClick(event);

    api.updateGame(data)
      .done(ui.updateGameSuccess)
      .fail(ui.failure);

    if (!logic.isGameOver()) {
      logic.changePlayer();
    }
  }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out-button').on('click', onSignOut);
  $('#index-games').on('submit', onGetGames);
  $('#show-game').on('submit', onGetGame);
  $('#start-game').on('submit', onStartGame);
  $('.cell').on('click', onUpdateGame);
  $('#sign-in-button').on('click', function () {
    $('#sign-in').show();
  });
  $('#change-password-button').on('click', function () {
    $('#change-password').show();
  });
  $('#sign-up-button').on('click', function () {
    $('#sign-up').show();
  });
  $('#index-games-button').on('click', function () {
    $('#index-games').show();
  });
  $('#show-game-button').on('click', function () {
    $('#show-game').show();
  });
  $('#start-game-button').on('click', function () {
    $('#start-game').show();
  });
};

module.exports = {
  addHandlers,
};
