 const firebaseConfig = {
    apiKey: "AIzaSyCCd4QEpjbZhaE-1G7Oe2wCdqhxqtHAz5s",
    authDomain: "oct26app.firebaseapp.com",
    projectId: "oct26app",
    storageBucket: "oct26app.firebasestorage.app",
    messagingSenderId: "587278706375",
    appId: "1:587278706375:web:0840deb4f8e67ba3be80e2"
  };

 const app = firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 var provider = new firebase.auth.GoogleAuthProvider();


 function logUserIn() {
    let email = document.getElementById('loginEmail').value.trim()
    let password  = document.getElementById('loginPassword').value.trim()
    let button = document.getElementById('loginButton')

    button.innerHTML = 'Loading...'
    button.disabled = true

auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
    alert('login successful')
    window.location.href = 'dashboard.html'
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
     button.innerHTML = 'Log in'
    button.disabled = false
  });


 }

function signInWithGoogle() {
   auth
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    window.location.href = 'dashboard.html'
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    alert(errorMessage)
  });
 }