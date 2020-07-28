'use strict';

(function () {
  window.EvtKey = {
    ESC: 'Escape',
    ENTER: 'Enter',
    MOUSE_LEFT: 0,
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
  };

  window.Class = {
    HIDDEN: '.hidden',
    MODAL_OPEN: '.modal-open',
    SCALE_DOWN: '.scale__control--smaller',
    SCALE_UP: '.scale__control--bigger',
    FILTER_BUTTON_ACTIVE: 'img-filters__button--active'
  };

  var fileInput = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');

  window.loadBackend('load');

  window.readImage(fileInput, preview);

  fileInput.addEventListener('change', function () {
    window.uploadForm.open();
  });
})();
