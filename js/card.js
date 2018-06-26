'use strict';

(function () {
  // ------pinTamplate is used in several files (card, pin)
  var pinTemplate = document.querySelector('template').content;

  var ENTER_KEYCODE = 13;

  var OFFER_TYPES_RUS = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Крыша над головой',
    palace: 'Дворец'
  };

  var mapCardElement = pinTemplate.querySelector('.map__card');

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
    newPopupElement.querySelector('.popup__close').addEventListener('click', function () {
      window.closePopup();
    });
    newPopupElement.querySelector('.popup__close').addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.closePopup();
      }
    });

    renderPhotoBlock(newPopupElement, offer.offer.photos);
    renderFeatureIcons(newPopupElement, offer.offer.features);

    return newPopupElement;
  }

  // function to render photos in renderCard
  // creating renderPhotoBlock function with parameter (newPopupElement)
  function renderPhotoBlock(element, photos) {
  // 2. create a variable (photosElement)
    var photosElement = element.querySelector('.popup__photos');
    // 3. create a variable (photoTemplate)
    var photoTemplate = photosElement.querySelector('img').cloneNode(true);
    // 4. remove all children from photosElement ( photosElement.innerHTML = ''; )
    photosElement.innerHTML = '';
    // 5.  create cycle for  (offer.offer.photos)
    for (var j = 0; j < photos.length; j++) {
    // 6. in cycle clone photoTemplate
      var photoElement = photoTemplate.cloneNode(true);
      // 7. call out 'src' attribute
      photoElement.setAttribute('src', photos[j]);
      // 8. append (photoElement) in  photosElement
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

  window.renderCard = renderCard;
})();
