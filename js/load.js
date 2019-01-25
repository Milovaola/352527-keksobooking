'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;


  function serverRequest(method, URL, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
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

    xhr.timeout = TIMEOUT;

    xhr.open(method, URL);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  function load(onSuccess, onError) {
    serverRequest('GET', URL_LOAD, onSuccess, onError);
  }
  function upload(onSuccess, onError, data) {
    serverRequest('POST', URL_UPLOAD, onSuccess, onError, data);
  }
  window.load = {
    load: load,
    upload: upload
  };
})();
