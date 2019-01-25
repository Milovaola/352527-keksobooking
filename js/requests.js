'use strict';
(function () {
  function successHandler(response) {
    var limitedResponse = response.slice(0, window.filters.PIN_LIMITS);

    // Переводим карту в активное состояние
    window.utilities.removeClass('.map', 'map--faded');

    // Записываем ответ сервера в переменную
    window.requests.housesData = response.slice(0);

    // Рендерим 5 пинов
    window.map.renderPins(limitedResponse);

    // Активируем форму фильтра
    window.filters.initializeFilter();

  }

  function errorHandler() {
    window.utilities.sendMessage('#error', '.error');
  }

  window.requests = {
    housesData: null,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
