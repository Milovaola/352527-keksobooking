'use strict';

(function () {
  var PIN_LIMITS = 5;
  var Prices = {
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
    .querySelectorAll('input');

  function filterByType(houseData) {
    return typeNode.value === 'any'
      ? true
      : typeNode.value === houseData.offer.type.toString();
  }

  function filterByPrice(houseData) {
    if (priceNode.value === 'any') {
      return true;
    } else if (priceNode.value === 'low') {
      return houseData.offer.price < Prices.LOW;
    } else if (priceNode.value === 'middle') {
      return houseData.offer.price >= Prices.LOW && houseData.offer.price <= Prices.HIGH;
    } else {
      return houseData.offer.price > Prices.HIGH;
    }
  }

  function filterByGuests(houseData) {
    return guestsNode.value === 'any'
      ? true
      : guestsNode.value === houseData.offer.guests.toString();
  }

  function filterByRooms(houseData) {
    return roomsNode.value === 'any'
      ? true
      : roomsNode.value === houseData.offer.rooms.toString();
  }

  function filterByFeatures(housesData) {
    var checkedFeatures = [];

    for (var i = 0; i < featuresNodes.length; i++) {
      if (featuresNodes[i].checked) {
        checkedFeatures.push(featuresNodes[i].value);
      }
    }
    if (!checkedFeatures) {
      return true;
    }

    return checkedFeatures
      .every(function (feature) {
        return housesData.offer.features.includes(feature);
      });
  }

  var onChangeFilter = window.utilities.debounce(function () {
    var filteredData = window.requests.housesData
      .filter(filterByType)
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByGuests)
      .filter(filterByRooms)
      .filter(filterByFeatures)
      .slice(0, PIN_LIMITS);

    // Скрытие карточки в том случае, если она открыта
    window.map.deleteCardOnMap();
    // Блокировка формы до момента загрузки всех похожих объявлений
    deactivate();

    // Удаление предыдущих пинов с карты
    window.map.pinsDelete();

    // Добавление пинов, полученных в результате фильтрации
    window.map.renderPins(filteredData);

    // Возвращаю форму в исходное состояние
    activate();
  });

  function activate() {
    window.utilities
      .setDisabledStateToNodeList(filterItems, false);
  }


  function deactivate() {
    window.utilities
      .setDisabledStateToNodeList(filterItems);

  }

  function resetFilters() {
    filterContainerNode.reset();
  }
  function initializeFilter() {
    typeNode.addEventListener('change', onChangeFilter);
    priceNode.addEventListener('change', onChangeFilter);
    roomsNode.addEventListener('change', onChangeFilter);
    guestsNode.addEventListener('change', onChangeFilter);

    // Привожу коллекцию нод к простому массиву
    // и навешиваю слушателя на каждый чекбокс
    for (var i = 0; i < featuresNodes.length; i++) {
      featuresNodes[i].addEventListener('click', onChangeFilter);
    }

    // Снятие disabled состояние с полей фильтра
    activate();
  }

  //  Перевод формы в disabled по-умолчанию
  deactivate();

  window.filters = {
    resetFilters: resetFilters,
    initializeFilter: initializeFilter,
    deactivate: deactivate,
    PIN_LIMITS: PIN_LIMITS
  };
})();
