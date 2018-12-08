'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];//  расположенных в произвольном порядке

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
var PHOTO_ALT = 'Фотография жилья';

var HouseTypeDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomItemFromArray = function (items) {
  var item = items[Math.floor(Math.random() * items.length)];
  return item;
};

var getRandomInRange = function (min, max) {
  var number = Math.floor(Math.random() * (max - min)) + min;
  return number;
};

var shuffleArray = function (array) {
  function compareRandom() {
    return Math.random() - 0.5;
  }
  return array.sort(compareRandom);
};

var getRandomItemsFromArray = function (array) {
  var arrayCopy = array.slice();
  arrayCopy.length = getRandomInRange(1, arrayCopy.length + 1);
  shuffleArray(arrayCopy);

  return arrayCopy;
};

var getAdverts = function (advertsCount) {
  var adverts = [];
  for (var i = 0; i < advertsCount; i++) {

    var x = getRandomInRange(40, 1200);
    var y = getRandomInRange(130, 630);

    var advert =
    {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: getRandomItemFromArray(TITLES),
        address: x + ',' + y,
        price: getRandomInRange(1000, 1000000),
        type: getRandomItemFromArray(TYPES),
        rooms: getRandomInRange(1, 5),
        guests: getRandomInRange(1, 5),
        checkin: getRandomItemFromArray(CHECKINS),
        checkout: getRandomItemFromArray(CHECKINS),
        features: getRandomItemsFromArray(FEATURES),
        description: '',
        photos: shuffleArray(PHOTOS)
      },

      location: {
        x: x, // координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: y// координата y метки на карте от 130 до 630.
      }
    };
    adverts.push(advert);
  }
  return adverts;
};

var activeState = document.querySelector('.map');
activeState.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');// here insert array with adverts
var similarAdvertTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var randomAdvert = getAdverts(8);// array with 8 adverts

var renderAdvert = function (advert) {
  var advertElement = similarAdvertTemplate.cloneNode(true);

  advertElement.style.left = (advert.location.x - PIN_WIDTH) + 'px';
  advertElement.style.top = (advert.location.y - PIN_HEIGHT) + 'px';
  advertElement.querySelector('img').src = advert.author.avatar;
  advertElement.querySelector('img').alt = advert.offer.title;

  return advertElement;
};

var renderAdvertsList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomAdvert.length; i++) {
    fragment.appendChild(renderAdvert(randomAdvert[i]));
  }
  return fragment;
};

similarListElement.appendChild(renderAdvertsList());

var similarListComponent = document.querySelector('.map');// here insert
var nextSibling = document.querySelector('.map__filters-container');
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderCard = function (advert) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HouseTypeDictionary[advert.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

  var listItem = cardElement.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();
  listItem.innerHTML = '';
  for (var i = 0; i < advert.offer.features.length; i++) {
    var item = document.createElement('li');
    item.classList.add('popup__feature');
    item.classList.add('popup__feature--' + advert.offer.features[i]);
    fragment.appendChild(item);
  }
  listItem.appendChild(fragment);

  var listPhoto = cardElement.querySelector('.popup__photos');
  listPhoto.innerHTML = '';
  for (i = 0; i < advert.offer.photos.length; i++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');

    photo.src = advert.offer.photos[i];
    photo.width = PHOTO_WIDTH;
    photo.height = PHOTO_HEIGHT;
    photo.alt = PHOTO_ALT;

    fragment.appendChild(photo);
  }
  listPhoto.appendChild(fragment);

  return cardElement;
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomAdvert.length; i++) {
    fragment.appendChild(renderCard(randomAdvert[i]));
  }
  return fragment;
};

similarListComponent.insertBefore(renderElements(), nextSibling);
