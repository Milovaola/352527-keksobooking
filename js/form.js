'use strict';
(function () {
  var formName = document.querySelector('.ad-form');
  var adFormInputs = formName.getElementsByTagName('input');
  var adFormSelects = formName.getElementsByTagName('select');

  window.util.toggleNodesDisabled(adFormInputs);
  window.util.toggleNodesDisabled(adFormSelects);

  var addValue = document.getElementById('address');
  addValue.setAttribute('value', '570, 375');

  var addPrice = document.getElementById('price');
  addPrice.setAttribute('placeholder', '1000');
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

  window.form = {
    formName: formName,
    adFormInputs: adFormInputs,
    adFormSelects: adFormSelects,
    addValue: addValue
  };
})();
