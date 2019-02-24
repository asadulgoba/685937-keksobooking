'use strict';

(function () {

  var pinsAdverts = [];
  var filteredAdverts = [];

  var filterHousingType = document.getElementById('housing-type');
  var filterHousingPrice = document.getElementById('housing-price');
  var filterHousingRooms = document.getElementById('housing-rooms');
  var filterHousingGuests = document.getElementById('housing-guests');

  var filterWifi = document.getElementById('filter-wifi');
  var filterDishwasher = document.getElementById('filter-dishwasher');
  var filterParking = document.getElementById('filter-parking');
  var filterWasher = document.getElementById('filter-washer');
  var filterElevator = document.getElementById('filter-elevator');
  var filterConditioner = document.getElementById('filter-conditioner');


  var updateAdverts = function () {

    if (filterHousingType.value === 'any') {
      filteredAdverts = pinsAdverts;
    } else {
      filteredAdverts = pinsAdverts.filter(function (it) {
        return it.offer.type === filterHousingType.value;
      });
    }

    if (filterHousingPrice.value === 'any') {
      filteredAdverts = filteredAdverts;
    } else if (filterHousingPrice.value === 'middle') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.price >= 10000 & it.offer.price <= 50000);
      });
    } else if (filterHousingPrice.value === 'low') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.price < 10000);
      });
    } else if (filterHousingPrice.value === 'high') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.price > 50000);
      });
    }

    if (filterHousingRooms.value === 'any') {
      filteredAdverts = filteredAdverts;
    } else if (filterHousingRooms.value === '1') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.rooms === 1);
      });
    } else if (filterHousingRooms.value === '2') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.rooms === 2);
      });
    } else if (filterHousingRooms.value === '3') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.rooms === 3);
      });
    }

    if (filterHousingGuests.value === 'any') {
      filteredAdverts = filteredAdverts;
    } else if (filterHousingGuests.value === '2') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.guests === 2);
      });
    } else if (filterHousingGuests.value === '1') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.guests === 1);
      });
    } else if (filterHousingGuests.value === '0') {
      filteredAdverts = filteredAdverts.filter(function (it) {
        return (it.offer.guests === 0);
      });
    }

    var checkFilter = function (filter, type) {
      if (filter.checked) {
        filteredAdverts = filteredAdverts.filter(function (it) {
          for (var i = 0; i < it.offer.features.length; i++) {
            if (it.offer.features[i] === type) {
              return (it.offer.features[i]);
            }
          }
        });
      }
    };
    checkFilter(filterWifi, 'wifi');
    checkFilter(filterDishwasher, 'dishwasher');
    checkFilter(filterParking, 'parking');
    checkFilter(filterWasher, 'washer');
    checkFilter(filterElevator, 'elevator');
    checkFilter(filterConditioner, 'conditioner');

    window.renderPins(filteredAdverts);
    window.renderCards(filteredAdverts);

  };

  var successHandler = function (data) {

    pinsAdverts = data;

    updateAdverts();

    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.fontSize = '30px';
    node.textContent = 'Данные формы успешно загружены';
    document.body.insertAdjacentElement('afterbegin', node);
    var removeNode = function () {
      var nodeR = document.querySelector('div');
      nodeR.parentNode.removeChild(nodeR);
    };
    setTimeout(removeNode, 3000);
  };

  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var errorWindow = errorTemplate.cloneNode(true);
  var errorMessage = errorWindow.querySelector('.error__message');
  var errorButton = errorWindow.querySelector('.error__button');

  var errorHandler = function () {
    errorMessage.textContent = 'Ошибка загрузки данных с сервера';
    document.body.insertAdjacentElement('afterbegin', errorWindow);
  };

  errorButton.addEventListener('click', function () {
    errorWindow.classList.add('hidden');
  });


  window.backend.load(successHandler, errorHandler);


  var removePinAdvert;
  var removecardAdvert;


  var debounce = function () {
    removePinAdvert();
    removecardAdvert();
    updateAdverts();
    var pinAdvert = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinAdvert.length; i++) {
      pinAdvert[i].classList.remove('hidden');
    }
  };

  var lastTimeout;
  var filterAdverts = function (type) {
    type.addEventListener('change', function () {

      removePinAdvert = function () {
        var pinAdvert = document.querySelectorAll('.map__pin');
        for (var i = 1; i < pinAdvert.length; i++) {
          pinAdvert[i].parentNode.removeChild(pinAdvert[i]);
        }
      };

      removecardAdvert = function () {
        for (var i = 0; i < window.cardAdvert.length; i++) {
          window.cardAdvert[i].parentNode.removeChild(window.cardAdvert[i]);
        }
      };

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(debounce, 500);

    });
  };

  filterAdverts(filterHousingType);
  filterAdverts(filterHousingPrice);
  filterAdverts(filterHousingRooms);
  filterAdverts(filterHousingGuests);
  filterAdverts(filterWifi);
  filterAdverts(filterDishwasher);
  filterAdverts(filterParking);
  filterAdverts(filterWasher);
  filterAdverts(filterElevator);
  filterAdverts(filterConditioner);
})();
