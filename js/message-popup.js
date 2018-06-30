'use strict';

(function () {
  function popupTimeoutClose(popup) {
    setTimeout(function () {
      popup.remove();
    }, 3000);
  }

  function errorHandler(errorMassage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; padding-top: 84px; border-radius: 16px; background: rgba(255, 153, 0, 0.8);';
    node.style.position = 'fixed';
    node.style.width = '200px';
    node.style.height = '200px';
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.fontSize = '16px';

    node.textContent = errorMassage;
    document.body.insertAdjacentElement('afterbegin', node);
    popupTimeoutClose(node);
  }

  window.errorHandler = errorHandler;
})();
