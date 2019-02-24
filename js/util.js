'use strict';

(function () {

  window.ADVERTS_COUNT = 10;

  window.ESC_KEYCODE = 27;

  window.PIN_WIDTH = 50;
  window.PIN_HEIGHT = 70;
  window.PHOTO_WIDTH = 45;
  window.PHOTO_HEIGHT = 40;
  window.PHOTO_ALT = 'Фотография жилья';

  window.HouseTypeDictionary = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.initialPinButton = document.querySelector('.map__pin--main');

  window.similarListElement = document.querySelector('.map__pins');// here insert pins-adverts
  window.similarAdvertTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  window.similarListComponent = document.querySelector('.map');// here insert
  window.nextSibling = document.querySelector('.map__filters-container');
  window.similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  window.activeState = document.querySelector('.map');

})();
