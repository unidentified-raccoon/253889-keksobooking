'use strict';

var AVATAR_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08'];
var APARTMENT_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APARTMENT_TYPE = ['flat', 'house', 'bungalo'];
var APARTMENT_CHECKIN = ['12:00', '13:00', '14:00'];
var APARTMENT_CHECKOUT = ['12:00', '13:00', '14:00'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomRangeNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomElements = function (array) {
  shuffleArray(array);
  var randomElements = array.slice(0, Math.floor(Math.random() * array.length) + 1);
  return randomElements;
};

// shuffling and returning a string
var shuffleArray = function shuffle(array) {
  var counter = array.length;

  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);

    counter--;

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
};

window.apartmentCards = [];
for (var i = 0; i < 8; i++) {
  var card = {
    author: {
      avatar: 'img/avatars/user' + AVATAR_NUMBER[i] + '.png'
    },
    offer: {
      title: APARTMENT_TITLE[i],
      price: getRandomRangeNumber(1000000, 1000),
      type: getRandomElement(APARTMENT_TYPE),
      rooms: getRandomRangeNumber(6, 1),
      guests: getRandomRangeNumber(11, 1),
      checkin: getRandomElement(APARTMENT_CHECKIN),
      checkout: getRandomElement(APARTMENT_CHECKOUT),
      features: getRandomElements(APARTMENT_FEATURES, AVATAR_NUMBER),
      description: '',
      photos: shuffleArray(APARTMENT_PHOTOS)
    },
    location: {
      x: getRandomRangeNumber(900, 300),
      y: getRandomRangeNumber(500, 100)
    }
  };

  card.offer.address = card.location.x + ',' + card.location.y;
  window.apartmentCards.push(card);
}
