'use strict';

const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  $('.board').hide();
  $('form').hide();
  $('nav > button').hide();
  $('#sign-in-button').show();
  $('#sign-up-button').show();
  authEvents.addHandlers();
});

// $('#sign-in-button').on('click', function () {
//   $('#signInModal').modal('show');
// });
