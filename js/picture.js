'use strict';

(function () {
  window.picturesPlace = document.querySelector('.pictures');

  var SortButtonId = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISSCUSED: 'filter-discussed'
  };

  var bigPictureOpen = function (evt) {
    evt.preventDefault();

    var bigPictureSection = document.querySelector('.big-picture');
    var body = document.querySelector('body');
    var id = evt.target.dataset.id;
    var picture = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
    var closeButton = document.querySelector('.big-picture__cancel');

    var onCloseButtonClick = function () {
      if (body.classList.contains(window.Class.MODAL_OPEN.slice(1))) {
        body.classList.remove(window.Class.MODAL_OPEN.slice(1));
      }
      if (!bigPictureSection.classList.contains(window.Class.HIDDEN.slice(1))) {
        bigPictureSection.classList.add(window.Class.HIDDEN.slice(1));
      }

      closeButton.removeEventListener('click', onCloseButtonClick);
      window.removeEventListener('keydown', onCloseButtonKeydown);
    };

    var onCloseButtonKeydown = function (escEvt) {
      if (escEvt.key === window.EvtKey.ESC) {
        onCloseButtonClick();
      }
    };

    picture.src = window.usersFoto[id].url;
    picture.alt = window.usersFoto[id].description;
    bigPictureSection.querySelector('.social__caption').textContent = window.usersFoto[id].description;
    bigPictureSection.querySelector('.likes-count').textContent = window.usersFoto[id].likes;
    bigPictureSection.querySelector('.comments-count').textContent = window.usersFoto[id].comments.length;

    window.renderComments(window.usersFoto[id].comments);

    if (!body.classList.contains(window.Class.MODAL_OPEN.slice(1))) {
      body.classList.add(window.Class.MODAL_OPEN.slice(1));
    }
    if (bigPictureSection.classList.contains(window.Class.HIDDEN.slice(1))) {
      bigPictureSection.classList.remove(window.Class.HIDDEN.slice(1));
    }
    closeButton.addEventListener('click', onCloseButtonClick);
    window.addEventListener('keydown', onCloseButtonKeydown);
  };

  window.picture = {

    render: function (data) {
      var pictureTemplate = document.querySelector('#picture');
      var fragment = document.createDocumentFragment();

      data.forEach(function (item, i) {
        var picture = pictureTemplate.cloneNode(true).content.querySelector('.picture');
        picture.dataset.id = i;

        Object.keys(picture.children).forEach(function (child) {
          if (picture.children[child].children.length !== 0) {
            picture.children[child].dataset.id = i;
            Object.keys(picture.children[child].children).forEach(function (childItem) {
              picture.children[child].children[childItem].dataset.id = i;
            });
          } else {
            picture.children[child].dataset.id = i;
          }
        });

        picture.querySelector('img').src = item.url;
        picture.querySelector('.picture__likes').textContent = item.likes;
        picture.querySelector('.picture__comments').textContent = item.comments.length;
        fragment.appendChild(picture);
      });

      window.picturesPlace.appendChild(fragment);

      document.querySelectorAll('a.picture').forEach(function (picture) {
        picture.addEventListener('click', bigPictureOpen);
      });
    },

    remove: function () {
      var pictures = window.picturesPlace.querySelectorAll('a.picture');
      pictures.forEach(function (picture) {
        window.picturesPlace.removeChild(picture);
      });
    },

    sort: function (buttonId) {
      this.remove();
      var data = window.usersFoto.slice();

      var buttons = document.querySelectorAll('button.img-filters__button');
      buttons.forEach(function (button) {
        if (button.classList.contains(window.Class.FILTER_BUTTON_ACTIVE)) {
          button.classList.remove(window.Class.FILTER_BUTTON_ACTIVE);
        }
        if (button.id === buttonId) {
          button.classList.add(window.Class.FILTER_BUTTON_ACTIVE);
        }
      });


      switch (buttonId) {
        case SortButtonId.DEFAULT:
          this.render(window.usersFoto);
          break;
        case SortButtonId.RANDOM:
          this.render(window.getRandom(window.usersFoto, 10));
          break;
        case SortButtonId.DISSCUSED:
          this.render(data
            .sort(function (a, b) {
              return a.comments.length - b.comments.length;
            })
            .reverse()
          );
          break;
      }
    }
  };
})();
