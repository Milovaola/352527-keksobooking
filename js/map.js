'use strict';
// Управление пином и карточкой объявления

(function () {
  function pinHandler(node, index) {
    node.addEventListener('click', function () {
      var activePin = document.querySelector('.map__pin--active');
      var card = document.getElementById('card__' + index);
      var activeCard = document.querySelector('.card--active');

      // Сравниваем два DOM узла, если вдруг мы кликнем не по той же карточке
      if (activePin && activePin !== node) {
        activePin.classList.remove('map__pin--active');
        node.classList.add('map__pin--active');

        window.util.toggleDisplay(activeCard);
        window.util.toggleDisplay(card);
      } else {
        node.classList.toggle('map__pin--active');
        window.util.toggleDisplay(card);
      }
    });
  }
  function searchPins() {
    var pins = document.querySelectorAll('.map__pin');

    for (var i = 0; i < pins.length - 1; i++) {
      pinHandler(pins[i], i);
      window.renderCards(i);
    }
  }
  function getPins(data) {
    var housesPin = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      housesPin.appendChild(window.renderPin(data[i]));
    }

    return housesPin;
  }
  function activateMap() {
    window.load(window.active.successHandler, window.active.errorHandler);
  }
  window.map = {
    searchPins: searchPins,
    getPins: getPins,
    activateMap: activateMap
  };

})();
