var config = {
  apiKey: "AIzaSyDKfZzhjx8rFsbnIyxZ07YIe6BmHLlMMeM",
  authDomain: "fir-auth-42327.firebaseapp.com",
  databaseURL: "https://fir-auth-42327.firebaseio.com",
  projectId: "fir-auth-42327",
  storageBucket: "fir-auth-42327.appspot.com",
  messagingSenderId: "590983170059"
};
firebase.initializeApp(config);

(function () {

  const user = document.getElementById('user')
  const password = document.getElementById('password')
  const googleSignup = document.getElementById('googleSignup')
  const googleLogin = document.getElementById('googleLogin')

  googleLogin.addEventListener('click', e => {
    const email = user.value;
    const pass = password.value;
    const auth = firebase.auth();
    const fbLogin = auth.signInWithEmailAndPassword(email, pass);
    fbLogin.catch(e => console.log(e.message))
    console.log('logged in ' + email, pass)
  })

  googleSignup.addEventListener('click', e => {
    const email = user.value;
    const pass = password.value;
    const auth = firebase.auth();
    const fbLogin = auth.createUserWithEmailAndPassword(email, pass);
    fbLogin.catch(e => console.log(e.message));
    console.log('logged in ' + email, pass)
  })
  
})();
(console.log('testtest'))

let id = Math.floor(Math.random() * 100);
document.getElementById('username').innerhtml = 'Guest' + id;

function push() {
  let message = document.getElementById('message').value;
  firebase.database().ref().child('posts').push({ id: id, message: message });
  console.log('Push func successful!')
  document.getElementById('message').value = ''
}

let commentsRef = firebase.database().ref('posts');
commentsRef.on('child_added', function (data) {
  displayMessage(data.val());
})

function displayMessage(data) {
  let messages = document.getElementById('messages');
  let newMessage = 'Guest' + data.id + ': ' + data.message;
  newMessage = '<div>' + newMessage + '</div>';
  messages.innerHTML = messages.innerHTML + newMessage;
}

const messaging = firebase.messaging();

messaging.usePublicVapidKey('BAi-JzpYgbK4ccb5YlZRiLY29wC5oAMF43X9T_iRUhGicvGZS4WQe980JHh_v524UiILxUYsW8fqDJpcTGsrFo0');

messaging.requestPermission()
  .then(function () {
        return messaging.getToken()
      })
      .then(function(token) {
        console.log('token: ', token)
      })
      .catch(function (err) {
        console.log('no msging permission')
      })

messaging.onMessage(function(payload) {
  console.log('onMessage :', payload)
})