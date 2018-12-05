'use strict';

// Задаем константы
var HOUSE_AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
var HOUSE_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var HOUSE_VALUE = 8;
var HOUSE_TYPE = [ 'palace', 'flat', 'house' , 'bungalo'];
var HOUSE_CHEKIN = ['12:00', '13:00', '14:00'];
var HOUSE_CHEKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];
var TYPE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var Y_MIN = 130;
var Y_MAX = 630;

var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map');

// Функция, возвращающая случайное значение
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}
// Функция, возвращающая случайное число
function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
}
// Координта по Y
var locationY = function() {
  return randomInteger(Y_MIN, Y_MAX);
}

// Функция, возвращающая массив случайной длины
function getRandomArray (array) {
  var result = [];
  var count = randomInteger(0, array.length-1);

  for (var i = 0; i < count; i++) {
    result.push(getRandomElement(array));
  }

  return result;
}



// Координата по X
var locationX = function(maxSize) {
  return randomInteger(0, maxSize);
}

// Функция, генерирующая объявление
var getHouses = function (fieldSizeX) {
  var result = [];

  for (var i = 0; i < HOUSE_VALUE; i++) {
    result.push({
      author: {
        avatar: 'img/avatars/user{{xx}}.png'.replace('{{xx}}', '0' + i + 1),
      },
      offer: {
        tittle: HOUSE_TITLE[i],
        address: (locationX(fieldSizeX) + ', ' + locationY()),
        price: randomInteger(MIN_PRICE, MAX_PRICE),
        type: getRandomElement(HOUSE_TYPE),
        rooms: randomInteger(MIN_ROOMS, MAX_ROOMS),
        guests: randomInteger(1, 10),
        checkin: getRandomElement(HOUSE_CHEKIN),
        checkout: getRandomElement(HOUSE_CHEKOUT),
        features: getRandomArray(FEATURES),
        description: '',
        photos: getRandomElement(TYPE_PHOTOS)
      },
      location: {
        y: locationY(),
        x: locationX(fieldSizeX)
      }
    });
  }

  return result;
}
// Цена комнаты за ночь
var getPrice = function (price) {
  return price + ' ₽/ночь';
}

// Убираем класс неактивного состояния
function removeClass (selector, className) {
  document.querySelector(selector).classList.remove(className);
}

function activeMap() {
  removeClass('.map', 'map--faded')
}

// Узнаю ширину блока, для генерирования меток
var mapPinsWidth = document.querySelector('.map__pins').offsetWidth;

// Генерация меток
var housesData = getHouses(mapPinsWidth);

function getPins (housesData) {
  // Фрагмент для генерации метки объявления
  var housesPin = document.createDocumentFragment();

  for (var i = 0; i < housesData.length; i++) {
    var mapPin = document.createElement('img');

    mapPin.style.left = housesData[i].location.x + 'px';
    mapPin.style.top = housesData[i].location.y + 'px';
    mapPin.src = housesData[i].author.avatar;
    mapPin.alt = housesData[i].offer.tittle;

    housesPin.appendChild(mapPin);
  }

  return housesPin;
}

// Функция перевода типа жилья
function translate (offerType) {
  if (offerType == 'flat') {
    return 'Квартира'
  } else if (offerType == 'bungalo') {
    return 'Бунгало'
  } else if (offerType == 'house') {
    return 'Дом'
  } else if (offerType == 'palace') {
    return 'Дворец'
  }
}

// Функция вывода строки по гостям и комнатам определенного вида
function valueRoomsAndGuests(rooms, guests) {
  return rooms + 'комнаты для' + guests + 'гостей';
}

// Функция вывода строки въезда и выезда определенного вида
function check(checkin, checkout) {
  return 'Заезд после'+ checkin + ',' + 'выезд до' + checkout;
}

// Замена src у аватарки пользователя на значения поля author.avatar отрисовываемого объекта.
var userIcon = similarCardTemplate.querySelector('.popup__avatar');
userIcon.src = author.avatar;

// Вставка сгенерированных объектов в блок
document.querySelector('.map__pins').appendChild(housesPin);

    var renderCard = function (offer) {
      var cardElement = similarCardTemplate.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = getPrice(offer.price);
      cardElement.querySelector('.popup__type').innerHTML = translate(offer.type);
      cardElement.querySelector('.popup__text--capacity').innerHTML = valueRoomsAndGuests(offer.rooms, offer.guests);
      cardElement.querySelector('.popup__text--time').innerHTML = check(offer.checkin, offer.checkout);
      cardElement.querySelector('.popup__features').innerHTML = offer.features.join(', ');
      cardElement.querySelector('.popup__description').textContent = offer.description;
      cardElement.querySelector('.popup__photos').innerHTML = offer.photos;
      return cardElement;
    }
