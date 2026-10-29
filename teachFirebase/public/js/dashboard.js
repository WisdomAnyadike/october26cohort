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
 let chatIndex 



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





function displayMessages(params) {
  messagesContainer.innerHTML = `<div class="day-divider"> Loading... </div>`

  var starCountRef = database.ref('chats');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val() || [];
  chatIndex = data.length
  messagesContainer.innerHTML = ''
  messagesContainer.innerHTML += `<div class="day-divider">Today</div> <p class="system-message">${auth.currentUser.displayName ?   auth.currentUser.displayName.indexOf(' ') === -1 ?  auth.currentUser.displayName : auth.currentUser.displayName.substring(0 , auth.currentUser.displayName.indexOf(' ') )     : 'User'} joined the classroom</p>`
  data.forEach(( chat , i , arr )=> {
    let isMine = chat.sender === auth.currentUser.displayName

    messagesContainer.innerHTML += ` <div ondblclick="deleteMssg(${isMine} , ${i} , ${chat.isDeleted} )" class="message ${ isMine ? 'mine' : '' }">
                        <span class="avatar" style="--avatar: #0e7490">T</span>
                        <div class="message-content">
                            <div class="message-meta"><span class="message-author">${ isMine ? 'You' : chat.sender }</span><span class="message-time"> ${chat.time } ${ new Date().getHours() > 11 ? 'PM' : 'AM'} </span></div>
                            <p class="message-text"> ${chat.isDeleted ? '<i> This message has been deleted </i>' : chat.message} </p>
                        </div>
                    </div>`
  })
});
  
}


displayMessages()


function sendMessage() {
  let message = document.getElementById('messageInput').value.trim()

  if (!message) {
    alert('please attach a message')
    return
  }

  if (!chatIndex && chatIndex !== 0 ) {
    alert('try again later , error occured')
    return
  }




  database.ref(`chats/${chatIndex}`).set({
    sender : firebase.auth().currentUser.displayName  , 
    message,
    time : new Date().toLocaleTimeString() ,
    isDeleted : false
  }).then(()=> {
    messageInput.value = ''
  }).catch((err)=> {
    alert(err.message)
  })

  
}


function deleteMssg(isMine , index , isDeleted) {
  if (!isMine) {
    alert('unauthorized')
    return
  }

   if (isDeleted) {
    return
  }

  let canDelete = confirm('are you sure?')
  if (canDelete) {
    database.ref(`chats/${index}`).update({
      isDeleted: true
    });
  }
  
}