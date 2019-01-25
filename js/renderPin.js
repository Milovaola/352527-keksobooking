'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // Генерация меток

  window.renderPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.innerHTML = '';

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.tittle;

    pinElement.appendChild(pinImage);

    return pinElement;
  };

})();
