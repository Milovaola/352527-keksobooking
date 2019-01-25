'use strict';
(function () {

  // Перебираем массив удобств из бека и наполняем массив элементами DOM-дерева
  function getFeatureList(features) {
    var featureList = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featureNode = document.createElement('li');
      featureNode.classList.add('popup__feature');
      featureNode.classList.add('popup__feature--' + features[i]);
      featureList.appendChild(featureNode);
    }

    return featureList;
  }

  // Перебираем массив с фото из бека  и наполняем массив элементами DOM-дерева

  function getPhoto(photos, photoNode) {
    var fotoList = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var preview = photoNode.cloneNode(true);
      preview.src = photos[i];
      fotoList.appendChild(preview);
    }
    return fotoList;
  }

  // Формирование карточек
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  window.renderCard = function (houseData) {
    // Клонируем DOM-узел
    var card = cardTemplate.cloneNode(true);
    var cardCloseIconNode = card.querySelector('.popup__close');

    // Наполняем карточку данными
    card.querySelector('.popup__avatar').src = houseData.author.avatar;
    card.querySelector('.popup__title').textContent = houseData.offer.title;
    card.querySelector('.popup__text--address').textContent = houseData.offer.address;
    card.querySelector('.popup__text--price').textContent = window.utilities.getPrice(houseData.offer.price);
    card.querySelector('.popup__type').textContent = window.utilities.getTranslate(houseData.offer.type);
    card.querySelector('.popup__text--capacity').textContent = window.utilities.uniteValueRoomsAndGuests(houseData.offer.rooms, houseData.offer.guests);
    card.querySelector('.popup__text--time').textContent = window.utilities.timeCheck(houseData.offer.checkin, houseData.offer.checkout);

    if (houseData.offer.features && houseData.offer.features.length > 1) {
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').appendChild(getFeatureList(houseData.offer.features));
    } else {
      card.querySelector('.popup__features').remove();
    }
    if (houseData.offer.photos && houseData.offer.photos.length > 1) {
      var imageNode = card.querySelector('.popup__photo');
      card.querySelector('.popup__photos').innerHTML = '';
      card.querySelector('.popup__photos').appendChild(getPhoto(houseData.offer.photos, imageNode));
    } else {
      card.querySelector('.popup__photos').remove();
    }
    card.querySelector('.popup__description').textContent = houseData.offer.description;

    // Вешаю слушателя на крестик объявления
    cardCloseIconNode.addEventListener('click', function () {
      var activePin = document.querySelector('.map__pin--active');
      if (card) {
        activePin.classList.remove('map__pin--active');
        card.remove();
        document.removeEventListener('keydown', window.utilities.onEscRemoveCard);
      }
    });

    return card;
  };
})();

