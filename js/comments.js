'use strict';

(function () {
  var COMMENTS_NUMBER = 5;
  var commentSection = document.querySelector('.social__comments');
  var commentLoader = document.querySelector('button.comments-loader');
  var commentTemplate = document.querySelector('#comment');

  var hideLoader = function () {
    if (!commentLoader.classList.contains(window.config.ClassName.HIDDEN.slice(1))) {
      commentLoader.classList.add(window.config.ClassName.HIDDEN.slice(1));
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

  window.renderComments = function (commentList) {
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

    if (commentList.length < COMMENTS_NUMBER) {
      hideLoader();
      render(commentList);
    }

    if (commentList.length > COMMENTS_NUMBER) {
      if (commentLoader.classList.contains(window.config.ClassName.HIDDEN.slice(1))) {
        commentLoader.classList.remove(window.config.ClassName.HIDDEN.slice(1));
      }
      var localcomments = commentList.slice();

      var getShortComments = function () {
        var shortComments = [];
        if (localcomments.length > COMMENTS_NUMBER) {
          for (var i = 0; i < COMMENTS_NUMBER; i++) {
            shortComments.push(localcomments.shift());
          }
        } else {
          return localcomments;
        }
        return shortComments;
      };

      var onCommentLoaderClick = function () {
        var shortcomments = getShortComments();
        render(shortcomments);
        if (shortcomments.length < COMMENTS_NUMBER) {
          commentLoader.removeEventListener('click', onCommentLoaderClick);
          hideLoader();
        }
      };

      if (localcomments.length > COMMENTS_NUMBER) {
        var shortcomments = getShortComments();
        render(shortcomments);
        commentLoader.addEventListener('click', onCommentLoaderClick);
      }
    }
  };
})();
