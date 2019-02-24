'use strict';

(function () {
  var createCardElement = function (advert, index) {
    var cardElement = window.similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = advert.offer.title;

    cardElement.querySelector('.popup__text--address').textContent = (advert.location.x + window.PIN_WIDTH / 2) + ', ' + (advert.location.y + window.PIN_HEIGHT);
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.HouseTypeDictionary[advert.offer.type];
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
        photo.width = window.PHOTO_WIDTH;
        photo.height = window.PHOTO_HEIGHT;
        photo.alt = window.PHOTO_ALT;
        fragment.appendChild(photo);
      }
      return fragment;
    };
    listPhoto.appendChild(createAdvertImages(advert.offer.photos));

    return cardElement;
  };


  //  render cards/////////////////////////////////////////////////
  window.renderCards = function (data) {
    var renderAdvertsCards = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(createCardElement(data[i], i));
      }
      return fragment;
    };
    window.similarListComponent.insertBefore(renderAdvertsCards(), window.nextSibling);

    window.cardAdvert = document.querySelectorAll('.map__card');
    var hideCardAdvert = function () {
      for (var i = 0; i < data.length; i++) {
        window.cardAdvert[i].classList.add('hidden');
      }
    };
    hideCardAdvert();
  };
})();
