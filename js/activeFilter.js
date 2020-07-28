'use strict';
(function () {
  var filter = document.querySelector('.img-filters');

  window.activeFilter = function () {
      filter.classList.remove('img-filters--inactive');

      filter.querySelectorAll('button.img-filters__button').forEach(function (button) {
        button.addEventListener('click', window.debounce(function (evt) {
          window.picture.sort(evt.target.id);
        }));
      });
    }
})();
