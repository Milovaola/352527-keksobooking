'use strict';
(function () {
  var successHandler = function (response) {
    var limitedResponse = window.filters.filterByLimit(response);

    // Переводим карту в активное состояние
    window.utilities.removeClass('.map', 'map--faded');

    // Записываем ответ сервера в переменную
    window.requests.housesData = response.slice(0);

    // Рендерим 5 пинов
    window.map.renderPins(limitedResponse);

    // Активируем форму фильтра
    window.filters.initialization();
  };

  var errorHandler = function (errorMessage) {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.display = 'none';
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.requests = {
    housesData: null,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
