'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var uploadForm = document.querySelector('.img-upload__overlay');

  var body = document.querySelector('body');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var imageInput = document.querySelector('.img-upload__input');

  var scaleControl = document.querySelector('.img-upload__scale');
  var scaleValue = document.querySelector('.scale__control--value');

  var effectList = document.querySelector('.effects__list');
  var effectControl = document.querySelector('.img-upload__effect-level');

  var hashtags = document.querySelector('input.text__hashtags');
  var comments = document.querySelector('textarea.text__description');

  var Scale = {
    Min: 25,
    Max: 100,
    Step: 25,
    Default: '100%'
  };

  var onScaleButtonClick = function (evt) {
    var valueInt = +scaleValue.value.slice(0, scaleValue.value.length - 1);

    if (evt.target.classList.contains(window.Class.SCALE_DOWN.slice(1))) {
      if (valueInt !== Scale.Min) {
        valueInt -= Scale.Step;
        scaleValue.value = valueInt + '%';
      }
    }
    if (evt.target.classList.contains(window.Class.SCALE_UP.slice(1))) {
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

  var onScaleButtonkeydown = function (evt) {
    if (evt.key === window.EvtKey.ENTER) {
      onScaleButtonClick(evt);
    }
  };

  var effectChangeHandler = function (evt) {
    if (evt.target.value === 'none') {
      imagePreview.removeAttribute('class');

      if (!effectControl.classList.contains(window.Class.HIDDEN.slice(1))) {
        effectControl.classList.add(window.Class.HIDDEN.slice(1));
        window.effectLevel.unsetMove();
      }
    } else {
      imagePreview.removeAttribute('class');
      imagePreview.classList.add('effects__preview--' + evt.target.value);
      window.effectLevel.resetLevel();
      window.effectLevel.setEffectValue();

      if (effectControl.classList.contains(window.Class.HIDDEN.slice(1))) {
        effectControl.classList.remove(window.Class.HIDDEN.slice(1));
        window.effectLevel.setMove();
      }
    }
  };

  var onCancelButtonClick = function () {
    window.uploadForm.close();
    uploadCancel.removeEventListener('click', closeEvt);
  };

  var EscKeydownHandler = function (evt) {
    if (evt.key === window.EvtKey.ESC) {
      window.uploadForm.close();
      window.removeEventListener('click',EscKeydownHandler);
    }
  };

  var HastagsChangeHandler = function () {
    var reg = /[a-zA-Zа-яА-ЯЁё0-9]/g;

    var tags = hashtags.value.toLowerCase().split(' ');

    /* tags.forEach(function (tag) */
    for (var i = 0; i < tags.length; i++) {
      var valid = true;
      var tagVerify = tags[i].slice(1).match(reg);

      if (tags[i] !== '') {
        if (!tags[i].startsWith('#')) {
          hashtags.setCustomValidity('Хэштэги должны начинаться с "#"');
          valid = false;
        }
        if (valid && tags[i].slice(1).length < 1) {
          hashtags.setCustomValidity('Один из хэштэгов пуст');
          valid = false;
        }

        if (valid && tagVerify !== null && tagVerify.length !== tags[i].slice(1).length) {
          hashtags.setCustomValidity('Один из хэштэгов содержит запрещенные символы ("@", "$", ",", "%" и т.д.)');
          valid = false;
        }

        if (valid && tags[i].length <= 1) {
          hashtags.setCustomValidity('Один из хэштэгов слишком короткий');
          valid = false;
        }

        if (valid && tags[i].length > 20) {
          var verifyLength = function () {
            if (hashtags.value.length > 20) {
              hashtags.setCustomValidity('Один из хэштэгов слишком длинный (' + hashtags.value.length + '/20 знаков)');
              valid = false;
            } else {
              hashtags.setCustomValidity('');
              hashtags.removeEventListener('input', verifyLength);
              valid = true;
            }
          };

          hashtags.addEventListener('input', HastagsChangeHandler);
          hashtags.setCustomValidity('Один из хэштэгов слишком длинный (' + tags[i].length + '/20 знаков)');
          valid = false;
        }

        if (valid && tags.length > 1 && tags.filter(function (item) {
          return item === tags[i];
        }).length > 1) {
          hashtags.setCustomValidity('Хэштэги повторяются');
          valid = false;
        }

        if (valid && tags.length > 5) {
          hashtags.setCustomValidity('Хэштэгов много. Максимум 5 шт.');
          valid = false;
        }
      }

      if (valid) {
        hashtags.setCustomValidity('');
      } else {
        break;
      }
    }
  };

  var commentsChangeHandler = function () {
    if (comments.value.length > 140) {
      comments.setCustomValidity('Коментарий слишком длинный. ' + comments.value.length + '/140 символов');
    } else {
      comments.setCustomValidity('');
    }
  };

  var escapeKeydownHandler = function (evt) {
    if (evt.key === window.EvtKey.ESC) {
      evt.stopPropagation();
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.loadBackend(new FormData(form), function (status) {
      if (status === window.StatusCode.OK) {
        window.uploadForm.close();
        window.getMessage('success');
      } else {
        window.getMessage('error');
      }
    });
  };

  var reset = function () {
    form.reset();
    imageInput.value = '';
    scaleValue.value = '100%';
  };

  window.uploadForm = {
    open: function () {
      if (uploadForm.classList.contains(window.Class.HIDDEN.slice(1))) {
        uploadForm.classList.remove(window.Class.HIDDEN.slice(1));
      }
      if (!body.classList.contains(window.Class.MODAL_OPEN.slice(1))) {
        body.classList.add(window.Class.MODAL_OPEN.slice(1));
      }

      scaleValue.value = Scale.Default;
      effectControl.classList.add(window.Class.HIDDEN.slice(1));

      uploadCancel.addEventListener('click', onCancelButtonClick);
      window.addEventListener('keydown', EscKeydownHandler);

      scaleControl.querySelectorAll('button').forEach(function (button) {
        button.addEventListener('click', onScaleButtonClick);
        button.addEventListener('keydown', onScaleButtonkeydown);
      });

      effectList.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.addEventListener('change', effectChangeHandler);
      });

      window.effectLevel.resetLevel();

      hashtags.addEventListener('change', HastagsChangeHandler);
      hashtags.addEventListener('keydown', escapeKeydownHandler);

      comments.addEventListener('change', commentsChangeHandler);
      comments.addEventListener('keydown', escapeKeydownHandler);

      form.addEventListener('submit', onFormSubmit);
    },

    close: function () {
      if (!uploadForm.classList.contains(window.Class.HIDDEN.slice(1))) {
        uploadForm.classList.add(window.Class.HIDDEN.slice(1));
      }
      if (body.classList.contains(window.Class.MODAL_OPEN.slice(1))) {
        body.classList.remove(window.Class.MODAL_OPEN.slice(1));
      }
      scaleControl.querySelectorAll('button').forEach(function (button) {
        button.removeEventListener('click', onScaleButtonClick);
        button.removeEventListener('keydown', onScaleButtonkeydown);
      });
      effectList.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.removeEventListener('change', effectChangeHandler);
      });

      hashtags.removeEventListener('input', HastagsChangeHandler);
      hashtags.removeEventListener('keydown', escapeKeydownHandler);

      comments.removeEventListener('change', commentsChangeHandler);
      comments.removeEventListener('keydown', escapeKeydownHandler);
      uploadCancel.removeEventListener('click', onCancelButtonClick);

      form.removeEventListener('submit', onFormSubmit);

      reset();
    }
  };
})();
