'use strict';

(function () {
  var messageSection = document.querySelector('main');

  window.getMessage = function (type) {
    var template = document.querySelector('#' + type);
    if (template) {
      messageSection.appendChild(template.cloneNode(true).content);
    }
    var message = document.querySelector('section.' + type);
    var closeButton = message.querySelector('button');
    closeButton.addEventListener('click', function () {
      message.remove();
    });
  };
})();
