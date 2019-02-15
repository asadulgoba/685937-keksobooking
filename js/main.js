'use strict';

(function () {


  window.backend.load(function (adverts) {

    //  render pins/////////////////////////////////////////////////
    var renderAdvertsPins = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.ADVERTS_COUNT; i++) {
        fragment.appendChild(window.pin(adverts[i], i));
      }
      return fragment;
    };
    window.similarListElement.appendChild(renderAdvertsPins());

    window.pinAdvert = document.querySelectorAll('.map__pin');
    var hidePinAdvert = function () {
      for (var i = 1; i < window.ADVERTS_COUNT + 1; i++) {
        window.pinAdvert[i].classList.add('hidden');
      }
    };
    hidePinAdvert();
    //  renderк cards/////////////////////////////////////////////////
    var renderAdvertsCards = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.ADVERTS_COUNT; i++) {
        fragment.appendChild(window.card(adverts[i], i));
      }
      return fragment;
    };
    window.similarListComponent.insertBefore(renderAdvertsCards(), window.nextSibling);

    window.cardAdvert = document.querySelectorAll('.map__card');
    var hideCardAdvert = function () {
      for (var i = 0; i < window.ADVERTS_COUNT; i++) {
        window.cardAdvert[i].classList.add('hidden');
      }
    };
    hideCardAdvert();
  });
})();
