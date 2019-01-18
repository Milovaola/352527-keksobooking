'use strict';

(function () {

  // Функция переключения
  function toggleDisplay(node) {
    if (node.style.display === 'block') {
      node.style.display = 'none';
    } else {
      node.style.display = 'block';
    }
    node.classList.toggle('card--active');
  }
  // Перевод типа жилья на русский язык
  function translate(offerType) {
    if (offerType === 'flat') {
      return 'Квартира';
    } else if (offerType === 'bungalo') {
      return 'Бунгало';
    } else if (offerType === 'house') {
      return 'Дом';
    } else if (offerType === 'palace') {
      return 'Дворец';
    }

    return offerType;
  }
  // Цена комнаты за ночь
  function getPrice(price) {
    return price + ' ₽/ночь';
  }
  // Функция вывода строки по гостям и комнатам определенного вида
  function valueRoomsAndGuests(rooms, guests) {
    return rooms + ' комнаты для ' + guests + ' гостей';
  }
  // Функция вывода строки времени заезда и выезда
  function timeCheck(checkin, chekout) {
    return 'Заезд после ' + checkin + ', выезд до ' + chekout;
  }
  // Убираем класс неактивного состояния
  function removeClass(selector, className) {
    document.querySelector(selector).classList.remove(className);
  }
  // Перевод нод в неактивное состояние
  function toggleNodesDisabled(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].toggleAttribute('disabled');
    }
  }
  // функция устранения дребезга
  function debounce(cb) {
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }
  window.util = {
    toggleDisplay: toggleDisplay,
    translate: translate,
    getPrice: getPrice,
    valueRoomsAndGuests: valueRoomsAndGuests,
    timeCheck: timeCheck,
    removeClass: removeClass,
    toggleNodesDisabled: toggleNodesDisabled,
    debounce: debounce
  };
})();
