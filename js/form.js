'use strict';

(function () {

  window.formAdvert = document.querySelector('.ad-form');
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

  var resetFormButton = document.querySelector('.ad-form__reset');
  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.formAdvert.reset();
    window.renderFormAdress();
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

})();
