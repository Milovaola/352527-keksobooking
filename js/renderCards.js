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
  var cardTemplate = document.getElementById('card')
    .content
    .querySelector('.map__card');

  window.renderCard = function (houseData, index) {
    // Клонируем DOM-узел
    var card = cardTemplate.cloneNode(true);
    var cardCloseIconNode = card.querySelector('.popup__close');

    // Наполняем карточку данными
    card.querySelector('.popup__avatar').src = houseData.author.avatar;
    card.querySelector('.popup__title').innerHTML = houseData.offer.title;
    card.querySelector('.popup__text--address').innerHTML = houseData.offer.address;
    card.querySelector('.popup__text--price').innerHTML = window.utilities.getPrice(houseData.offer.price);
    card.querySelector('.popup__type').innerHTML = window.utilities.translate(houseData.offer.type);
    card.querySelector('.popup__text--capacity').innerHTML = window.utilities.valueRoomsAndGuests(houseData.offer.rooms, houseData.offer.guests);
    card.querySelector('.popup__text--time').innerHTML = window.utilities.timeCheck(houseData.offer.checkin, houseData.offer.checkout);

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
    card.querySelector('.popup__description').innerHTML = houseData.offer.description;

    // Скрываем и добавляем идентификатор
    card.style.display = 'none';
    card.setAttribute('id', 'card__' + index);

    // Вешаю слушателя на крестик объявления
    cardCloseIconNode.addEventListener('click', function () {
      card.classList.remove('card--active');
      card.style.display = 'none';
    });

    return card;
  };
})();

