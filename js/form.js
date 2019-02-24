'use strict';

(function () {

  window.form = document.querySelector('.ad-form');
  var fieldSetAdvert = document.querySelectorAll('.ad-form fieldset');

  var priceAdvert = document.getElementById('price');
  var typeHouseSelect = document.getElementById('type');

  var disableFieldSetAdvert = function () {
    for (var i = 0; i < fieldSetAdvert.length; i++) {
      fieldSetAdvert[i].setAttribute('disabled', 'disabled');
    }
  };
  disableFieldSetAdvert();

  window.enableFieldSetAdvert = function () {
    for (var i = 0; i < fieldSetAdvert.length; i++) {
      fieldSetAdvert[i].removeAttribute('disabled', 'disabled');
    }
  };


  var filterSelectForm = document.querySelectorAll('.map__filter');
  var filterFormFieldset = document.querySelector('.map__features');

  window.disabledFilterForm = function () {
    for (var i = 0; i < filterSelectForm.length; i++) {
      filterSelectForm[i].setAttribute('disabled', 'disabled');
    }
    filterFormFieldset.setAttribute('disabled', 'disabled');
  };
  window.disabledFilterForm();


  window.enableFilterForm = function () {
    for (var i = 0; i < filterSelectForm.length; i++) {
      filterSelectForm[i].removeAttribute('disabled', 'disabled');
    }
    filterFormFieldset.removeAttribute('disabled', 'disabled');
  };


  var resetFormButton = document.querySelector('.ad-form__reset');

  var onResetForm = function () {
    window.form.reset();
    window.renderFormAdress();
    window.changePriceAdvertSelect();
    window.changeCapacitySelect();
  };
  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    onResetForm();
  });
  window.changePriceAdvertSelect = function Add() {
    if (typeHouseSelect.value === 'bungalo') {
      priceAdvert.setAttribute('min', 0);
      priceAdvert.setAttribute('placeholder', 0);
    } else if (typeHouseSelect.value === 'flat') {
      priceAdvert.setAttribute('min', 1000);
      priceAdvert.setAttribute('placeholder', 1000);
    } else if (typeHouseSelect.value === 'house') {
      priceAdvert.setAttribute('min', 5000);
      priceAdvert.setAttribute('placeholder', 5000);
    } else if (typeHouseSelect.value === 'palace') {
      priceAdvert.setAttribute('min', 10000);
      priceAdvert.setAttribute('placeholder', 10000);
    }
  };

  typeHouseSelect.addEventListener('change', window.changePriceAdvertSelect);

  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');
  timeInSelect.onchange = function (evt) {
    timeOutSelect.value = evt.target.value;
  };
  timeOutSelect.onchange = function (evt) {
    timeInSelect.value = evt.target.value;
  };

  var roomNumberSelect = document.getElementById('room_number');
  var capacitySelect = document.getElementById('capacity');
  window.changeCapacitySelect = function () {
    var currentValue = roomNumberSelect.value;
    if (+currentValue === 100) {
      for (var i = 0; i < capacitySelect.children.length; i++) {
        if (+capacitySelect.children[i].value === 0) {
          capacitySelect.children[i].disabled = false;
          capacitySelect.children[i].selected = true;
        } else {
          capacitySelect.children[i].disabled = true;
        }
      }
    } else {
      for (i = capacitySelect.children.length - 1; i >= 0; i--) {
        if (+capacitySelect.children[i].value <= +currentValue && +capacitySelect.children[i].value !== 0) {
          capacitySelect.children[i].disabled = false;
          capacitySelect.children[i].selected = true;
        } else {
          capacitySelect.children[i].disabled = true;
        }
      }
    }
  };
  roomNumberSelect.addEventListener('change', window.changeCapacitySelect);


  var formAdress = document.querySelector('#address');// insert here adress

  window.renderFormAdress = function () {
    formAdress.value = +window.initialPinButton.style.left.replace(/\D+/g, '') + Math.round(window.initialPinButton.offsetWidth / 2) + ', ' + (+window.initialPinButton.style.top.replace(/\D+/g, '') + window.initialPinButton.offsetHeight + 13);
  };

  var successHandler = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.fontSize = '30px';
    setTimeout(document.body.insertAdjacentElement('afterbegin', node), 5000);
    node.textContent = 'Данные формы успешно загружены';

  };


  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var errorWindow = errorTemplate.cloneNode(true);
  var errorMessage = errorWindow.querySelector('.error__message');
  var errorButton = errorWindow.querySelector('.error__button');

  var errorHandler = function () {
    errorMessage.textContent = 'Ошибка загрузки данных формы';
    document.body.insertAdjacentElement('afterbegin', errorWindow);
  };

  errorButton.addEventListener('click', function () {
    errorWindow.classList.add('hidden');
  });

  window.form.addEventListener('submit', function (evt) {
    window.backend.upload(
        new FormData(window.form),
        function () {
          onResetForm();
          successHandler();
        },
        errorHandler);
    evt.preventDefault();
  });

})();


