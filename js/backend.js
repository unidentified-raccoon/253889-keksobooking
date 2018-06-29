'use strict';

// Создайте модуль backend.js, который экспортирует в глобальную область видимости функции для взаимодействия с удаленным севером через XHR.

// получать с сервера данные с помощью объекта XMLHttpRequest,
// обрабатывать полученные запросы и передавать полученную информацию в функцию обратного вызова;
// отправлять данные на сервер.

// Функция получения данных с сервера должна принимать на вход следующие параметры:
// onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса.
// При вызове функции onLoad в её единственный параметр передаётся набор полученных данных;
// onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
// При вызове функции onError в её единственный параметр передаётся сообщение об ошибке.
(function () {
  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

    xhr.addEventListener('load', function () {

      try {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Answer status: ' + xhr.status + ' ' + xhr.statusText);
        }
      } catch (err) {
        onError(err.name + ': ' + err.message);
      }
    });
    xhr.send();

  }
  // Функция для отправки данных на сервер должна принимать на вход следующие параметры:
  // data — объект FormData, который содержит данные формы, которые будут отправлены на сервер;
  // onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса;
  // onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
  // При вызове функции onError в её единственный параметр передается сообщение об ошибке или объект с описанием ошибки полученный с сервера.
  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://js.dump.academy/keksobooking');

    xhr.addEventListener('load', function (evt) {
      var target = evt.target;

      try {
        if (target.status === 200) {
          onLoad();
        } else {
          onError(evt.target.status);
        }
      } catch (err) {
        onError(err);
      }
    });
    xhr.send();

  };

  // модуль экспортирует в глобальную область видимости функции для взаимодействия с удаленным севером через XHR.
  window.backend = {
    load: load,
    upload: upload
  };

})();
