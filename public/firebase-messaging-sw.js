console.log('service worker file')

importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js");


var config = {
    apiKey: "AIzaSyDKfZzhjx8rFsbnIyxZ07YIe6BmHLlMMeM",
    authDomain: "fir-auth-42327.firebaseapp.com",
    databaseURL: "https://fir-auth-42327.firebaseio.com",
    projectId: "fir-auth-42327",
    storageBucket: "fir-auth-42327.appspot.com",
    messagingSenderId: "590983170059"
  };
firebase.initializeApp(config);

//const messaging = firebase.messaging();