'use strict';

var AVATAR_CONST = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var TITLE_CONST = ['"Большая уютная квартира"', '"Маленькая неуютная квартира"', '"Огромный прекрасный дворец"',
'"Маленький ужасный дворец"', '"Красивый гостевой домик"', '"Некрасивый негостеприимный домик"',
'"Уютное бунгало далеко от моря"', '"Неуютное бунгало по колено в воде"'];

var TYPE_CONST = ['palace', 'flat', 'house','bungalo'];

var CHECKIN_CONST = ['12:00', '13:00', '14:00'];

var FEATURES_CONST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS_CONST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];//  расположенных в произвольном порядке


var getRandomFromArray = function (items) {
  var item = items[Math.floor(Math.random() * items.length)];
  return item;
};

var getRandomFromNumbers = function (min, max) {
  var number = Math.floor(Math.random() * (max - min)) + min;
  return number;
};

var getArrayRandomLength = function (array) {
  var length = array.length;
  array.length = getRandomFromNumbers(1, length + 1)
  return array;
};

var getArrayRandomOrder = function(array) {
  function compareRandom() {

  return Math.random() - 0.5;
}
array.sort(compareRandom);
return array;
};

var getAdverts = function(advertsCount) {
  var adverts = [];
  for (var i = 0; i < advertsCount; i++) {
    var advert =
    {
      author: {
        avatar: getRandomFromArray(AVATAR_CONST)
      },

      offer: {
        title: getRandomFromArray(TITLE_CONST),
        address: '600, 350',
        price: getRandomFromNumbers(1000, 1000000),
        type: getRandomFromArray(TYPE_CONST),
        rooms: getRandomFromNumbers(1, 5),
        guests: getRandomFromNumbers(1, 5),
        checkin: getRandomFromArray(CHECKIN_CONST),
        checkout: getRandomFromArray(CHECKIN_CONST),
        features: getArrayRandomLength(FEATURES_CONST),
        description: '',
        photos: getArrayRandomOrder(PHOTOS_CONST)
      },

      location: {
        x: getRandomFromNumbers(130,630),// координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: getRandomFromNumbers(130, 630)// координата y метки на карте от 130 до 630.
      }
    }
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



  // advertElement.querySelector('.map__pin').style.left = advert.location.x;
  // advertElement.querySelector('.map__pin').style.top = advert.location.y;

  advertElement.querySelector('img').src = advert.author.avatar;
  advertElement.querySelector('img').alt = advert.offer.title;

  return advertElement;
};

var renderList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomAdvert.length; i++) {
    fragment.appendChild(renderAdvert(randomAdvert[i]));
  }
  return fragment;
};

similarListElement.appendChild(renderList());



// <template id="pin">
// <button type="button" class="map__pin" style="left: 200px; top: 400px;">
// <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления"></button>




