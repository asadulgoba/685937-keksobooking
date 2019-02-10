'use strict';

(function () {

  window.TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  window.TYPES = ['palace', 'flat', 'house', 'bungalo'];

  window.CHECKINS = ['12:00', '13:00', '14:00'];

  window.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.ADVERTS_COUNT = 8;

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

}) ();
