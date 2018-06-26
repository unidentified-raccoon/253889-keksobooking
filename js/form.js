'use strict';

(function () {
  var checkInField = document.querySelector('#timein');
  var checkOutField = document.querySelector('#timeout');
  var apartmentTypeField = document.querySelector('#type');
  var minPriceField = document.querySelector('#price');
  var numberOfRoomsField = document.querySelector('#room_number');
  var numberOfGuestsField = document.querySelector('#capacity');

  var typeOfPriceDependency = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  roomsGuestsValidation();
  setMinimalPrice();

  // min price/property-type dependencies
  function setMinimalPrice() {
    minPriceField.min = typeOfPriceDependency[apartmentTypeField.value];
    minPriceField.placeholder = typeOfPriceDependency[apartmentTypeField.value];
  }

  function roomsGuestsValidation() {
    if ((numberOfRoomsField.value === '1') && (numberOfGuestsField.value !== '1')) {
      numberOfGuestsField.setCustomValidity('One room is suited only for one guest');
    } else if ((numberOfRoomsField.value === '2') && (numberOfGuestsField.value !== '1') && (numberOfGuestsField.value !== '2')) {
      numberOfGuestsField.setCustomValidity('Two rooms are suited only for one or two guests');
    } else if ((numberOfRoomsField.value === '3') && (numberOfGuestsField.value !== '1') && (numberOfGuestsField.value !== '2') && (numberOfGuestsField.value !== '3')) {
      numberOfGuestsField.setCustomValidity('Three rooms are suited only for one, two or three guests');
    } else if ((numberOfRoomsField.value === '100') && (numberOfGuestsField !== '0')) {
      numberOfGuestsField.setCustomValidity('Too many rooms to have any guests. Please choose another number of rooms');
    } else {
      numberOfGuestsField.setCustomValidity('');
    }
  }

  function checkTime(evt) {
    checkInField.value = checkOutField.value = evt.target.value;
  }

  checkInField.addEventListener('change', checkTime);
  checkOutField.addEventListener('change', checkTime);

  apartmentTypeField.addEventListener('change', setMinimalPrice);

  numberOfRoomsField.addEventListener('change', roomsGuestsValidation);
  numberOfGuestsField.addEventListener('change', roomsGuestsValidation);

})();
