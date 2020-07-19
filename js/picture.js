'use strict';

(function () {
  var picturesPlace = document.querySelector('.pictures');
  var SortButtonId = {
    default: 'filter-default',
    random: 'filter-random',
    discussed: 'filter-discussed'
  };

  var bigPictureOpen = function (evt) {
    evt.preventDefault();

    var bigPictureSection = document.querySelector('.big-picture');
    var body = document.querySelector('body');
    var id = evt.target.dataset.id;
    var picture = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
    var closeButton = document.querySelector('.big-picture__cancel');

    var bigPictureClose = function () {
      if (body.classList.contains(window.Class.ModalOpen.slice(1))){
        body.classList.remove(window.Class.ModalOpen.slice(1));
      }
      if (!bigPictureSection.classList.contains(window.Class.Hidden.slice(1))){
        bigPictureSection.classList.add(window.Class.Hidden.slice(1));
      }

      closeButton.removeEventListener('click', bigPictureClose);
      window.removeEventListener('keydown', bigPictureEscClose);
    };

    var bigPictureEscClose = function (evt) {
      if (evt.key === window.EvtKey.Esc) {
        bigPictureClose();
      }
    }

    picture.src = window.usersFoto[id].url;
    picture.alt = window.usersFoto[id].description;
    bigPictureSection.querySelector('.social__caption').textContent = window.usersFoto[id].description;
    bigPictureSection.querySelector('.likes-count').textContent = window.usersFoto[id].likes;
    bigPictureSection.querySelector('.comments-count').textContent = window.usersFoto[id].comments.length;

    window.comments(window.usersFoto[id].comments);

    if (!body.classList.contains(window.Class.ModalOpen.slice(1))){
      body.classList.add(window.Class.ModalOpen.slice(1));
    }
    if (bigPictureSection.classList.contains(window.Class.Hidden.slice(1))){
      bigPictureSection.classList.remove(window.Class.Hidden.slice(1));
    }
    closeButton.addEventListener('click', bigPictureClose);
    window.addEventListener('keydown', bigPictureEscClose);
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
        picture.querySelector('img').children
        picture.querySelector('.picture__likes').textContent = item.likes;
        picture.querySelector('.picture__comments').textContent = item.comments.length;
        fragment.appendChild(picture);
      });

      picturesPlace.appendChild(fragment);

      document.querySelectorAll('a.picture').forEach(function (picture) {
        picture.addEventListener('click', bigPictureOpen);
      });
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

      var buttons = document.querySelectorAll('button.img-filters__button');
      buttons.forEach(function (button) {
        if (button.classList.contains(window.Class.FilterButtonActive)){
          button.classList.remove(window.Class.FilterButtonActive);
        }
        if (button.id === buttonId) {
          button.classList.add(window.Class.FilterButtonActive);
        }
      });


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
          );
          break;
      }
    }
  };
})();
