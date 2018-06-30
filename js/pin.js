'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('template').content;

  function renderPin(offer, number) {
    var newElement = pinTemplate.querySelector('.map__pin').cloneNode(true);
    newElement.setAttribute('style', 'left: ' + (offer.location.x + PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y + PIN_HEIGHT) + 'px;');
    newElement.querySelector('img').setAttribute('src', offer.author.avatar);
    newElement.querySelector('img').setAttribute('alt', offer.offer.title);
    newElement.pinId = number;
    newElement.addEventListener('click', function () {
      window.map.replaceOfferPopup(offer);
    });

    return newElement;
  }

  window.renderPin = renderPin;
})();
