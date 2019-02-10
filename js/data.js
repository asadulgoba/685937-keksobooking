'use strict';

(function () {
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

      var x = getRandomInRange(0, window.similarListElement.offsetWidth);
      var y = getRandomInRange(130, 630);

      var advert =
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: getRandomItemFromArray(window.TITLES),
          address: x + ',' + y,
          price: getRandomInRange(1000, 1000000),
          type: getRandomItemFromArray(window.TYPES),
          rooms: getRandomInRange(1, 5),
          guests: getRandomInRange(1, 5),
          checkin: getRandomItemFromArray(window.CHECKINS),
          checkout: getRandomItemFromArray(window.CHECKINS),
          features: getRandomItemsFromArray(window.FEATURES),
          description: '',
          photos: shuffleArray(window.PHOTOS)
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

  window.randomAdvert = getAdverts(window.ADVERTS_COUNT);

})();
