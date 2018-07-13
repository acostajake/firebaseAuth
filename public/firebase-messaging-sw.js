(function () {

    console.log('service worker file')

    importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js");
    importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js");

    firebase.initializeApp({"messagingSenderId": 590983170059});

})();

const messaging = firebase.messaging();