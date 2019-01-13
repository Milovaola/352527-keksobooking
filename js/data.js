'use strict';
(function () {
  // Получение данных с сервера
  function getRemoteData() {
    var xhr = new XMLHttpRequest();
    var url = 'https://js.dump.academy/keksobooking/data';

    xhr.open('GET', url);
    xhr.send(null);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var pins = window.map.getPins(data);

        document.querySelector('.map__pins')
        .appendChild(pins);

        window.util.removeClass('.map', 'map--faded');

        window.data.housesData = data;

        window.map.searchPins();
      }

      return false;
    };
  }
  window.data = {
    housesData: null,
    getRemoteData: getRemoteData
  };
})();
