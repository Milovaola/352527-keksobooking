'use strict';
(function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var pin = document.querySelector('.map__pin--main');
  var windowMap = document.querySelector('.map');
  window.windowMap = windowMap;

  var limits = {
    left: windowMap.offsetLeft,
    top: Y_MIN,
    right: windowMap.offsetWidth + windowMap.offsetLeft,
    bottom: Y_MAX,
  };
  var isActive = false;

  function moveAt(evt) {
    var newLocation = {
      x: limits.left,
      y: limits.top
    };
    var pinOffsetX = pin.offsetWidth / 2;

    if (evt.pageX + pinOffsetX > limits.right) {
      newLocation.x = limits.right - pin.offsetWidth;
    } else if (evt.pageX - pinOffsetX < limits.left) {
      newLocation.x = limits.left;
    } else {
      newLocation.x = evt.pageX - pinOffsetX;
    }

    var pinOffsetY = pin.offsetHeight / 2; // Курсор по центру высоты пина


    if (evt.pageY - pinOffsetY < limits.top) { // Если курсор ушел за пределы высоты карты вверх
      newLocation.y = limits.top - pinOffsetY;
    } else if (evt.pageY - pinOffsetY > limits.bottom) { // Если курсор ушел за пределы высоты карты вниз
      newLocation.y = limits.bottom - pinOffsetY;
    } else {
      newLocation.y = evt.pageY - pinOffsetY;
    }


    if (!isActive) {
      window.form.formName.classList.remove('ad-form--disabled');
      window.map.activateMap();
      window.utilities.toggleNodesDisabled(window.form.adFormInputs);
      window.utilities.toggleNodesDisabled(window.form.adFormSelects);
      isActive = true;
    }

    relocate(newLocation);
  }

  function relocate(newLocation) {
    pin.style.left = newLocation.x + 'px';
    pin.style.top = newLocation.y + 'px';

    window.form.addValue.setAttribute('value', Math.round((newLocation.x - 120 + pin.offsetWidth / 2)) + ', ' + (newLocation.y + pin.offsetHeight / 2));
  }

  pin.addEventListener('mousedown', function (evt) {
    pin.style.position = 'absolute';
    moveAt(evt);
    document.body.appendChild(pin);
    pin.style.zIndex = 1000;

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseUp() {
    document.removeEventListener('mousemove', moveAt);
    document.removeEventListener('mouseup', onMouseUp);
  }
})();

