'use strict';

(function () {
  window.EvtKey = {
    Esc: 'Escape',
    Enter: 'Enter'
  };

  window.Class = {
    Hidden: '.hidden',
    ModalOpen: '.modal-open',
    ScaleDown: '.scale__control--smaller',
    ScaleUp: '.scale__control--bigger'
  };

  var fileInput = document.querySelector('#upload-file');

  window.backend('load');

  /* fileInput.addEventListener('change', function () {
    uploadForm.open();
  }) */

  uploadForm.open();
})();
