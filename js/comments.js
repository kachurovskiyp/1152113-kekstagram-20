'use strict';

(function () {
  var commentSection = document.querySelector('.social__comments');
  var commentLoader = document.querySelector('button.comments-loader');
  var commentTemplate = document.querySelector('#comment');

  var hideLoader = function () {
    if (!commentLoader.classList.contains(window.Class.Hidden.slice(1))) {
      commentLoader.classList.add(window.Class.Hidden.slice(1));
    }
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      var newComment = commentTemplate.cloneNode(true).content;
      var image = newComment.querySelector('img.social__picture');
      image.src = item.avatar;
      image.alt = item.name;
      newComment.querySelector('p.social__text').textContent = item.message;
      fragment.appendChild(newComment);
    });
    commentSection.appendChild(fragment);
  };

  window.comments = function (commentList) {
    while (commentSection.firstChild) {
      commentSection.removeChild(commentSection.firstChild);
    }

    if (commentList.length === 0) {
      hideLoader();
      var comment = document.createElement('li');
      var text = document.createElement('p');

      comment.classList.add('social__comment');

      text.classList.add('social__text');
      text.textContent = 'Комментариев пока нет.';

      comment.appendChild(text);
      commentSection.appendChild(comment);
    }

    if (commentList.length < 5) {
      hideLoader();
      render(commentList);
    }

    if (commentList.length > 5) {
      if (commentLoader.classList.contains(window.Class.Hidden.slice(1))) {
        commentLoader.classList.remove(window.Class.Hidden.slice(1));
      }
      var localcomments = commentList.slice();

      var getShortComments = function () {
        var short = [];
        if (localcomments.length > 5) {
          for (var i = 0; i < 5; i++) {
            short.push(localcomments.shift());
          }
        } else {
          return localcomments;
        }
        return short;
      };

      var loadComment = function () {
        var shortcomments = getShortComments();
        render(shortcomments);
        if (shortcomments.length < 5) {
          commentLoader.removeEventListener('click', loadComment);
          hideLoader();
        }
      };

      if (localcomments.length > 5) {
        var shortcomments = getShortComments();
        render(shortcomments);
        commentLoader.addEventListener('click', loadComment);
      }
    }
  };
})();
