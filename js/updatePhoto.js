'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PhotoParameters = {
    WIDTH: 70,
    HEIGHT: 70
  };
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  function filtrationByCorrectType(file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  }
  function changeAvatar(src) {
    previewAvatar.src = src;
  }

  function addPhoto(src) {
    var photoHouses = document.createElement('img');
    photoHouses.src = src;
    photoHouses.style.width = PhotoParameters.WIDTH + 'px';
    photoHouses.style.height = PhotoParameters.HEIGHT + 'px';
    previewPhoto.appendChild(photoHouses);
    photoContainer.appendChild(previewPhoto);
    previewPhoto.classList.add('ad-form__photo--added');
  }

  function fileLoad(chooser, func) {
    var files = [];

    for (var i = 0; i < chooser.files.length; i++) {
      files.push(chooser.files[i]);
    }

    files.filter(filtrationByCorrectType);

    if (files) {
      files.forEach(function (it) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(it);
      });
    }
  }
  function removeImages() {
    previewAvatar.src = DEFAULT_AVATAR;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (it) {
        it.remove();
      });
    }
  }
  function onAvatarChange(evt) {
    fileLoad(evt.target, changeAvatar);
  }

  function onPhotoChange(evt) {
    fileLoad(evt.target, addPhoto);
  }
  function activate() {
    avatarChooser.addEventListener('change', onAvatarChange);
    photoChooser.addEventListener('change', onPhotoChange);
  }

  window.updatePhoto = {
    removeImages: removeImages,
    activate: activate
  };
})();
