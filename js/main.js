'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ADVERTS_COUNT = 8;

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

var similarListElement = document.querySelector('.map__pins');// here insert pins-adverts
var similarAdvertTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarListComponent = document.querySelector('.map');// here insert
var nextSibling = document.querySelector('.map__filters-container');
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var getRandomItemFromArray = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var shuffleArray = function (array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
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

    var x = getRandomInRange(50, 1100);
    var y = getRandomInRange(130, 600);

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

var randomAdvert = getAdverts(ADVERTS_COUNT);



//     // if (elem) {
//       console.log(elem);
//       console.log(similarListComponent);
//       // elem.parentNode.removeChild(elem);

//     // }

// advertElement = evt.currentTarget;
    // similarListComponent.removeChild(updateCard(randomAdvert[evt.currentTarget.dataset.id]));

    // similarListComponent.insertBefore(updateCard(randomAdvert[evt.currentTarget.dataset.id]), nextSibling);




var renderAdvert = function (advert, index) {
  var advertElement = similarAdvertTemplate.cloneNode(true);

  advertElement.style.left = (advert.location.x + PIN_WIDTH / 2) + 'px';
  advertElement.style.top = (advert.location.y + PIN_HEIGHT) + 'px';
  advertElement.querySelector('img').src = advert.author.avatar;
  advertElement.querySelector('img').alt = advert.offer.title;
  advertElement.dataset.id = index;
  advertElement.addEventListener('click', function(evt) {

    var cardAdvert = document.querySelectorAll('.map__card');

    for (var i = 0; i < cardAdvert.length; i++) {
      if (!cardAdvert[i].classList.contains('hidden')) {
      cardAdvert[i].classList.add('hidden');
      }
    }
    cardAdvert[evt.currentTarget.dataset.id].classList.remove('hidden');
  });

  return advertElement;
};


// var buttonCardAdvertClose = document.querySelector('.popup__close');

// buttonCardAdvertClose.addEventListener('click', function () {

// })






var renderAdvertsPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomAdvert.length; i++) {
    fragment.appendChild(renderAdvert(randomAdvert[i], i))
  }
  return fragment;
};

var updateCard = function (advert, index) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HouseTypeDictionary[advert.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  cardElement.dataset.id = index;

  var fragment = document.createDocumentFragment();

  var listItem = cardElement.querySelector('.popup__features');
  listItem.innerHTML = '';
  var createAdvertFeatures = function (features) {
    for (var i = 0; i < features.length; i++) {
      var item = document.createElement('li');
      item.classList.add('popup__feature');
      item.classList.add('popup__feature--' + features[i]);
      fragment.appendChild(item);
    }
    return fragment;
  };
  listItem.appendChild(createAdvertFeatures(advert.offer.features));

  var listPhoto = cardElement.querySelector('.popup__photos');
  listPhoto.innerHTML = '';
  var createAdvertImages = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = photos[i];
      photo.width = PHOTO_WIDTH;
      photo.height = PHOTO_HEIGHT;
      photo.alt = PHOTO_ALT;
      fragment.appendChild(photo);
    }
    return fragment;
  };
  listPhoto.appendChild(createAdvertImages(advert.offer.photos));

  return cardElement;
};


var renderAdvertsCards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomAdvert.length; i++) {
    fragment.appendChild(updateCard(randomAdvert[i], i))
  }
  return fragment;
};


var activeState = document.querySelector('.map');

var formAdvert = document.querySelector('.ad-form');
var fieldSetAdvert = document.querySelectorAll('.ad-form fieldset');

var disableFieldSetAdvert = function () {
  for (var i = 0; i < fieldSetAdvert.length; i++) {
  fieldSetAdvert[i].setAttribute("disabled", "disabled");
}
};

disableFieldSetAdvert();

var enableFieldSetAdvert = function () {
  for (var i = 0; i < fieldSetAdvert.length; i++) {
  fieldSetAdvert[i].removeAttribute("disabled", "disabled");
  }
};

var initialPinButton = document.querySelector('.map__pin--main');

var formAdress = document.querySelector('#address');  // insert here adress

var coordinatePin = document.querySelector('.map__pin--main')



initialPinButton.addEventListener('mouseup', function () {

  similarListElement.appendChild(renderAdvertsPins());
  similarListComponent.insertBefore(renderAdvertsCards(), nextSibling);

  var cardAdvert = document.querySelectorAll('.map__card');
  var hidecardAdvert = function () {
    for (var i = 0; i < cardAdvert.length; i++) {
      cardAdvert[i].classList.add('hidden');
    }
  };
  hidecardAdvert();

  activeState.classList.remove('map--faded');
  formAdvert.classList.remove('ad-form--disabled');
  enableFieldSetAdvert();
  formAdress.value = +coordinatePin.style.left.replace(/\D+/g, "") + PIN_WIDTH/2 + ', ' + coordinatePin.style.top.replace(/\D+/g, "");

}, {once : true});

