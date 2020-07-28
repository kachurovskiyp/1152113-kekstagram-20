'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.readImage = function (fileChooser, preview) {
      fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };
})();
