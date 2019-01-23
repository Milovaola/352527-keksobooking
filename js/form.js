'use strict';
(function () {
  var formName = document.querySelector('.ad-form');
  var adFormfieldset = formName.getElementsByTagName('fieldset');

  window.utilities.toggleNodesDisabled(adFormfieldset);

  var addValue = document.getElementById('address');

  function standartState() {
    addValue.setAttribute('value', '570, 375');
    var addPrice = document.getElementById('price');
    addPrice.setAttribute('placeholder', '1000');
    document.querySelector('.map__pins')
      .appendChild(window.pin);
  }
  standartState();

  // Зависимость изменения цены от типа жилья
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

  // Функция валидации
  function validate() {
    var price = document.getElementById('price');

    // Проверка на соответствие цены
    if (price.value >= price.max || price.value <= price.min) {
      return false;
    }

    return true;
  }

  houseType.addEventListener('onSubmit', validate);

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
  var roomsTypeValue = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  function disableСapacity(input) {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = true;
    }
    for (var j = 0; j < roomsTypeValue[input].length; j++) {
      capacityType.querySelector('option' + '[value="' + roomsTypeValue[input][j] + '"]').disabled = false;
      capacityType.value = roomsTypeValue[input][j];
    }
  }
  roomType.addEventListener('change', function () {
    disableСapacity(roomType.value);
  });

  var submitForm = document.querySelector('.ad-form__submit');
  // Проверяем соответствие указанному количеству комнат и гостей
  // в случае несоответствия - вывожу сообщение
  function validationPlace() {
    var capacityGuests = roomsTypeValue[roomType.value];
    if (capacityGuests.indexOf(+capacityType.value)) {
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
    validationPlace();
  });


  function submitSuccess() {
    adForm.reset();
    window.map.deactivateMap();
    standartState();
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
    standartState();
    window.map.deactivateMap();
  });

  window.form = {
    onChangeHouseType: onChangeHouseType,
    formName: formName,
    adFormfieldset: adFormfieldset,
    addValue: addValue
  };
})();
