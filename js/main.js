'use strict';

(function () {

//render pins Adverts
  var renderAdvertsPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.randomAdvert.length; i++) {
      fragment.appendChild(window.pin(window.randomAdvert[i], i));
    }
    return fragment;
  };
  window.similarListElement.appendChild(renderAdvertsPins());

  // render cards
  var renderAdvertsCards = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.randomAdvert.length; i++) {
      fragment.appendChild(window.card(window.randomAdvert[i], i));
    }
    return fragment;
  };
  window.similarListComponent.insertBefore(renderAdvertsCards(), window.nextSibling);


  window.pinAdvert = document.querySelectorAll('.map__pin');
  window.cardAdvert = document.querySelectorAll('.map__card');

  var hidePinAdvert = function () {
    for (var i = 1; i < window.pinAdvert.length; i++) {
      window.pinAdvert[i].classList.add('hidden');
    }
  };
  hidePinAdvert();

  var hideCardAdvert = function () {
    for (var i = 0; i < window.cardAdvert.length; i++) {
      window.cardAdvert[i].classList.add('hidden');
    }
  };
  hideCardAdvert();

})();
