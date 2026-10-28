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

 function resetPassword() {
    let email = document.getElementById('resetEmail').value.trim()
    let button = document.getElementById('resetButton')

    if(!email){
        alert('please input your email')
        return
    }

    button.innerHTML = 'Loading...'
    button.disabled = true


    auth.sendPasswordResetEmail(email)
  .then(() => {
    alert('Password reset email sent!')
     button.innerHTML = 'Send reset link'
    button.disabled = false 
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
      button.innerHTML = 'Send reset link'
    button.disabled = false 
  });
    
 }