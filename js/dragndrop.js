'use strict';
(function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var pin = document.querySelector('.map__pin--main');
  var windowMap = document.querySelector('.map');
  window.pin = pin;
  window.isActive = false;

  var Limits = {
    left: windowMap.offsetLeft,
    top: Y_MIN,
    right: windowMap.offsetWidth + windowMap.offsetLeft,
    bottom: Y_MAX,
  };

  function moveAt(evt) {
    var newLocation = {
      x: Limits.left,
      y: Limits.top
    };

    var pinOffsetX = pin.offsetWidth / 2;

    if (evt.pageX + pinOffsetX > Limits.right) {
      newLocation.x = Limits.right - windowMap.offsetLeft - pin.offsetWidth;
    } else if (evt.pageX - pinOffsetX < Limits.left) {
      newLocation.x = Limits.left - windowMap.offsetLeft;
    } else {
      newLocation.x = evt.pageX - windowMap.offsetLeft - pinOffsetX;
    }

    var pinOffsetY = pin.offsetHeight / 2; // Курсор по центру высоты пина


    if (evt.pageY - pinOffsetY < Limits.top) { // Если курсор ушел за пределы высоты карты вверх
      newLocation.y = Limits.top - pinOffsetY;
    } else if (evt.pageY - pinOffsetY > Limits.bottom) { // Если курсор ушел за пределы высоты карты вниз
      newLocation.y = Limits.bottom - pinOffsetY;
    } else {
      newLocation.y = evt.pageY - pinOffsetY;
    }


    if (!window.isActive) {
      window.form.formName.classList.remove('ad-form--disabled');
      window.form.onChangeHouseType();
      window.map.activateMap();
      Array.from(window.form.adFormFieldset)
        .forEach(function (fieldsetItem) {
          fieldsetItem.removeAttribute('disabled');
        });
      window.isActive = true;
      window.updatePhoto.activate();
    }

    relocate(newLocation);
  }

  function relocate(newLocation) {
    pin.style.left = newLocation.x + 'px';
    pin.style.top = newLocation.y + 'px';
    window.form.addValue.value = Math.round((newLocation.x + pin.offsetWidth / 2)) + ', ' + (newLocation.y + pin.offsetHeight / 2);
  }

  pin.addEventListener('mousedown', function (evt) {
    moveAt(evt);

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseUp() {
    document.removeEventListener('mousemove', moveAt);
    document.removeEventListener('mouseup', onMouseUp);
  }
})();

