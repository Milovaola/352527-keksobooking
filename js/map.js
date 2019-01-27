'use strict';
// Управление пином и карточкой объявления

(function () {

  function setPinHandler(pin, data) {
    var cardContainer = document.querySelector('.map');
    var card = window.renderCard(data);

    pin.addEventListener('click', function () {
      var activePin = cardContainer.querySelector('.map__pin--active');

      // Сравниваем два DOM узла, если вдруг мы кликнем не по той же карточке
      if (activePin && activePin !== pin) {
        activePin.classList.remove('map__pin--active');
        pin.classList.add('map__pin--active');

        deleteCardOnMap();
      } else {
        pin.classList.toggle('map__pin--active');
      }

      toggleRender(cardContainer, card);
    });
  }

  function toggleRender(parentNode, childNode) {
    if (parentNode.contains(childNode)) {
      childNode.parentNode.removeChild(childNode);
    } else {
      parentNode.appendChild(childNode);
      document.addEventListener('keydown', window.utilities.onEscRemoveCard);
    }
  }

  function renderPins(data) {
    var pinList = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var pinNode = window.renderPin(data[i]);

      // Вешаю слушателя на пин
      setPinHandler(pinNode, data[i]);

      pinList.appendChild(pinNode);
    }

    window.form.mapPins
      .appendChild(pinList);
  }

  // Удаление пинов с карты
  function pinsDelete() {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinsItems.length; i++) {
      mapPinsItems[i].remove();
    }
  }

  // Удаление с карты карточек объявления
  function deleteCardOnMap() {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
  }

  function activateMap() {
    window.load.load(window.requests.successHandler, window.requests.errorHandler);
  }

  function deactivateMap() {
    pinsDelete();
    deleteCardOnMap();
    window.utilities.addClass('.map', 'map--faded');
    window.form.formName.classList.add('ad-form--disabled');
    window.pin.style.top = window.form.DEFAULT_MAIN_PIN_Y + 'px';
    window.pin.style.left = window.form.DEFAULT_MAIN_PIN_X + 'px';
    window.isActive = false;
    window.filters.deactivate();
    window.filters.resetFilters();
  }

  window.map = {
    pinsDelete: pinsDelete,
    deleteCardOnMap: deleteCardOnMap,
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    renderPins: renderPins
  };

})();
