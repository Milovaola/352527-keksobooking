'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEYCODE = 27;

  // Перевод типа жилья на русский язык
  function getTranslate(offerType) {
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
  function uniteValueRoomsAndGuests(rooms, guests) {
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
  // Добавляем класс неактивного состояния
  function addClass(selector, className) {
    document.querySelector(selector).classList.add(className);
  }
  // Перевод нод в неактивное состояние
  function toggleNodesDisabled(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].toggleAttribute('disabled');
    }
  }
  // функция устранения дребезга
  function debounce(cb) {
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

  // Переключение disabled state у коллекции Node
  function setDisabledStateToNodeList(nodeList, state) {
    if (typeof state === 'undefined') {
      state = true;
    }

    Array.from(nodeList)
      .forEach(function (node) {
        if (state) {
          node.setAttribute('disabled', true);
        } else {
          node.removeAttribute('disabled');
        }
      });
  }
  function onEscRemoveCard(evt) {
    var activePin = document.querySelector('.map__pin--active');
    var activeCard = document.querySelector('.map__card');

    if (evt.keyCode === ESC_KEYCODE && activeCard) {
      activePin.classList.remove('map__pin--active');
      activeCard.remove();
      document.removeEventListener('keydown', onEscRemoveCard);
    }
  }

  // Сообщение при отправке запроса на сервер
  function sendMessage(selector, className) {
    var messageTemplate = document.querySelector(selector)
      .content
      .querySelector(className);
    var messageElement = messageTemplate.cloneNode(true);
    var mainBlock = document.querySelector('main');
    mainBlock.insertAdjacentElement('afterbegin', messageElement);

    function onEscRemoveNotify(evt) {
      if (evt.keyCode === ESC_KEYCODE && messageElement) {
        messageElement.remove();
        removeEvent();
      }
    }

    function onButtonClickRemoveNotify() {
      if (messageElement) {
        messageElement.remove();
        removeEvent();
      }
    }

    function removeEvent() {
      document.removeEventListener('keydown', onEscRemoveNotify);
      document.removeEventListener('click', onButtonClickRemoveNotify);
    }

    messageElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscRemoveNotify);
    document.addEventListener('click', onButtonClickRemoveNotify);
  }

  window.utilities = {
    onEscRemoveCard: onEscRemoveCard,
    getTranslate: getTranslate,
    getPrice: getPrice,
    uniteValueRoomsAndGuests: uniteValueRoomsAndGuests,
    timeCheck: timeCheck,
    removeClass: removeClass,
    addClass: addClass,
    toggleNodesDisabled: toggleNodesDisabled,
    debounce: debounce,
    setDisabledStateToNodeList: setDisabledStateToNodeList,
    sendMessage: sendMessage
  };
})();
