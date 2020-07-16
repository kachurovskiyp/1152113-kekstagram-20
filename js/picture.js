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
      this.remove();
      var data = window.usersFoto.slice();

      switch (buttonId) {
        case SortButtonId.default:
          this.render(window.usersFoto);
          break;
        case SortButtonId.random:
          this.render(window.getRandom(window.usersFoto, 10));
          break;
        case SortButtonId.discussed:
          this.render(data
            .sort(function (a, b) {
              return a.comments.length - b.comments.length;
            })
            .reverse()
          )
          break;
      }
    }
  };
})();
