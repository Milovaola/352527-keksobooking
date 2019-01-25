'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fotoParameters = {
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewFoto = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return avatarName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });
  fotoChooser.addEventListener('change', function () {

    var foto = fotoChooser.files[0];
    var fotoName = foto.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fotoName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var fotoHouses = document.createElement('img');
        fotoHouses.width = fotoParameters.WIDTH;
        fotoHouses.height = fotoParameters.HEIGHT;
        fotoHouses.src = reader.result;
        previewFoto.appendChild(fotoHouses);
      });

      reader.readAsDataURL(foto);
    }
  });
})();
