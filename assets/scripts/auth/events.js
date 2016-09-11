'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
const logic = require('../logic');

const app = require('../app');



const onSignUp = function (event) {
  event.preventDefault();
  let form = event.target;

  let data = getFormFields(form);

  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .done(ui.signUpSuccess, ui.hideForm(form), $('#password-message').hide())
      .fail(ui.failure);
  } else {
    $('#password-message').show();
  }
};

const onSignIn = function (event) {
  event.preventDefault();
  let form = event.target;

  let data = getFormFields(form);

  api.signIn(data)
    .done(ui.signInSuccess, ui.hideForm(form))
    .fail(ui.failure);
};

const onChangePassword = function (event) {
  event.preventDefault();
  let form = event.target;

  let data = getFormFields(form);

  api.changePassword(data)
    .done(ui.changePasswordSuccess, ui.hideForm(form))
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
  let form = event.target;

  api.getGames()
    .done(ui.getGamesSuccess, ui.hideForm(form))
    .fail(ui.failure);
};

// const buildGetDataFromGame = function (game) {
//   let data = {};
//   data.game = {};
//   data.game.id = game.id;
//
//   return data;
// };

const onGetGame = function (event) {
  event.preventDefault();
  let form = event.target;

  let data = getFormFields(form);
  // let data = buildGetDataFromGame(app.user.currentGame);
  // console.log(data);
  // console.log(buildGetDataFromApp());
  api.getGame(data)
    .done(ui.getGameSuccess, ui.hideForm(form))
    .fail(ui.failure);
};

const onStartGame = function (event) {
  event.preventDefault();
  app.mode = $(event.target).data('mode');
  if (app.mode === 'tactico') {
    app.defended = false;
  }

  let form = $('#start-game');

  api.startGame()
    .done(ui.startGameSuccess, ui.hideForm(form))
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

const updateStandardGame = () => {
  let index = $(event.target).data('id');

  if (!app.user.currentGame.over && logic.isValidMove(index)) {
    let indexWins = $('[data-id=' + index + ']').data('win-conditions');
    logic.incrementGameConditions(indexWins, app.player);

    let data = buildUpdateDataFromClick(event);

    api.updateGame(data)
      .done(ui.updateGameSuccess)
      .fail(ui.failure);
  }

  if (!logic.isGameOver()) {
    logic.changePlayer();
  }
};

const updateTacticoGame = function (event) {
  let index = $(event.target).data('id');

  if (!app.user.currentGame.over && logic.isValidMove(index)) {
    if (!app.defended) {
      app.blockCellIndex = index;
      app.defended = true;
      logic.changePlayer();
    } else if (app.defended){
      app.defended = false;
      if (index !== app.blockCellIndex) {
        let indexWins = $('[data-id=' + index + ']').data('win-conditions');
        logic.incrementGameConditions(indexWins, app.player);

        let data = buildUpdateDataFromClick(event);

        api.updateGame(data)
          .done(ui.updateGameSuccess)
          .fail(ui.failure);
      }
    }
  }
};

const onUpdateGame = function (event) {
  event.preventDefault();

  if (app.mode === 'standard') {
    updateStandardGame(event);
  } else if (app.mode === 'tactico') {
    updateTacticoGame(event);
  }
  // let index = $(event.target).data('id');
  //
  // if (!app.user.currentGame.over && logic.isValidMove(index)) {
  //   if (!app.defended) {
  //     app.blockCellIndex = index;
  //     app.defended = true;
  //     logic.changePlayer();
  //   } else if (app.defended){
  //     app.defended = false;
  //     if (index === app.blockCellIndex) {
  //       let indexWins = $('[data-id=' + index + ']').data('win-conditions');
  //       logic.incrementGameConditions(indexWins, app.player);
  //
  //       let data = buildUpdateDataFromClick(event);
  //
  //       api.updateGame(data)
  //         .done(ui.updateGameSuccess)
  //         .fail(ui.failure);
  //     }
  //
  //     if (!logic.isGameOver()) {
  //       logic.changePlayer();
  //     }
  //   }
  // }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out-button').on('click', onSignOut);
  $('#index-games').on('submit', onGetGames);
  $('#show-game').on('submit', onGetGame);
  $('#start-game .start-button').on('click', onStartGame);
  $('.cell').on('click', onUpdateGame);
  $('nav > .navbar-right, span').on('click', ui.showForm);
  $('#dropmenu > li').on('click', ui.showForm);
  $('#menu-button, #dropmenu').hover(ui.showMenu, ui.hideMenu);
  // $('#dropmenu').hover(ui.showMenu, ui.hideMenu);
};

module.exports = {
  addHandlers,
};
