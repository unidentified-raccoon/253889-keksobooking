'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;// px
  var MAIN_PIN_HEIGHT = 84;// px
  var PIN_LOCATION_Y_MIN = 130; // px
  var PIN_LOCATION_Y_MAX = 630; // px
  var PIN_LOCATION_X_MIN = 0;
  var PIN_LOCATION_X_MAX = 1135; // px

  var ESC_KEYCODE = 27;

  var form = document.querySelector('.ad-form');
  var mapPinsElement = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapElement = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var formAddressField = form.querySelector('#address');
  var pinMain = document.querySelector('.map__pin--main');
  var formFieldsets = form.querySelectorAll('fieldset');


  // enabling/disabling form fieldsets
  function switchingFormFieldsetState(boolean) {
    for (var u = 0; u < formFieldsets.length; u++) {
      var formFieldsetElement = formFieldsets[u];
      formFieldsetElement.disabled = boolean;
    }
  }

  switchingFormFieldsetState(true);

  // function to render pins on mapPinsElement
  function renderPinsOnMap() {
    var fragment = document.createDocumentFragment();
    for (var l = 0; l < window.apartmentCards.length; l++) {
      fragment.appendChild(window.renderPin(window.apartmentCards[l], l));
    }

    mapPinsElement.appendChild(fragment);
  }

  // function to activate map (remove 'map--faded' class)
  function activateMap() {
    map.classList.remove('map--faded');
  }

  // function to activate form (remove 'ad-form--disabled' class)
  function activateForm() {
    form.classList.remove('ad-form--disabled');
    switchingFormFieldsetState(false);
  }

  // getting active mainPin location
  function getActivePinLocation(evt) {
    formAddressField.value = evt.clientX + (MAIN_PIN_WIDTH / 2) + ' , ' + (evt.clientY + MAIN_PIN_HEIGHT);
  }

  // rendering active offer card
  var offerCard;
  function replaceOfferPopup(offer) {
    if (offerCard) {
      offerCard.remove();
    }
    offerCard = window.renderCard(offer);
    mapElement.insertBefore(offerCard, mapFiltersContainer);
  }

  // closing popup
  function closePopup() {
    offerCard.remove();
  }

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  });

  // moving the pin var pinMain
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinLocationTopEdge = PIN_LOCATION_Y_MIN - MAIN_PIN_HEIGHT;
      var pinLocationBottomEdge = PIN_LOCATION_Y_MAX - MAIN_PIN_HEIGHT;
      var pinLocationLeftEdge = PIN_LOCATION_X_MIN;
      var pinLocationRightEdge = PIN_LOCATION_X_MAX;

      var top = pinMain.offsetTop - shift.y;
      var left = pinMain.offsetLeft - shift.x;

      if (top <= pinLocationTopEdge) {
        pinMain.style.top = pinLocationTopEdge + 'px';
      } else if (top >= pinLocationBottomEdge) {
        pinMain.style.top = pinLocationBottomEdge + 'px';
      } else if (left <= pinLocationLeftEdge) {
        pinMain.style.left = pinLocationLeftEdge + 'px';
      } else if (left >= pinLocationRightEdge) {
        pinMain.style.left = pinLocationRightEdge + 'px';
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

    }

    var isMapActive = false;

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      if (isMapActive === false) {
        activateMap(event);
        activateForm(event);
        renderPinsOnMap();
      }
      isMapActive = true;

      getActivePinLocation(event);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.replaceOfferPopup = replaceOfferPopup;
  window.closePopup = closePopup;
})();
