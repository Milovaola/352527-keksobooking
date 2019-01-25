'use strict';
(function () {
  var formName = document.querySelector('.ad-form');
  var adFormFieldset = formName.getElementsByTagName('fieldset');
  var addValue = document.getElementById('address');

  window.utilities.toggleNodesDisabled(adFormFieldset);

  function setDefaultState() {
    addValue.setAttribute('value', '570, 375');
    var addPrice = document.getElementById('price');
    addPrice.setAttribute('placeholder', '1000');
    document.querySelector('.map__pins')
      .appendChild(window.pin);
  }
  setDefaultState();

  // Зависимость изменения цены от типа жилья
  var houseType = document.getElementById('type');
  houseType.addEventListener('change', onChangeHouseType);

  var Types = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var price = document.getElementById('price');

  function onChangeHouseType() {
    if (houseType.value === 'bungalo') {
      price.setAttribute('min', Types.bungalo);
      price.placeholder = Types.bungalo;
    } else if (houseType.value === 'flat') {
      price.setAttribute('min', Types.flat);
      price.placeholder = Types.flat;
    } else if (houseType.value === 'house') {
      price.setAttribute('min', Types.house);
      price.placeholder = Types.house;
    } else if (houseType.value === 'palace') {
      price.setAttribute('min', Types.palace);
      price.placeholder = Types.palace;
    }
  }

  // Функция валидации
  function getValidation() {
    // Проверка на соответствие цены
    if (price.value >= price.max || price.value <= price.min) {
      return false;
    }

    return true;
  }

  houseType.addEventListener('onSubmit', getValidation);

  // Зависимость времени въезда и выезда
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');

  timeIn.addEventListener('change', onChangeTime);
  timeOut.addEventListener('change', onChangeTime);

  function onChangeTime(event) {
    event.preventDefault();
    timeIn.value = event.target.value;
    timeOut.value = event.target.value;
  }
  // Зависимость изменения от вместимости от количества комнат
  var roomType = document.getElementById('room_number');
  var capacityType = document.getElementById('capacity');
  var capacityOptions = capacityType.querySelectorAll('option');
  var RoomsTypeValue = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  function disableСapacity(input) {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = true;
    }
    for (var j = 0; j < RoomsTypeValue[input].length; j++) {
      capacityType.querySelector('option' + '[value="' + RoomsTypeValue[input][j] + '"]').disabled = false;
      capacityType.value = RoomsTypeValue[input][j];
    }
  }
  roomType.addEventListener('change', function () {
    disableСapacity(roomType.value);
  });

  var submitForm = document.querySelector('.ad-form__submit');
  // Проверяем соответствие указанному количеству комнат и гостей
  // в случае несоответствия - вывожу сообщение
  function capacityValidationCheck() {
    var capacityGuests = RoomsTypeValue[roomType.value];
    if (capacityGuests.forEach(+capacityType.value)) {
      capacityType.setCustomValidity('Выберите меньшее количество гостей');
    } else {
      capacityType.setCustomValidity('');
    }
  }

  roomType.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  capacityType.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  submitForm.addEventListener('click', function () {
    capacityValidationCheck();
  });


  function submitSuccess() {
    adForm.reset();
    window.map.deactivateMap();
    setDefaultState();
    window.utilities.sendMessage('#success', '.success');

  }

  function submitError() {
    window.requests.errorHandler();
  }
  // Данные формы для отправки на сервер
  var adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.load.upload(submitSuccess, submitError, formData);
  });

  // Сброс формы
  var resetForm = document.querySelector('.ad-form__reset');

  resetForm.addEventListener('click', function () {
    setDefaultState();
    window.map.deactivateMap();
  });

  window.form = {
    onChangeHouseType: onChangeHouseType,
    formName: formName,
    adFormFieldset: adFormFieldset,
    addValue: addValue
  };
})();
