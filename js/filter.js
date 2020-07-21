'use strict';
(function () {
  var filter = document.querySelector('.img-filters');

  window.filter = {
    active: function () {
      filter.classList.remove('img-filters--inactive');

      filter.querySelectorAll('button.img-filters__button').forEach(function (button) {
        button.addEventListener('click', window.debounce(function () {
          window.picture.sort(button.id);
        }));
      });
    }
  };
})();
