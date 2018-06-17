'use strict';

var USER_ID = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo', 'palace'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TYPES_RUS = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Крыша над головой',
  palace: 'Дворец'
};

(function () {
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

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var pinTemplate = document.querySelector('template').content;

var mapCardElement = pinTemplate.querySelector('.map__card');
var mapElement = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapPinsElement = document.querySelector('.map__pins');

function renderPin(offer, number) {
  var newElement = pinTemplate.querySelector('.map__pin').cloneNode(true);
  newElement.setAttribute('style', 'left: ' + (offer.location.x + PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y + PIN_HEIGHT) + 'px;');
  newElement.querySelector('img').setAttribute('src', offer.author.avatar);
  newElement.querySelector('img').setAttribute('alt', offer.offer.title);
  newElement.id = 'pin-' + number;


  return newElement;
}

var fragment = document.createDocumentFragment();
for (var l = 0; l < window.apartmentCards.length; l++) {
  fragment.appendChild(renderPin(window.apartmentCards[l], l));
}

mapPinsElement.appendChild(fragment);

function renderCard(offer) {
  var newPopupElement = mapCardElement.cloneNode(true);
  newPopupElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  newPopupElement.querySelector('.popup__title').textContent = offer.offer.title;
  newPopupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  newPopupElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  newPopupElement.querySelector('.popup__type').textContent = OFFER_TYPES_RUS[offer.offer.type];
  newPopupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  newPopupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  newPopupElement.querySelector('.popup__description').textContent = offer.offer.description;

  renderPhotoBlock(newPopupElement, offer.offer.photos);
  renderFeatureIcons(newPopupElement, offer.offer.features);

  return newPopupElement;
}

var offerCard = document.createDocumentFragment();

// offerCard.appendChild(renderCard(window.apartmentCards[1]));
// mapElement.insertBefore(offerCard, mapFiltersContainer);

// 1. Создать функцию добавления фоток (передаем туда newPopupElement)
function renderPhotoBlock(element, photos) {
// 2. создать переменную photosElement
  var photosElement = element.querySelector('.popup__photos');
  // 3. создать переменную photoTemplate
  var photoTemplate = photosElement.querySelector('img').cloneNode(true);
  // 4. очистить от детей photosElement ( photosElement.innerHTML = ''; )
  photosElement.innerHTML = '';
  // 5.  обход цикла offer.offer.photos
  for (var j = 0; j < photos.length; j++) {
  // 6. в цикле клонируем photoTemplate
    var photoElement = photoTemplate.cloneNode(true);
    // 7. задаем src
    photoElement.setAttribute('src', photos[j]);
    // 8. делаем append в photosElement
    photosElement.appendChild(photoElement);
  }
}

// 1. Create a function for feature icons render (newPopupElement, icons)
function renderFeatureIcons(element, icons) {
// 2. Create variable featureIconsElement (.popup__features)
  var featureIconsElement = element.querySelector('.popup__features');
  // 2.1 Remove innerHTML from featureIconsElement
  featureIconsElement.innerHTML = '';
  // 3. Create cycle for(){}
  for (var f = 0; f < icons.length; f++) {
    // 4. Create variable featureIconElement (li element with class {{popup__feature popup__feature--{{offer.feature}}}})
    var featureIconElement = document.createElement('li');
    featureIconElement.className = 'popup__feature popup__feature--' + icons[f];
    // 5. featureIconsElement.appendChild(featureIconElement)
    featureIconsElement.appendChild(featureIconElement);
  }
}

// ---------------------

// disabling forms
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');

formFieldsets.disabled = true;

// нужно добавить обработчик события mouseup на элемент .map__pin--main.
// Обработчик  события mouseup должен вызывать функцию, которая будет отменять
// изменения DOM-элементов, описанные в пункте «Неактивное состояние» технического задания.
var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');

var formAddressField = form.querySelector('#address');

function activateMap() {
  map.classList.remove('map--faded');
}

function activateForm() {
  form.classList.remove('ad-form--disabled');
  formFieldsets.disabled = false;
}
// в обработчике события mouseup на элементе метки,
// кроме вызова метода, переводящего страницу в активное состояние,
// должен находиться вызов метода, который устанавливает значения поля ввода
// адреса
function getActivePinLocation(evt) {
  formAddressField.value = evt.clientX + ' , ' + evt.clientY;
}

pinMain.addEventListener('mouseup', function () {
  activateMap();
  activateForm();
  getActivePinLocation();
});

// Нажатие на метку похожего объявления на карте, приводит
// к показу карточки с подробной информацией об этом объявлении

mapElement.addEventListener('click', onPinClick);

function onPinClick(evt) {
  var target = evt.target;
  evt.preventDefault();
  while (target !== mapElement) {
    if (target.className === 'map__pin') {
      var targetId = target.id.split('-')[1];
      replaceOfferPopup(targetId);
      return;
    }
  }
}

function replaceOfferPopup(activePinId) {
  offerCard.appendChild(renderCard(window.apartmentCards[activePinId]));
}
