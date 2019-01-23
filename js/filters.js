'use strict';

(function () {
  var PIN_LIMITS = 5;
  var PRICES = {
    LOW: 10000,
    HIGH: 50000
  };
  var filterContainerNode = document.querySelector('.map__filters');
  var filterItems = filterContainerNode.querySelectorAll('select, input');
  var typeNode = filterContainerNode.querySelector('#housing-type');
  var priceNode = filterContainerNode.querySelector('#housing-price');
  var roomsNode = filterContainerNode.querySelector('#housing-rooms');
  var guestsNode = filterContainerNode.querySelector('#housing-guests');
  var featuresNodes = filterContainerNode
    .querySelector('#housing-features')
    .getElementsByTagName('input');
  var mapContainer = document.querySelector('.map__pins');

  function filterByType(houseData) {
    if (typeNode.value === 'any') {
      return true;
    }

    return typeNode.value === houseData.offer.type.toString();
  }

  function filterByPrice(houseData) {
    if (priceNode.value === 'any') {
      return true;
    } else if (priceNode.value === 'low') {
      return houseData.offer.price < PRICES.LOW;
    } else if (priceNode.value === 'middle') {
      return houseData.offer.price >= PRICES.LOW && houseData.offer.price <= PRICES.HIGH;
    } else {
      return houseData.offer.price > PRICES.HIGH;
    }
  }

  function filterByGuests(houseData) {
    if (guestsNode.value === 'any') {
      return true;
    } else {
      return guestsNode.value === houseData.offer.guests.toString();
    }
  }

  function filterByRooms(houseData) {
    if (roomsNode.value === 'any') {
      return true;
    } else {
      return roomsNode.value === houseData.offer.rooms.toString();
    }
  }

  function filterByFeatures(housesData) {
    var checkedFeatures = [];

    Array.from(featuresNodes)
      .forEach(function (featureNode) {
        if (featureNode.checked) {
          checkedFeatures.push(featureNode.value);
        }
      });

    if (!checkedFeatures) {
      return true;
    }

    return checkedFeatures
      .every(function (feature) {
        return housesData.offer.features.includes(feature);
      });
  }

  var handleFilter = window.utilities.debounce(function () {
    var activeCard = document.querySelector('.card--active');
    var filteredData = window.requests.housesData
      .filter(filterByType)
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByGuests)
      .filter(filterByRooms)
      .filter(filterByFeatures)
      .slice(0, PIN_LIMITS);

    // Скрытие карточки в том случае, если она открыта
    if (activeCard) {
      window.utilities.toggleDisplay(activeCard);
    }

    // Блокировка формы до момента загрузки всех похожих объявлений
    deactivate();

    // Удаление предыдущих пинов с карты
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }

    // Добавление пинов, полученных в результате фильтрации
    window.map.renderPins(filteredData);

    // Возвращаю форму в исходное состояние
    activate();
  });

  // function standartFilter(filterNode) {
  //   return filterNode.value === 'any';
  // }

  function activate() {
    window.utilities
      .setDisabledStateToNodeList(filterItems, false);
  }


  function deactivate() {
    window.utilities
      .setDisabledStateToNodeList(filterItems);

  }

  function resetFilters() {
    Array.from(filterContainerNode)
      .forEach(function (filterNode) {
        if (filterNode.type === 'select-one') {
          filterNode.value = 'any';
        } else {
          filterNode.checked = false;
        }
      });
  }
  function initialization() {
    typeNode.addEventListener('change', handleFilter);
    priceNode.addEventListener('change', handleFilter);
    roomsNode.addEventListener('change', handleFilter);
    guestsNode.addEventListener('change', handleFilter);

    // Привожу коллекцию нод к простому массиву
    // и навешиваю слушателя на каждый чекбокс
    Array.from(featuresNodes)
      .forEach(function (featureItem) {
        featureItem.addEventListener('click', handleFilter);
      });

    // Снятие disabled состояние с полей фильтра
    activate();
  }

  // // Перевод формы в disabled по-умолчанию
  deactivate();

  window.filters = {
    resetFilters: resetFilters,
    initialization: initialization,
    activate: activate,
    deactivate: deactivate,
    PIN_LIMITS: PIN_LIMITS
  };
})();
