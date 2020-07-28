'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var Url = {
    LOAD: 'https://javascript.pages.academy/kekstagram/data',
    SEND: 'https://javascript.pages.academy/kekstagram'
  };
  var Method = {
    LOAD: 'GET',
    SEND: 'POST'
  };

  window.StatusCode = {
    OK: 200
  };

  var onError = function (err) {
    var errorMassage = document.createElement('span');
    errorMassage.textContent = err;
    window.uploadForm.close();
    window.picturesPlace.appendChild(errorMassage);
  };

  window.loadBackend = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (data === 'load') {
      xhr.addEventListener('load', function () {
        if (xhr.status === window.StatusCode.OK) {
          window.onLoad(xhr.response);
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
      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(Method.LOAD, Url.LOAD);
      xhr.send();
    }

    if (data && onSuccess) {
      xhr.addEventListener('load', function () {
        onSuccess(xhr.status);
      });

      xhr.open(Method.SEND, Url.SEND);
      xhr.send(data);
    }
  };
})();
