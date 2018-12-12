'use strict';

// Задаем константы
var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
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
// Координата по Y
var locationY = function (min, max) {
  return randomInteger(min, max);
};

// Координата по X
var locationX = function (maxSize) {
  return randomInteger(0, maxSize);
};

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
};

// Убираем класс неактивного состояния
function removeClass(selector, className) {
  document.querySelector(selector).classList.remove(className);
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
};

function getPins(data) {
  var housesPin = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    housesPin.appendChild(renderPin(data[i]));
  }

  return housesPin;
}

function activateMap() {
  removeClass('.map', 'map--faded');
  document.querySelector('.map__pins').appendChild(getPins(housesData));
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

var pin = document.querySelector('.map__pin--main');
var windowMap = document.querySelector('.map');
var limits = {
  top: Y_MIN,
  right: windowMap.offsetWidth + windowMap.offsetLeft - pin.offsetWidth,
  bottom: Y_MAX,
  left: windowMap.offsetLeft + pin.offsetWidth
};
pin.onmousedown = function (evt) {
  pin.style.position = 'absolute';
  moveAt(evt);
  document.body.appendChild(pin);
  pin.style.zIndex = 1000;

  function moveAt(evt) {
    var newLocation = {
      x: limits.left,
      y: limits.top
    };
    if (evt.pageX > limits.right) {
      newLocation.x = limits.right;
    } else if (evt.pageX > limits.left) {
      newLocation.x = evt.pageX;
    }
    if (evt.pageY > limits.bottom) {
      newLocation.y = limits.bottom;
    } else if (evt.pageY > limits.top) {
      newLocation.y = evt.pageY;
    }
    relocate(newLocation);
  }

  function relocate(newLocation) {
    pin.style.left = newLocation.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = newLocation.y - pin.offsetHeight / 2 + 'px';
  }

  document.onmousemove = function (evt) {
    moveAt(evt);
  };

  pin.onmouseup = function (evt) {
    var pinLocationX = evt.pageX - Math.round(pin.offsetWidth / 2);
    var pinLocationY = evt.pageY + pin.offsetHeight;

    document.onmousemove = null;
    pin.onmouseup = null;

    addValue.setAttribute('value', pinLocationX + ', ' + pinLocationY);
  };
};

var active = document.querySelector('.map__pin--main');
active.addEventListener('mouseup', function () {
  formName.classList.remove('ad-form--disabled');
  activateMap();
  toggleNodesDisabled(adFormInputs);
  toggleNodesDisabled(adFormSelects);
});


