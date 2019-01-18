'use strict';

(function () {
  var PIN_LIMITS = 5;
  var PRICES = {
    LOW: 10000,
    HIGH: 50000
  };

  // объединение функций фильтрации для реализации через чеининг

  var wrapFilter = function (housesData, value) {
    return {
      byLimit: function () {
        return filterByLimit(housesData);
      },
      byType: function () {
        return wrapFilter(filterByType(housesData), value);
      },
      byPrice: function () {
        return wrapFilter(filterByPrice(housesData), value);
      },
      byGuests: function () {
        return wrapFilter(filterByGuests(housesData), value);
      },
      byRooms: function () {
        return wrapFilter(filterByRooms(housesData), value);
      },
      byFeatures: function () {
        var checkedFeatures = [];

        for (var j = 0; j < featuresNodes.length; j++) {
          if (featuresNodes[j].checked) {
            checkedFeatures.push(featuresNodes[j].value);
          }
        }

        return wrapFilter(filterByFeatures(housesData, checkedFeatures), value);
      }
    };
  };
  // органичение пинов
  function filterByLimit(housesData) {
    return housesData.slice(0, PIN_LIMITS);
  }

  function filterByType(housesData, type) {
    if (type === 'any') {
      return housesData;
    }

    return housesData.filter(function (houseData) {
      return houseData.offer.type === type;
    });
  }

  function filterByPrice(housesData, type) {
    if (type === 'any') {
      return housesData;
    }

    return housesData.filter(function (houseData) {
      switch (type) {
        case 'middle':
          return (houseData.offer.price >= PRICES.LOW && houseData.offer.price <= PRICES.HIGH);
        case 'low':
          return houseData.offer.price <= PRICES.LOW;
        case 'high':
          return houseData.offer.price >= PRICES.HIGH;
        default:
          return false;
      }
    });
  }

  function filterByRooms(housesData, rooms) {
    if (rooms === 'any') {
      return housesData;
    }

    return housesData.filter(function (houseData) {
      return houseData.offer.rooms.toString() === rooms;
    });
  }

  function filterByGuests(housesData, guests) {
    if (guests === 'any') {
      return housesData;
    }

    return housesData.filter(function (houseData) {
      return houseData.offer.guests.toString() === guests;
    });
  }

  function filterByFeatures(housesData, features) {
    if (!features) {
      return housesData;
    }

    var filterResults = housesData;
    // проходимся по массиву домов и проверяем наличие удобств
    for (var i = 0; i < features.length; i++) {
      filterResults = filterResults.filter(function (item) {
        return item.offer.features.includes(features[i]);
      });
    }

    return filterResults;
  }

  var mapContainer = document.querySelector('.map__pins');


  function handleFilter(value) {
    var filter = wrapFilter(window.requests.housesData, value);
    var filteredData = filter.byLimit().byType().byPrice().byRooms().byGuests();

    // Очищаем карту от пинов
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }

    mapContainer.appendChild(window.map.getPins(filterByLimit(filteredData)));
  }

  var filterContainerNode = document.querySelector('.map__filters');
  var typeNode = filterContainerNode.querySelector('#housing-type');
  var priceNode = filterContainerNode.querySelector('#housing-price');
  var roomsNode = filterContainerNode.querySelector('#housing-rooms');
  var guestsNode = filterContainerNode.querySelector('#housing-guests');
  var featuresNodes = filterContainerNode.querySelector('#housing-features')
    .getElementsByTagName('input');

  typeNode.addEventListener('change', function (event) {
    handleFilter(event.target.value);
  });
  priceNode.addEventListener('change', function (event) {
    handleFilter(event.target.value);
  });
  roomsNode.addEventListener('change', function (event) {
    handleFilter(event.target.value);
  });
  guestsNode.addEventListener('change', function (event) {
    handleFilter(event.target.value);
  });

  // Так как чекбоксы это коллекция инпутов, вешаю слушателей внутри for
  for (var i = 0; i < featuresNodes.length; i++) {
    featuresNodes[i].addEventListener('click', function () {

      handleFilter();
    });
  }

  window.filters = {
    filterByLimit: filterByLimit,
  };
})();
