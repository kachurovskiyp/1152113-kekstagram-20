'use strict';
(function () {

  window.getRandom = function (data, number) {
    var randomData = [];
    var randomIndex = 0;
    var dataLength = data.length - 1;

    while (randomData.length < number) {
      if (randomData.indexOf(data[randomIndex]) === -1) {
        randomData.push(data[randomIndex]);
      }
      randomIndex = Math.round(Math.random() * dataLength);
    }

    return randomData;
  };
})();
