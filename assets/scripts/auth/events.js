'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

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
    .done(ui.signInSuccess, $('#sign-in').hide())
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
    .done(ui.getGameSuccess, ui.renderGameBoard)
    .fail(ui.failure);
};

const onStartGame = function (event) {
  event.preventDefault();

  api.startGame()
    .done(ui.startGameSuccess)
    .fail(ui.failure);
};

const onUpdateGame = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.updateGame(data)
    .done(ui.updateGameSuccess, ui.renderGameBoard)
    .fail(ui.failure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out-button').on('click', onSignOut);
  $('#index-games').on('submit', onGetGames);
  $('#show-game').on('submit', onGetGame);
  $('#start-game').on('submit', onStartGame);
  $('#update-game').on('submit', onUpdateGame);
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
