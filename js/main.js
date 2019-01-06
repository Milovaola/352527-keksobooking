'use strict';

// Задаем константы
// var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var Y_MIN = 130;
var Y_MAX = 630;
// var HOUSE_VALUE = 8;


// // Функция, возвращающая случайное значение
// function getRandomElement(array) {
//   for (var i = 0; i < array.length; i++) {
//     var randomIndex = Math.floor(Math.random() * array.length);
//   }
//   var randomElement = array[randomIndex];
//   return randomElement;
// }

// // Функция, возвращающая случайное число
// function randomInteger(min, max) {
//   var rand = min + Math.random() * (max - min);
//   return Math.round(rand);
// }
// // Координата по Y
// var locationY = function (min, max) {
//   return randomInteger(min, max);
// };

// // Координата по X
// var locationX = function (maxSize) {
//   return randomInteger(0, maxSize);
// };

// // Функция, генерирующая объявление
// var getHouses = function (fieldSizeX) {
//   var result = [];

//   for (var i = 0; i < HOUSE_VALUE; i++) {
//     result.push({
//       author: {
//         avatar: 'img/avatars/user{{xx}}.png'.replace('{{xx}}', '0' + (i + 1)),
//       },
//       offer: {
//         type: getRandomElement(HOUSE_TYPE),
//       },
//       location: {
//         y: locationY(Y_MIN, Y_MAX),
//         x: locationX(fieldSizeX)
//       }
//     });
//   }
//   return result;
// };
var cardTemplate = document.getElementById('card')
  .content
  .querySelector('.map__card');

function pinHandler(node, index) {
  node.addEventListener('click', function () {
    var activePin = document.querySelector('.map__pin--active');
    var card = document.getElementById('card__' + index);
    var activeCard = document.querySelector('.card--active');

    // Сравниваем два DOM узла, если вдруг мы кликнем не по той же карточке
    if (activePin && activePin !== node) {
      activePin.classList.remove('map__pin--active');
      node.classList.add('map__pin--active');

      toggleDisplay(activeCard);
      toggleDisplay(card);
    } else {
      node.classList.toggle('map__pin--active');
      toggleDisplay(card);
    }
  });
}

function toggleDisplay(node) {
  if (node.style.display === 'block') {
    node.style.display = 'none';
  } else {
    node.style.display = 'block';
  }

  node.classList.toggle('card--active');
}

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
function getFeatureList(features) {
  var featureList = document.createDocumentFragment();

  // Перебираем массив удобств из бека и наполняем массив элементами DOM-дерева
  for (var i = 0; i < features.length; i++) {
    var featureNode = document.createElement('li');
    featureNode.classList.add('popup__feature');
    featureNode.classList.add('popup__feature--' + features[i]);
    featureList.appendChild(featureNode);
  }

  return featureList;
}

var housesData;

function getPhoto(photos, photoNode) {
  var fotoList = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var preview = photoNode.cloneNode(true);
    preview.src = photos[i];
    fotoList.appendChild(preview);
  }
  return fotoList;
}


function renderCards(index) {
  // Клонируем DOM-узел
  var card = cardTemplate.cloneNode(true);
  var closeCard = card.querySelector('.popup__close');

  // Наполняем карточку данными
  card.querySelector('.popup__avatar').src = housesData[index].author.avatar;
  card.querySelector('.popup__title').innerHTML = housesData[index].offer.title;
  card.querySelector('.popup__text--address').innerHTML = housesData[index].offer.address;
  card.querySelector('.popup__text--price').innerHTML = getPrice(housesData[index].offer.price);
  card.querySelector('.popup__type').innerHTML = translate(housesData[index].offer.type);
  card.querySelector('.popup__text--capacity').innerHTML = valueRoomsAndGuests(housesData[index].offer.rooms, housesData[index].offer.guests);
  card.querySelector('.popup__text--time').innerHTML = timeCheck(housesData[index].offer.checkin, housesData[index].offer.checkout);

  if (housesData[index].offer.features && housesData[index].offer.features.length > 1) {
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(getFeatureList(housesData[index].offer.features));
  } else {
    card.querySelector('.popup__features').remove();
  }
  if (housesData[index].offer.photos && housesData[index].offer.photos.length > 1) {
    var imageNode = card.querySelector('.popup__photo');
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(getPhoto(housesData[index].offer.photos, imageNode));
  } else {
    card.querySelector('.popup__photos').remove();
  }
  card.querySelector('.popup__description').innerHTML = housesData[index].offer.description;

  // Скрываем и добавляем идентификатор
  card.style.display = 'none';
  card.setAttribute('id', 'card__' + index);

  // Добавляем в DOM-дерево
  windowMap.appendChild(card);

  closeCard.addEventListener('click', function () {
    card.classList.remove('card--active');
    card.style.display = 'none';
  });
}


document.addEventListener('keydown', function (evt) {
  var activeCard = document.querySelector('.card--active');
  var activePin = document.querySelector('.map__pin--active');

  if (evt.keyCode === 27 && activeCard) {
    activePin.classList.remove('map__pin--active');
    toggleDisplay(activeCard);
  }
});

