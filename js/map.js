'use strict';

var USER_ID = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pickRandomUniqueItem = function (items) {
  var removedItem = items.splice(getRandomInt(0, items.length), 1);
  return removedItem.toString();
};

var getRandomInt = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[getRandomInt(0, array.length)];
};

var getRandomElements = function (array) {
  shuffleArray(array);
  var randomElements = array.slice(0, getRandomInt(0, array.length));
  return randomElements;
};

// shuffling and returning a string
var shuffleArray = function shuffle(array) {
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
};

window.apartmentCards = [];
for (var i = 0; i < USER_ID.length; i++) {
  var card = {
    author: {
      avatar: 'img/avatars/user' + USER_ID[i] + '.png'
    },
    offer: {
      title: pickRandomUniqueItem(OFFER_TITLE),
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
    location: {
      x: getRandomInt(900, 300),
      y: getRandomInt(500, 100)
    }
  };

  card.offer.address = card.location.x + ',' + card.location.y;
  window.apartmentCards.push(card);
}

var pinHeight = 75;
var pinWidth = 56;

var pinTemplate = document.querySelector('template').content;

var mapPins = document.querySelector('.map__pins');

var renderPin = function (offer) {
  var newElement = pinTemplate.querySelector('.map__pin').cloneNode(true);
  newElement.setAttribute('style', 'left: ' + (offer.location.x + pinWidth / 2) + 'px; top: ' + (offer.location.y + pinHeight) + 'px;');
  newElement.querySelector('img').setAttribute('src', offer.author.avatar);
  newElement.querySelector('img').setAttribute('alt', offer.offer.title);

  return newElement;
};

var fragment = document.createDocumentFragment();
for (var l = 0; l < window.apartmentCards.length; l++) {
  fragment.appendChild(renderPin(window.apartmentCards[l]));
}

mapPins.appendChild(fragment);

// rendering offer popup
var translateToRus = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'house') {
    return 'Дом';
  }
  if (type === 'bungalo') {
    return 'Бунгало';
  } else {
    return 'Крыша над головой';
  }
};

var mapCard = pinTemplate.querySelector('.map__card');
var tokyoMap = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var renderCard = function (offer) {
  var newPopupElement = mapCard.cloneNode(true);
  newPopupElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  newPopupElement.querySelector('.popup__title').textContent = offer.offer.title;
  newPopupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  newPopupElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  newPopupElement.querySelector('.popup__type').textContent = translateToRus(offer.offer.type);
  newPopupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  newPopupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  newPopupElement.querySelector('.popup__features').textContent = offer.offer.features;
  newPopupElement.querySelector('.popup__description').textContent = offer.offer.description;

  return newPopupElement;
};

var offerCard = document.createDocumentFragment();

offerCard.appendChild(renderCard(window.apartmentCards[1]));
// tokyoMap.appendChild(offerCard);
mapFiltersContainer.insertAdjuscentHTML('beforebegin', tokyoMap.appendChild(offerCard));
