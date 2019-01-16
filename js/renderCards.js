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

  window.renderCards = function (index) {
    // Клонируем DOM-узел
    var card = cardTemplate.cloneNode(true);
    var closeCard = card.querySelector('.popup__close');

    // Наполняем карточку данными
    card.querySelector('.popup__avatar').src = window.active.housesData[index].author.avatar;
    card.querySelector('.popup__title').innerHTML = window.active.housesData[index].offer.title;
    card.querySelector('.popup__text--address').innerHTML = window.active.housesData[index].offer.address;
    card.querySelector('.popup__text--price').innerHTML = window.util.getPrice(window.active.housesData[index].offer.price);
    card.querySelector('.popup__type').innerHTML = window.util.translate(window.active.housesData[index].offer.type);
    card.querySelector('.popup__text--capacity').innerHTML = window.util.valueRoomsAndGuests(window.active.housesData[index].offer.rooms, window.active.housesData[index].offer.guests);
    card.querySelector('.popup__text--time').innerHTML = window.util.timeCheck(window.active.housesData[index].offer.checkin, window.active.housesData[index].offer.checkout);

    if (window.active.housesData[index].offer.features && window.active.housesData[index].offer.features.length > 1) {
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').appendChild(getFeatureList(window.active.housesData[index].offer.features));
    } else {
      card.querySelector('.popup__features').remove();
    }
    if (window.active.housesData[index].offer.photos && window.active.housesData[index].offer.photos.length > 1) {
      var imageNode = card.querySelector('.popup__photo');
      card.querySelector('.popup__photos').innerHTML = '';
      card.querySelector('.popup__photos').appendChild(getPhoto(window.active.housesData[index].offer.photos, imageNode));
    } else {
      card.querySelector('.popup__photos').remove();
    }
    card.querySelector('.popup__description').innerHTML = window.active.housesData[index].offer.description;

    // Скрываем и добавляем идентификатор
    card.style.display = 'none';
    card.setAttribute('id', 'card__' + index);

    // Добавляем в DOM-дерево
    window.windowMap.appendChild(card);

    closeCard.addEventListener('click', function () {
      card.classList.remove('card--active');
      card.style.display = 'none';
    });
  };
})();

