'use strict';

(function () {
  var picturesPlace = document.querySelector('.pictures');
  var SortButtonId = {
    default: 'filter-default',
    random: 'filter-random',
    discussed: 'filter-discussed'
  };

  window.picture = {

    render: function (data) {
      var pictureTemplate = document.querySelector('#picture');
      var fragment = document.createDocumentFragment();

      data.forEach(function (item) {
        var picture = pictureTemplate.cloneNode(true).content.querySelector('.picture');
        picture.querySelector('img').src = item.url;
        picture.querySelector('.picture__likes').textContent = item.likes;
        picture.querySelector('.picture__comments').textContent = item.comments.length;
        fragment.appendChild(picture);
      });

      picturesPlace.appendChild(fragment);
    },

    remove: function () {
      var pictures = picturesPlace.querySelectorAll('a.picture');
      pictures.forEach(function (picture) {
        picturesPlace.removeChild(picture);
      });
    },

    sort: function (buttonId) {
      switch (buttonId) {
        case SortButtonId.default:
          this.remove();
          this.render(window.usersFoto);
          break;
        case SortButtonId.random:
          this.remove();
          this.render(window.usersFoto.slice(15));
          break;
      }
    }
  };
})();
