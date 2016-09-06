'use strict';

const app = require('../app');

const signUp = (data) => {
  return $.ajax({
    url: app.host + '/sign-up',
    method: 'POST',
    data: data
  });
};

const signIn = (data) => {
  return $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: data
  });
};

const changePassword = (data) => {
  return $.ajax({
    url: app.host + '/change-password/' + app.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data: data
  });
};

const signOut = () => {
  return $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
  });
};

const getGames = () => {
  return $.ajax({
    url: app.host + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
  });
};

const getGame = (data) => {
  return $.ajax({
    url: app.host + '/games/' + data.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
  });
};

const startGame = () => {
  return $.ajax({
    url: app.host + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
  });
};

const updateGame = (data) => {
  return $.ajax({
    url: app.host + '/games/' + app.user.currentGame.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data: data
  });
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getGames,
  getGame,
  startGame,
  updateGame
};
