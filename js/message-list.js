(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_JcmhZECRhogf62Bm9XwfA_x_0cU8TQU",
    authDomain: "die-usach.firebaseapp.com",
    databaseURL: "https://die-usach.firebaseio.com",
    storageBucket: "die-usach.appspot.com",
    messagingSenderId: "909156958193"
  };
  firebase.initializeApp(config);

  var sw = 0;
  var database = firebase.database();
  var messageRef = database.ref('message');
  messageRef.on('child_added', snap => {

   //var data = JSON.stringify(snap.val());
   //console.log('snap.val(): ' + data);

    var tdAuthor = document.createElement('TD');
    tdAuthor.innerHTML = '<img class="circle responsive-img" src="' + snap.val().photoUrl + '"  height="100" width="100">' + snap.val().author;
    var tdTitle = document.createElement('TD');
    tdTitle.innerHTML = snap.val().title;
    var tdDate = document.createElement('TD');
    var date = new Date(Math.abs(snap.val().date));
    tdDate.innerHTML = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    var tdBody = document.createElement('TD');
    tdBody.innerHTML = snap.val().body.replace('\n\n','<br><br>');
    var tr = document.createElement('TR');
    tr.appendChild(tdAuthor);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDate);
    tr.appendChild(tdBody);
    document.querySelector('table.striped tbody').appendChild(tr);

    if (sw === 0 ) {
      sw = sw + 1;
      var preloader = document.getElementById('preloader');
      preloader.style.display = 'none';
    }

  });

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      var userName = document.getElementById("userName");
      userName.value = user.displayName;
    } else {
      console.log("no user signed in");
    }
  });

}());
