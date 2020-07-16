'use strict';
(function () {
  var filter = document.querySelector('.img-filters');

  window.filter = {
    active: function () {
      filter.classList.remove('img-filters--inactive');
      var buttons = filter.querySelectorAll('button.img-filters__button');
      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          window.picture.sort(button.id);
        });
      });
    }
  };
})();
