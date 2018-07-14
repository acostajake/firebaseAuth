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
  const chatName = document.getElementById('username')
  const signup = document.getElementById('signup')
  const login = document.getElementById('login')

  login.addEventListener('click', e => {
    const email = user.value;
    const pass = password.value;
    const auth = firebase.auth();
    const fbLogin = auth.signInWithEmailAndPassword(email, pass);
    fbLogin.catch(e => console.log(e.message))
    console.log(e, 'logged in ' + email, pass)
    user.value = '';
    password.value = ''
  })

  signup.addEventListener('click', e => {
    const email = user.value;
    const pass = password.value;
    const auth = firebase.auth();
    const fbLogin = auth.createUserWithEmailAndPassword(email, pass);
    fbLogin.catch(e => console.log(e.message));
    console.log(e, 'logged in ' + email, pass)
    user.value = '';
    password.value = ''
  })

  addUser.addEventListener('click', e => {
      const username = chatName.value;
      let elem = "<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42zXlbvadH-WhcgfZ9ufjEs98dZNM84KfcPPBXg_dHIAjKkOk' />"
      document.getElementById('usernameDisplay').innerHTML = '<div>' + elem + '</div>' + "<div id='name'>" + username + "</div>";
      chatName.value = ''
  })
})();

let id = Math.floor(Math.random() * 100);
let usernameDisplay = document.getElementById('usernameDisplay').innerhtml;


function push() {
  let message = document.getElementById('message').value;
  let name = document.getElementById('name').innerHTML
  console.log(name)
  firebase.database().ref().child('posts').push({id: id, message: message, name: name});
  console.log('Push func successful!')
  document.getElementById('message').value = ''
}

let commentsRef = firebase.database().ref('posts');
commentsRef.on('child_added', function (data) {
  displayMessage(data.val());
})

function displayMessage(data) {
  console.log(data)
  // let name = document.getElementById('name').innerHTML
  let messages = document.getElementById('messages');
  let newMessage = data.name + ': ' + data.message;
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
        // if(token) {
        //   console.log('token read 1')
        //   //sendTokenToServer func throws err. commenting if/else out for now
        //   sendTokenToServer();
        //   console.log('token read 2')
        //   updateUIForPushEnabled(token);
        // } else {
        //   console.log('No instance ID found');
        //   updateUIForPushPermissionRequired();
        //   setTokenSentToServer(false);
        // }   
      })
      .catch(function (err) {
        console.log('no msging permission')
      })

messaging.requestPermission()
.then(function() {
  messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });
})

messaging.onMessage(function(payload) {
  console.log('onMessage :', payload)
})