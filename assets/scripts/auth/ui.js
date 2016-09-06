'use strict';

const app = require('../app');

const signUpSuccess = (data) => {
  console.log(data);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log("Welcome," + app.user.email);
  $("#user").html(app.user);
};

const changePasswordSuccess = () => {
  console.log("Password successfully changed.");
};

const signOutSuccess = () => {
  app.user = null;
  console.log("Sign out successful");
};

const getGamesSuccess = (data) => {
  app.user.games = data.games;
  console.log(app.user);
};

const getGameSuccess = (data) => {
  app.user.currentGame = data.game;
  console.log(app.user);
  console.log("Got game " + data.game.id);
  $('.board').show();
};

const startGameSuccess = (data) => {
  console.log("Start game successful");
  console.log(data);
};

const updateGameSuccess = (data) => {
  app.user.currentGame = data.game;
  console.log(data);
};

const renderGameBoard = (data) => {
  //debugger;
  const cellArray = data.game.cells;
  console.log(cellArray);

  for (let i = 0; i < cellArray.length; i++) {
    if(cellArray[i] !== '') {
      $('[data-id=' + i + ']').addClass(cellArray[i] + '-occupied');
      console.log(cellArray[i]);
    }
  }
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
  renderGameBoard
};
