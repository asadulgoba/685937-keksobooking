'use strict';

(function () {
  window.pin = function (advert, index) {
    var advertElement = window.similarAdvertTemplate.cloneNode(true);

    advertElement.style.left = (advert.location.x) + 'px';
    advertElement.style.top = (advert.location.y) + 'px';

    advertElement.querySelector('img').src = advert.author.avatar;
    advertElement.querySelector('img').alt = advert.offer.title;
    advertElement.dataset.id = index;


    advertElement.addEventListener('click', function () {

      var cardAdvert = document.querySelectorAll('.map__card');

      var hidecardAdvert = function () {
        for (var i = 0; i < cardAdvert.length; i++) {
          cardAdvert[i].classList.add('hidden');
        }
      };
      hidecardAdvert();

      cardAdvert[index].classList.remove('hidden');


      var buttonCardAdvertClose = cardAdvert[index].querySelector('.popup__close');
      buttonCardAdvertClose.addEventListener('click', function () {
        cardAdvert[index].classList.add('hidden');
      });

      var onCardAdvertEscPress = function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          cardAdvert[index].classList.add('hidden');
        }
      };
      document.addEventListener('keydown', onCardAdvertEscPress);
    });
    return advertElement;
  };

})();
