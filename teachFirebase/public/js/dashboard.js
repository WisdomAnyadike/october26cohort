 const firebaseConfig = {
    apiKey: "AIzaSyCCd4QEpjbZhaE-1G7Oe2wCdqhxqtHAz5s",
    authDomain: "oct26app.firebaseapp.com",
    projectId: "oct26app",
    storageBucket: "oct26app.firebasestorage.app",
    messagingSenderId: "587278706375",
    databaseURL: "https://oct26app-default-rtdb.firebaseio.com",
    appId: "1:587278706375:web:0840deb4f8e67ba3be80e2"
  };

 const app = firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const database = firebase.database();



function authenticateUser(params) {
     firebase.auth().onAuthStateChanged((user) => {
  if (user) {
     let welcomeName = document.getElementById('welcomeName')
    let userAvatar = document.getElementById('userAvatar')
    let userName = document.getElementById('userName')
    let userEmail = document.getElementById('userEmail')
   
    var uid = user.uid;
    console.log(user);
    function usersFirstName (){
        return user.displayName ?   user.displayName.indexOf(' ') === -1 ?  user.displayName : user.displayName.substring(0 , user.displayName.indexOf(' ') )     : 'User'
    }

    welcomeName.innerHTML =  usersFirstName()
    userName.innerHTML = usersFirstName()
    userEmail.innerHTML =  user.email
    userAvatar.innerHTML = user.displayName[0]
    
    
    
  } else {
   window.location.href = 'login.html'
  }
});
}



authenticateUser()


function logUserOut(){
    let canLogout = confirm('are you sure?')

    if (canLogout) {
    auth.signOut().then(() => {
    window.location.href = 'login.html'
}).catch((error) => {
  alert(error.message)
});
    }



}