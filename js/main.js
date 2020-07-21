'use strict';

(function () {
  window.EvtKey = {
    Esc: 'Escape',
    Enter: 'Enter',
    MouseLeft: 0,
    Left: 'ArrowLeft',
    Right: 'ArrowRight'
  };

  window.Class = {
    Hidden: '.hidden',
    ModalOpen: '.modal-open',
    ScaleDown: '.scale__control--smaller',
    ScaleUp: '.scale__control--bigger',
    FilterButtonActive: 'img-filters__button--active'
  };

  var fileInput = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');

  window.backend('load');

  window.readImage(fileInput, preview);

  fileInput.addEventListener('change', function () {
    window.uploadForm.open();
  });
})();
