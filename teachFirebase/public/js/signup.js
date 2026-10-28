console.log('hi class');

console.log(firebase);

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


 function signUserUp() {
    let email = document.getElementById('signupEmail').value.trim()
    let password  = document.getElementById('signupPassword').value.trim()
     let fullName  = document.getElementById('signupName').value.trim()
      let confirmPassword  = document.getElementById('signupConfirmPassword').value.trim()
      let button =document.getElementById('signupButton') 



      if (!email || !password || !fullName || !confirmPassword) {
         alert('all fields are mandatory')
      } else if ( password !== confirmPassword ) {
         alert('passwords must match')
      }
      else {
button.innerHTML = 'Loading...'
button.disabled = true


  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;

    user.updateProfile({
  displayName: fullName,
}).then(() => {
     alert('sign up successful')
     window.location.href = 'login.html'
}).catch((error) => {
    alert('sign up successful , error updating username')
     window.location.href = 'login.html'
}); 

  }) 
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    button.innerHTML = 'Create Account'
   button.disabled = false
    // ..
  });

      }
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








