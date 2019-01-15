'use strict';

var successHandler = function () {
  var pins = window.map.getPins();

  document.querySelector('.map__pins')
    .appendChild(pins);

  window.util.removeClass('.map', 'map--faded');

  var cards = window.map.getCards();
  document.querySelector('.map__card')
    .appendChild(cards);

  window.map.searchPins();
};

var errorHandler = function (errorMessage) {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__message').textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', errorElement);
};
window.active = {
  successHandle: successHandler,
  errorHandler: errorHandler
};

