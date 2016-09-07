'use strict';

const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  $('.board').hide();
  $('form').hide();
  authEvents.addHandlers();
});

// $('#sign-in-button').on('click', function () {
//   $('#signInModal').modal('show');
// });
