'use strict';

(function () {

  var fileInput = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');

  window.loadBackend('load');

  window.readImage(fileInput, preview);

  fileInput.addEventListener('change', function () {
    window.uploadForm.open();
  });
})();