function searchPins() {
  var pins = document.querySelectorAll('.map__pin');

  for (var i = 0; i < pins.length - 1; i++) {
    pinHandler(pins[i], i);
    renderCards(i);
  }
}

// Получение данных с сервера

function getRemoteData() {
  var xhr = new XMLHttpRequest();
  var url = 'https://js.dump.academy/keksobooking/data';

  xhr.open('GET', url);
  xhr.send(null);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var pins = getPins(data);

      document.querySelector('.map__pins')
        .appendChild(pins);

      removeClass('.map', 'map--faded');

      housesData = data;

      searchPins();
    }

    return false;
  };
}

// Убираем класс неактивного состояния
function removeClass(selector, className) {
  document.querySelector(selector).classList.remove(className);
}

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// Генерация меток

var renderPin = function (pin) {

  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImage = pinElement.getElementsByTagName('img')[0];
  pinElement.innerHTML = '';

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.tittle;

  pinElement.appendChild(pinImage);
  return pinElement;
};

function getPins(data) {
  var housesPin = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    housesPin.appendChild(renderPin(data[i]));
  }

  return housesPin;
}

function activateMap() {
  getRemoteData();
}

function toggleNodesDisabled(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].toggleAttribute('disabled');
  }
}

var formName = document.querySelector('.ad-form');
var adFormInputs = formName.getElementsByTagName('input');
var adFormSelects = formName.getElementsByTagName('select');

toggleNodesDisabled(adFormInputs);
toggleNodesDisabled(adFormSelects);

var addValue = document.getElementById('address');
addValue.setAttribute('value', '570, 375');

var addPrice = document.getElementById('price');
addPrice.setAttribute('placeholder', '1000');

var pin = document.querySelector('.map__pin--main');
var windowMap = document.querySelector('.map');

var limits = {
  left: windowMap.offsetLeft,
  top: Y_MIN,
  right: windowMap.offsetWidth + windowMap.offsetLeft,
  bottom: Y_MAX,
};

function moveAt(evt) {
  var newLocation = {
    x: limits.left,
    y: limits.top
  };

  if (evt.pageX > limits.right) {
    newLocation.x = limits.right;
  } else if (evt.pageX < limits.left) {
    newLocation.x = limits.left;
  } else {
    newLocation.x = evt.pageX;
  }

  var pinOffsetY = pin.offsetHeight / 2; // Курсор по центру пина

  if (evt.pageY - pinOffsetY < limits.top) { // Если курсор ушел за пределы высоты карты вверх
    newLocation.y = limits.top;
  } else if (evt.pageY - pinOffsetY > limits.bottom) { // Если курсор ушел за пределы высоты карты вниз
    newLocation.y = limits.bottom;
  } else {
    newLocation.y = evt.pageY - pinOffsetY;
  }

  relocate(newLocation);
}

function relocate(newLocation) {
  pin.style.left = newLocation.x - pin.offsetWidth / 2 + 'px';
  pin.style.top = newLocation.y + 'px';

  addValue.setAttribute('value', (newLocation.x - 120) + ', ' + Math.round(newLocation.y));
}

pin.addEventListener('mousedown', function (evt) {
  pin.style.position = 'absolute';
  moveAt(evt);
  document.body.appendChild(pin);
  pin.style.zIndex = 1000;

  document.addEventListener('mousemove', moveAt);
  document.addEventListener('mouseup', onMouseUp);
});

function onMouseUp() {
  document.removeEventListener('mousemove', moveAt);
  document.removeEventListener('mouseup', onMouseUp);
}

var active = document.querySelector('.map__pin--main');
function activateApp() {
  formName.classList.remove('ad-form--disabled');
  activateMap();
  toggleNodesDisabled(adFormInputs);
  toggleNodesDisabled(adFormSelects);
  active.removeEventListener('mouseup', activateApp);
}
active.addEventListener('mouseup', activateApp);

var houseType = document.getElementById('type');
houseType.addEventListener('change', onChangeHouseType);

var types = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var elementPrice = document.getElementById('price');

function onChangeHouseType() {
  if (houseType.value === 'bungalo') {
    elementPrice.setAttribute('min', types.bungalo);
    elementPrice.placeholder = types.bungalo;
  } else if (houseType.value === 'flat') {
    elementPrice.setAttribute('min', types.flat);
    elementPrice.placeholder = types.flat;
  } else if (houseType.value === 'house') {
    elementPrice.setAttribute('min', types.house);
    elementPrice.placeholder = types.house;
  } else if (houseType.value === 'palace') {
    elementPrice.setAttribute('min', types.palace);
    elementPrice.placeholder = types.palace;
  }
}

function validate() {
  var price = document.getElementById('price');

  // Проверка на соответствие цены
  if (price.value >= price.max || price.value <= price.min) {
    return false;
  }

  return true;
}

houseType.addEventListener('onSubmit', validate);

var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');

timeIn.addEventListener('change', onChangeTime);
timeOut.addEventListener('change', onChangeTime);

function onChangeTime(event) {
  event.preventDefault();
  timeIn.value = event.target.value;
  timeOut.value = event.target.value;
}

