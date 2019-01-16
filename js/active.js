'use strict';

var successHandler = function (response) {
  var pins = window.map.getPins(response);

  document.querySelector('.map__pins')
    .appendChild(pins);

  window.util.removeClass('.map', 'map--faded');

  window.active.housesData = response.slice(0);

  window.map.searchPins();
};

var errorHandler = function (errorMessage) {
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.style.display = 'none';
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__message').textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', errorElement);
};

window.active = {
  housesData: null,
  successHandler: successHandler,
  errorHandler: errorHandler
};

