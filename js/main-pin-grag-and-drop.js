'use strict';

(function () {
  window.initialPinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var limitValue = function (number, minValue, maxValue) {
        var val = Math.min(maxValue, Math.max(minValue, number));
        return val;
      };

      var clientX = limitValue(moveEvt.pageX, window.similarListComponent.offsetLeft + 35, window.similarListElement.offsetWidth + window.similarListComponent.offsetLeft - 35);
      var clientY = limitValue(moveEvt.pageY, 130, 630);
      var shift = {
        x: startCoords.x - clientX,
        y: startCoords.y - clientY
      };

      startCoords = {
        x: clientX,
        y: clientY
      };

      window.initialPinButton.style.top = (window.initialPinButton.offsetTop - shift.y) + 'px';
      window.initialPinButton.style.left = (window.initialPinButton.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var showPinAdvert = function () {
        for (var i = 1; i < window.pinAdvert.length; i++) {
          window.pinAdvert[i].classList.remove('hidden');
        }
      };

      if (dragged) {
        showPinAdvert();
        window.activeState.classList.remove('map--faded');
        window.formAdvert.classList.remove('ad-form--disabled');
        window.enableFieldSetAdvert();
        window.renderFormAdress();
        window.changePriceAdvertSelect();
        window.changeCapacitySelect();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
