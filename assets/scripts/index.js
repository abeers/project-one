'use strict';

const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  $('.board').hide();
  $('form').hide();
  $('#sign-out-button').hide();
  $('#sign-in-name').hide();
  $('#sign-in-button').show();
  $('#sign-up-button').show();
  $('#menu-button').hide();
  $('#dropmenu').hide();
  authEvents.addHandlers();
});
