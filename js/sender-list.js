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
  var senderRef = database.ref('sender');
  senderRef.on('child_added', snap => {

    var tdImg = document.createElement('TD');
    tdImg.innerHTML = '<img class="circle responsive-img" src="' + snap.val().photoUrl + '"  height="100" width="100">';

    var tdPhotoUrl = document.createElement('TD');
    tdPhotoUrl.innerHTML = snap.val().photoUrl;

    var tdName = document.createElement('TD');
    tdName.innerHTML = snap.val().name;

    var tdAction = document.createElement('TD');
    var a = document.createElement('a');
    a.href = '#';
    a.innerHTML = '<i class="material-icons">delete</i>';
    a.addEventListener('click', function() {
      senderRef.child(snap.key).remove();
      Materialize.toast('¡ El remitente ha sido eliminado correctamente !', 4000);
     var p = a.parentNode.parentNode;
     p.parentNode.removeChild(p);
    }, false);
    tdAction.appendChild(a);

    var tr = document.createElement('TR');
    tr.appendChild(tdImg);
    tr.appendChild(tdPhotoUrl);
    tr.appendChild(tdName);
    tr.appendChild(tdAction);
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
      window.location.replace("http://dieapp.cl");
    }
  });

}());
