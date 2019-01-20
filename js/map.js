'use strict';
// Управление пином и карточкой объявления

(function () {
  function setPinHandler(node, index) {
    node.addEventListener('click', function () {
      var activePin = document.querySelector('.map__pin--active');
      var card = document.getElementById('card__' + index);
      var activeCard = document.querySelector('.card--active');

      // Сравниваем два DOM узла, если вдруг мы кликнем не по той же карточке
      if (activePin && activePin !== node) {
        activePin.classList.remove('map__pin--active');
        node.classList.add('map__pin--active');

        window.utilities.toggleDisplay(activeCard);
        window.utilities.toggleDisplay(card);
      } else {
        node.classList.toggle('map__pin--active');
        window.utilities.toggleDisplay(card);
      }
    });
  }

  function renderPins(data) {
    var pinList = document.createDocumentFragment();
    var cardList = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var pinNode = window.renderPin(data[i]);
      var cardNode = window.renderCard(data[i], i);

      // Вешаю слушателя на пин
      setPinHandler(pinNode, i);

      pinList.appendChild(pinNode);
      cardList.appendChild(cardNode);
    }

    document.querySelector('.map__pins')
      .appendChild(pinList);

    renderCards(cardList);
  }

  function renderCards(cardList) {
    var cardsContainer = document.getElementsByClassName('map__cards')[0];

    // Если контейнера для карточек не существует на странице
    // создаю его и задаю ему класс, а если существует
    // очищаю его содержимое
    if (!cardsContainer) {
      cardsContainer = document.createElement('div');
      cardsContainer.className = 'map__cards';

      // Добавляю контейнер на страницу
      document.getElementsByClassName('map')[0]
        .appendChild(cardsContainer);
    } else {
      cardsContainer.innerHTML = '';
    }

    // Наполняю контейнер карточками
    cardsContainer.appendChild(cardList);
  }

  function activateMap() {
    window.load(window.requests.successHandler, window.requests.errorHandler);
  }

  window.map = {
    activateMap: activateMap,
    renderPins: renderPins
  };

})();
