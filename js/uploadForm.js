'use strict';
(function () {
  var uploadForm = document.querySelector('.img-upload__overlay');
  var body = document.querySelector('body');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');

  var scaleControl = document.querySelector('.img-upload__scale');
  var scaleValue = document.querySelector('.scale__control--value');

  var effectList = document.querySelector('.effects__list');
  var effectControl = document.querySelector('.img-upload__effect-level');

  var Scale = {
    Min: 25,
    Max: 100,
    Step: 25,
    Default: '100%'
  };

  /* var Effect = {
    None: 'none',
    Chrome: 'chrome',
    Sepia: 'sepia',
    Marvin: 'marvin',
    Phobos: 'phobos',
    Heat: 'heat'
  } */

  var setScale = function (evt) {
    var valueInt = +scaleValue.value.slice(0, scaleValue.value.length - 1);

    if (evt.target.classList.contains(window.Class.ScaleDown.slice(1))){
      if (valueInt !== Scale.Min) {
        valueInt -= Scale.Step;
        scaleValue.value = valueInt + '%';
      }
    }
    if (evt.target.classList.contains(window.Class.ScaleUp.slice(1))){
      if (valueInt !== Scale.Max) {
        valueInt += Scale.Step;
        scaleValue.value = valueInt + '%';
      }
    }

    if (valueInt === 100) {
      imagePreview.style.transform = 'scale(1)';
    } else {
      imagePreview.style.transform = 'scale(0.' + valueInt + ')';
    }
  };

  var setScaleEnter = function (evt) {
    if (evt.key === window.EvtKey.Enter) {
      setScale(evt);
    }
  }

  var toggleEffect = function (evt) {
    if(evt.target.value === 'none') {
      imagePreview.removeAttribute('class');
      if (!effectControl.classList.contains(window.Class.Hidden.slice(1))) {
        effectControl.classList.add(window.Class.Hidden.slice(1));
      }
    } else {
      imagePreview.removeAttribute('class');
      imagePreview.classList.add('effects__preview--' + evt.target.value);
      if (effectControl.classList.contains(window.Class.Hidden.slice(1))) {
        effectControl.classList.remove(window.Class.Hidden.slice(1));
      }
    }
  }

  var closeEvt = function () {
    window.uploadForm.close();
    uploadCancel.removeEventListener('click', closeEvt);
  };

  var closeEscEvt = function (evt) {
    if (evt.key === window.EvtKey.Esc) {
      window.uploadForm.close();
      window.removeEventListener('click', closeEscEvt);
    }
  }

  window.uploadForm = {
    open: function () {
      if (uploadForm.classList.contains(window.Class.Hidden.slice(1))){
        uploadForm.classList.remove(window.Class.Hidden.slice(1));
      }
      if (!body.classList.contains(window.Class.ModalOpen.slice(1))){
        body.classList.add(window.Class.ModalOpen.slice(1));
      }

      scaleValue.value = Scale.Default;
      effectControl.classList.add(window.Class.Hidden.slice(1));

      uploadCancel.addEventListener('click', closeEvt);
      window.addEventListener('keydown', closeEscEvt);

      scaleControl.querySelectorAll('button').forEach( function (button) {
        button.addEventListener('click', setScale);
        button.addEventListener('keydown', setScaleEnter);
      });

      effectList.querySelectorAll('input[type="radio"]').forEach( function (input) {
        input.addEventListener('change', toggleEffect);
      });
    },

    close: function () {
      if (!uploadForm.classList.contains(window.Class.Hidden.slice(1))){
        uploadForm.classList.add(window.Class.Hidden.slice(1));
      }
      if (body.classList.contains(window.Class.ModalOpen.slice(1))){
        body.classList.remove(window.Class.ModalOpen.slice(1));
      }
      scaleControl.querySelectorAll('button').forEach( function (button) {
        button.removeEventListener('click', setScale);
        button.removeEventListener('keydown', setScaleEnter);
      } );
      effectList.querySelectorAll('input[type="radio"]').forEach( function (input) {
        input.removeEventListener('change', toggleEffect);
      });
    }
  };
})();
