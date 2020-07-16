'use strict';
(function () {
  window.onLoad = function (data) {
    window.usersFoto = data;

    window.picture.render(data);
    window.filter.active();
  };
})();
