'use strict';

(function () {
  var USER_ID = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPE = ['flat', 'house', 'bungalo', 'palace'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function pickRandomUniqueItem(items) {
    var removedItem = items.splice(getRandomInt(0, items.length), 1);
    return removedItem.toString();
  }

  function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomElement(array) {
    return array[getRandomInt(0, array.length)];
  }

  function getRandomElements(array) {
    shuffleArray(array);
    var randomElements = array.slice(0, getRandomInt(0, array.length));
    return randomElements;
  }

  // shuffling and returning a string
  function shuffleArray(array) {
    var arrayCopy = array.slice();
    var counter = arrayCopy.length;

    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);

      counter--;

      var temp = arrayCopy[counter];
      arrayCopy[counter] = arrayCopy[index];
      arrayCopy[index] = temp;
    }
    return arrayCopy;
  }

  window.apartmentCards = [];
  for (var i = 0; i < USER_ID.length; i++) {
    var location = {
      x: getRandomInt(900, 300),
      y: getRandomInt(500, 100)
    };

    var card = {
      author: {
        avatar: 'img/avatars/user' + USER_ID[i] + '.png'
      },
      offer: {
        title: pickRandomUniqueItem(OFFER_TITLE),
        address: location.x + ',' + location.y,
        price: getRandomInt(1000000, 1000),
        type: getRandomElement(OFFER_TYPE),
        rooms: getRandomInt(6, 1),
        guests: getRandomInt(11, 1),
        checkin: getRandomElement(OFFER_CHECKIN),
        checkout: getRandomElement(OFFER_CHECKOUT),
        features: getRandomElements(OFFER_FEATURES),
        description: '',
        photos: shuffleArray(OFFER_PHOTOS)
      },
      location: location
    };

    window.apartmentCards.push(card);
  }
})();
