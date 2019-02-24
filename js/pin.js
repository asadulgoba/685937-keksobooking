'use strict';

(function () {
  var createPinElement = function (advert, index) {
    var advertElement = window.similarAdvertTemplate.cloneNode(true);

    advertElement.style.left = (advert.location.x) + 'px';
    advertElement.style.top = (advert.location.y) + 'px';

    advertElement.querySelector('img').src = advert.author.avatar;
    advertElement.querySelector('img').alt = advert.offer.title;
    advertElement.dataset.id = index;


    advertElement.addEventListener('click', function () {

      window.cardAdvert = document.querySelectorAll('.map__card');
      var hidecardAdvert = function () {
        for (var i = 0; i < window.cardAdvert.length; i++) {
          window.cardAdvert[i].classList.add('hidden');
        }
      };
      hidecardAdvert();

      window.cardAdvert[index].classList.remove('hidden');


      var buttonCardAdvertClose = window.cardAdvert[index].querySelector('.popup__close');
      buttonCardAdvertClose.addEventListener('click', function () {
        window.cardAdvert[index].classList.add('hidden');
      });

      var onCardAdvertEscPress = function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          window.cardAdvert[index].classList.add('hidden');
        }
      };
      document.addEventListener('keydown', onCardAdvertEscPress);
    });


    return advertElement;
  };

  //  render pins/////////////////////////////////////////////////

  window.renderPins = function (data) {
    var renderAdvertsPins = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(createPinElement(data[i], i));
      }
      return fragment;
    };
    window.similarListElement.appendChild(renderAdvertsPins());

    var pinAdvert = document.querySelectorAll('.map__pin');
    var hidePinAdvert = function () {
      for (var i = 1; i < data.length + 1; i++) {
        pinAdvert[i].classList.add('hidden');
      }
    };
    hidePinAdvert();

  };
})();
