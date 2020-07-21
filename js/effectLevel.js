'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var levelDepth = document.querySelector('.effect-level__depth');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelector('.effects__list');
  var CoordsX = {
    min: 0,
    max: 450,
    step: 20
  };
  var startXCoords;

  var Effect = {
    None: 'none',
    Chrome: 'chrome',
    Sepia: 'sepia',
    Marvin: 'marvin',
    Phobos: 'phobos',
    Heat: 'heat'
  };

  var onMouseMove = function (moveEvt) {
    var shiftX = startXCoords - moveEvt.clientX;
    if (levelPin.offsetLeft - shiftX > CoordsX.min && levelPin.offsetLeft - shiftX < CoordsX.max) {
      startXCoords = moveEvt.clientX;
      levelPin.style.left = (levelPin.offsetLeft - shiftX) + 'px';
      levelDepth.style.width = (levelPin.offsetLeft - shiftX) + 'px';
    }
  };

  var setMove = function (evt) {
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.effectLevel.setEffectValue();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    if (evt.button === window.EvtKey.MouseLeft) {
      startXCoords = evt.clientX;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var setMoveArrow = function (evt) {
    if (evt.key === window.EvtKey.Left) {
      if (levelPin.offsetLeft > CoordsX.min) {
        levelPin.style.left = (levelPin.offsetLeft - CoordsX.step) + 'px';
        levelDepth.style.width = (levelPin.offsetLeft - (CoordsX.step / 2)) + 'px';
        window.effectLevel.setEffectValue();
      }
    }
    if (evt.key === window.EvtKey.Right) {
      if (levelPin.offsetLeft < CoordsX.max) {
        levelPin.style.left = (levelPin.offsetLeft + CoordsX.step) + 'px';
        levelDepth.style.width = (levelPin.offsetLeft + (CoordsX.step / 2)) + 'px';
        window.effectLevel.setEffectValue();
      }
    }
  };

  window.effectLevel = {
    setMove: function () {
      levelPin.addEventListener('mousedown', setMove);
      levelPin.addEventListener('keydown', setMoveArrow);
    },
    unsetMove: function () {
      levelPin.removeEventListener('mousedown', setMove);
      levelPin.removeEventListener('keydown', setMoveArrow);
    },
    resetLevel: function () {
      imagePreview.removeAttribute('class');
      imagePreview.removeAttribute('style');
      levelPin.style.left = CoordsX.max + 'px';
      levelDepth.style.width = CoordsX.max + 'px';
    },
    setEffectValue: function () {
      var choosedEffect = effectList.querySelector('input[type="radio"]:checked').value;
      var effectInput = document.querySelector('input.effect-level__value');
      var value = +levelPin.style.left.replace('px', '');

      effectInput.setAttribute('value', (value * 100 / 450).toFixed(1));

      switch (choosedEffect) {
        case Effect.Chrome:
          value = (value / 450).toFixed(3);
          imagePreview.style.filter = 'grayscale(' + value + ')';
          break;
        case Effect.Sepia:
          value = (value / 450).toFixed(3);
          imagePreview.style.filter = 'sepia(' + value + ')';
          break;
        case Effect.Marvin:
          value = (value * 100 / 450).toFixed(1);
          imagePreview.style.filter = 'invert(' + value + '%)';
          break;
        case Effect.Phobos:
          value = (value / 450 * 3).toFixed(2);
          imagePreview.style.filter = 'blur(' + value + 'px)';
          break;
        case Effect.Heat:
          value = 3 * (((value * 100 / 450).toFixed(2)) / 100);
          imagePreview.style.filter = 'brightness(' + value + ')';
          break;
        default:
          imagePreview.removeAttribute('class');
          break;
      }
    }
  };
})();
