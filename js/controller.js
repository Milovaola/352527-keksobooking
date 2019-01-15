'use strict';
(function () {
// Скрытие карточки при нажатии клавиши escape
  document.addEventListener('keydown', function (evt) {
    var activeCard = document.querySelector('.card--active');
    var activePin = document.querySelector('.map__pin--active');

    if (evt.keyCode === 27 && activeCard) {
      activePin.classList.remove('map__pin--active');
      window.util.toggleDisplay(activeCard);
    }
  });
})();
