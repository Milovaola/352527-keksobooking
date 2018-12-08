'use strict';

// Задаем константы
var HOUSE_TYPE = [ 'palace', 'flat', 'house' , 'bungalo'];
var Y_MIN = 130;
var Y_MAX = 630;
var HOUSE_VALUE = 8;

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
var locationY = function(min, max) {
  return randomInteger(min, max);
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
        avatar: 'img/avatars/user{{xx}}.png'.replace('{{xx}}', '0' + (i + 1)),
      },
      offer: {
        type: getRandomElement(HOUSE_TYPE),
      },
      location: {
        y: locationY(Y_MIN, Y_MAX),
        x: locationX(fieldSizeX)
      }
    });
  }
  return result;
}

// Убираем класс неактивного состояния
function removeClass (selector, className) {
  document.querySelector(selector).classList.remove(className);
}

function activateMap() {
  removeClass('.map', 'map--faded')
}



var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


// Узнаю ширину блока, для генерирования меток
var mapPinsWidth = document.querySelector('.map__pins').offsetWidth;

// Генерация меток
var housesData = getHouses(mapPinsWidth);

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImage = new Image(40, 40);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.tittle;

  pinElement.appendChild(pinImage);

  return pinElement;
}

function getPins (housesData) {
  var housesPin = document.createDocumentFragment();

  for (var i = 0; i < housesData.length; i++) {
    housesPin.appendChild(renderPin(housesData[i]));
  }

  return housesPin;
}

// Вставка сгенерированных объектов в блок
activateMap();
document.querySelector('.map__pins').appendChild(getPins(housesData));


