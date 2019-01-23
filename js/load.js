'use strict';

(function () {
  var urlLoad = 'https://js.dump.academy/keksobooking/data';
  var urlUpload = 'https://js.dump.academy/keksobooking';


  function serverRequest(method, URL, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, URL);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  function load(onSuccess, onError) {
    serverRequest('GET', urlLoad, onSuccess, onError);
  }
  function upload(onSuccess, onError, data) {
    serverRequest('POST', urlUpload, onSuccess, onError, data);
  }
  window.load = {
    load: load,
    upload: upload
  };
})();
