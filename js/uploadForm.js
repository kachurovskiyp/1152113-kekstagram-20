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

  var setScale = function (evt) {
    var valueInt = +scaleValue.value.slice(0, scaleValue.value.length - 1);

    if (evt.target.classList.contains(window.Class.ScaleDown.slice(1))) {
      if (valueInt !== Scale.Min) {
        valueInt -= Scale.Step;
        scaleValue.value = valueInt + '%';
      }
    }
    if (evt.target.classList.contains(window.Class.ScaleUp.slice(1))) {
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
  };

  var toggleEffect = function (evt) {
    if (evt.target.value === 'none') {
      imagePreview.removeAttribute('class');

      if (!effectControl.classList.contains(window.Class.Hidden.slice(1))) {
        effectControl.classList.add(window.Class.Hidden.slice(1));
        window.effectLevel.unsetMove();
      }
    } else {
      imagePreview.removeAttribute('class');
      imagePreview.classList.add('effects__preview--' + evt.target.value);
      window.effectLevel.resetLevel();
      window.effectLevel.setEffectValue();

      if (effectControl.classList.contains(window.Class.Hidden.slice(1))) {
        effectControl.classList.remove(window.Class.Hidden.slice(1));
        window.effectLevel.setMove();
      }
    }
  };

  var closeEvt = function () {
    window.uploadForm.close();
    uploadCancel.removeEventListener('click', closeEvt);
  };

  var closeEscEvt = function (evt) {
    if (evt.key === window.EvtKey.Esc) {
      window.uploadForm.close();
      window.removeEventListener('click', closeEscEvt);
    }
  };

  var verifyHastags = function () {
    var reg = /[a-zA-Zа-яА-ЯЁё0-9]/g;

    if (hashtags.value === ' ') {
      hashtags.value = '';
    }

    if (hashtags.value.length > 1) {
      if (!hashtags.value.includes('#')) {
        hashtags.value = '#' + hashtags.value;
      }
    }

    var tags = hashtags.value.toLowerCase().split(' ');

    tags.forEach(function (tag, i) {
      if (tag !== '') {
        var tagVerify = tag.slice(1).match(reg);

        if (!tag.startsWith('#')) {
          tags[i] = '#' + tag;
          hashtags.value = tags.join(' ');
        }

        if (tagVerify !== null && tagVerify.length !== tag.length) {
          hashtags.setCustomValidity('Один из хэштэгов содержит запрещенные символы ("@", "$", ",", "%" и т.д.)');
        } else {
          hashtags.setCustomValidity('');
        }

        if (tag.length === 1) {
          hashtags.setCustomValidity('Один из хэштэгов слишком короткий');
        } else {
          hashtags.setCustomValidity('');
        }

        if (tag.length > 20) {
          hashtags.setCustomValidity('Один из хэштэгов слишком длинный (макс. 20 знаков)');
        } else {
          hashtags.setCustomValidity('');
        }

        if (tags.length > 1 && tags.includes(tag)) {
          hashtags.setCustomValidity('Хэштэги повторяются');
        } else {
          hashtags.setCustomValidity('');
        }

        if (tags.length > 5) {
          hashtags.setCustomValidity('Хэштэгов много. Максимум 5 шт.');
        } else {
          hashtags.setCustomValidity('');
        }
      }
    });
  };

  var verifyComments = function () {
    if (comments.value.length > 140) {
      comments.setCustomValidity('Коментарий слишком длинный. ' + comments.value.length + '/140 символов');
    } else {
      comments.setCustomValidity('');
    }
  }

  var stopEvtEsc = function (evt) {
    if (evt.key === window.EvtKey.Esc) {
      evt.stopPropagation();
    }
  };

  var submitEvent = function (evt) {
    evt.preventDefault();
    window.backend(new FormData(form), function (status) {
      if (status === window.StatusCode.OK) {
        window.uploadForm.close();
        window.message('success');
      } else {
        window.message('error');
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
      if (uploadForm.classList.contains(window.Class.Hidden.slice(1))) {
        uploadForm.classList.remove(window.Class.Hidden.slice(1));
      }
      if (!body.classList.contains(window.Class.ModalOpen.slice(1))) {
        body.classList.add(window.Class.ModalOpen.slice(1));
      }

      scaleValue.value = Scale.Default;
      effectControl.classList.add(window.Class.Hidden.slice(1));

      uploadCancel.addEventListener('click', closeEvt);
      window.addEventListener('keydown', closeEscEvt);

      scaleControl.querySelectorAll('button').forEach(function (button) {
        button.addEventListener('click', setScale);
        button.addEventListener('keydown', setScaleEnter);
      });

      effectList.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.addEventListener('change', toggleEffect);
      });

      hashtags.addEventListener('input', verifyHastags);
      hashtags.addEventListener('keydown', stopEvtEsc);

      comments.addEventListener('change', verifyComments);
      comments.addEventListener('keydown', stopEvtEsc);

      form.addEventListener('submit', submitEvent);
    },

    close: function () {
      if (!uploadForm.classList.contains(window.Class.Hidden.slice(1))) {
        uploadForm.classList.add(window.Class.Hidden.slice(1));
      }
      if (body.classList.contains(window.Class.ModalOpen.slice(1))) {
        body.classList.remove(window.Class.ModalOpen.slice(1));
      }
      scaleControl.querySelectorAll('button').forEach(function (button) {
        button.removeEventListener('click', setScale);
        button.removeEventListener('keydown', setScaleEnter);
      });
      effectList.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.removeEventListener('change', toggleEffect);
      });

      hashtags.removeEventListener('input', verifyHastags);
      hashtags.removeEventListener('keydown', stopEvtEsc);

      comments.removeEventListener('change', verifyComments);
      comments.removeEventListener('keydown', stopEvtEsc);

      form.removeEventListener('submit', submitEvent);

      reset();
    }
  };
})();
