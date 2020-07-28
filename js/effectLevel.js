'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var levelDepth = document.querySelector('.effect-level__depth');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelector('.effects__list');
  var CoordsX = {
    MIN: 0,
    MAX: 450,
    STEP: 20
  };
  var startXCoords;

  var Effect = {
    NONE: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var onMouseMove = function (moveEvt) {
    var shiftX = startXCoords - moveEvt.clientX;
    if (levelPin.offsetLeft - shiftX > CoordsX.MIN && levelPin.offsetLeft - shiftX < CoordsX.MAX) {
      startXCoords = moveEvt.clientX;
      levelPin.style.left = (levelPin.offsetLeft - shiftX) + 'px';
      levelDepth.style.width = (levelPin.offsetLeft - shiftX) + 'px';
    }
  };

  var onLevelPinClick = function (evt) {
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.effectLevel.setEffectValue();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    if (evt.button === window.config.EvtKey.MOUSE_LEFT) {
      startXCoords = evt.clientX;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onLevelPinKeydown = function (evt) {
    if (evt.key === window.config.EvtKey.LEFT) {
      if (levelPin.offsetLeft > CoordsX.MIN) {
        levelPin.style.left = (levelPin.offsetLeft - CoordsX.STEP) + 'px';
        levelDepth.style.width = (levelPin.offsetLeft - (CoordsX.STEP / 2)) + 'px';
        window.effectLevel.setEffectValue();
      }
    }
    if (evt.key === window.config.EvtKey.RIGHT) {
      if (levelPin.offsetLeft < CoordsX.MAX) {
        levelPin.style.left = (levelPin.offsetLeft + CoordsX.STEP) + 'px';
        levelDepth.style.width = (levelPin.offsetLeft + (CoordsX.STEP / 2)) + 'px';
        window.effectLevel.setEffectValue();
      }
    }
  };

  window.effectLevel = {
    setMove: function () {
      levelPin.addEventListener('mousedown', onLevelPinClick);
      levelPin.addEventListener('keydown', onLevelPinKeydown);
    },
    unsetMove: function () {
      levelPin.removeEventListener('mousedown', onLevelPinClick);
      levelPin.removeEventListener('keydown', onLevelPinKeydown);
    },
    resetLevel: function () {
      imagePreview.removeAttribute('class');
      imagePreview.removeAttribute('style');
      levelPin.style.left = CoordsX.MAX + 'px';
      levelDepth.style.width = CoordsX.MAX + 'px';
    },
    setEffectValue: function () {
      var choosedEffect = effectList.querySelector('input[type="radio"]:checked').value;
      var effectInput = document.querySelector('input.effect-level__value');
      var value = +levelPin.style.left.replace('px', '');

      effectInput.setAttribute('value', (value * 100 / 450).toFixed(1));

      switch (choosedEffect) {
        case Effect.CHROME:
          value = (value / 450).toFixed(3);
          imagePreview.style.filter = 'grayscale(' + value + ')';
          break;
        case Effect.SEPIA:
          value = (value / 450).toFixed(3);
          imagePreview.style.filter = 'sepia(' + value + ')';
          break;
        case Effect.MARVIN:
          value = (value * 100 / 450).toFixed(1);
          imagePreview.style.filter = 'invert(' + value + '%)';
          break;
        case Effect.PHOBOS:
          value = (value / 450 * 3).toFixed(2);
          imagePreview.style.filter = 'blur(' + value + 'px)';
          break;
        case Effect.HEAT:
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
