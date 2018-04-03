(function() {

  "use strict";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_JcmhZECRhogf62Bm9XwfA_x_0cU8TQU",
    authDomain: "die-usach.firebaseapp.com",
    databaseURL: "https://die-usach.firebaseio.com",
    storageBucket: "die-usach.appspot.com",
    messagingSenderId: "909156958193"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(function() {
    var sender = [];
    var senderRef = database.ref('sender');
    senderRef.on('child_added', snap => {
      sender.push(snap.val().name);
    });
    $("#txtAuthor").autocomplete({
      source: sender
    });
  });

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      var userName = document.getElementById("userName");
      userName.value = user.displayName;
    } else {
      console.log("no user signed in");
      window.location.replace("http://dieapp.cl");
    }
  });

  const registration_ids = [];
  var regIdRef = database.ref('users').orderByChild('notification').equalTo(true);
  regIdRef.on('child_added', snap => {
    registration_ids.push(snap.val().regID);
    console.log("registration_ids.push(): " + snap.val().regID);
  });

  //Get Elements
  const txtAuthor = document.getElementById('txtAuthor');
  const txtTitle = document.getElementById('txtTitle');
  const txtBody = document.getElementById('txtBody');
  const btnSend = document.getElementById('btnSend');
  btnSend.addEventListener('click', sendMessage);

  function sendMessage() {
    console.log("registration_ids = " + registration_ids);

     // Bring photoUrl of the Author
     var txtPhotoUrl;
     var senderPhotoUrlRef = database.ref('sender').orderByChild('name').equalTo(txtAuthor.value);
	senderPhotoUrlRef.on('child_added', snap => {
	txtPhotoUrl = snap.val().photoUrl;
     });

     // Add message to database in respective node
     var messageRef = database.ref('message');
     var key = messageRef.push().key;
     var currentDate = 0 - Date.now();
     var messageData = {
	author: txtAuthor.value,
	body: txtBody.value,
	date: currentDate,
	photoUrl: txtPhotoUrl,
	title: txtTitle.value
     };
    var messageNewRef = database.ref('message/' + key);
    var result = messageNewRef.set(messageData);


    // Add message to user in respective node
    var regIdRef = database.ref('users').orderByChild('notification').equalTo(true);
    regIdRef.on('child_added', snap => {
	var userId = snap.val().uid;
	var userName = snap.val().name;
	var userMessageRef = database.ref('user_message/' + userId + '/' + key);
	var result = userMessageRef.set(messageData);
    });

    //Ajax Notification
    $.ajax({
	url: 'https://fcm.googleapis.com/fcm/send',
	method: 'POST',
	headers: {
		'Authorization': 'key=AIzaSyCQ2mSc-vYgGWsVkSMbF3s-2qurLf3S6X4',
		'Content-Type': 'application/json'
	},
	dataType: 'json',
	data: JSON.stringify({
		"notification": {
			"body": txtTitle.value,
			"badge": 1,
 			"content_available": 1
		},
		"data": {
			"message": txtTitle.value
		},
		"priority":"high",
		"registration_ids": registration_ids
		}),
		success: function(data){
			console.log('success:' + data);
	}
    });

    Materialize.toast('El Mensaje se ha guardado correctamente', 4000);
    txtAuthor.value = '';
    txtTitle.value = '';
    txtBody.value = '';
  }

}());
