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

  var database = firebase.database();

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      var userName = document.getElementById("userName");
      userName.value = user.displayName;
    } else {
      console.log("no user signed in");
      window.location.replace("http://dieapp.cl");
    }
  });

  //Get Elements
  const txtPhotoUrl = document.getElementById('txtPhotoUrl');
  const txtName = document.getElementById('txtName');
  const btnSave = document.getElementById('btnSave');

  var adminIds = [];
  var adminRef = database.ref("admin");
  adminRef.on('child_added', snap => {
	adminIds.push(snap.key);
  });

  btnSave.addEventListener('click', e => {

     var uid = firebase.auth().currentUser.uid;

     var sw = 0;
     for (const id of adminIds) {
	if (id === uid) {
		sw = sw + 1;
		var senderRef = database.ref('sender');
		var result = senderRef.push({
			photoUrl: txtPhotoUrl.value,
			name: txtName.value,
		});

		Materialize.toast('El Remitente se ha guardado correctamente', 4000);
	}
     }

     if (sw === 0 ) {
	Materialize.toast('Usted no está autorizado a gestionar remitentes', 4000);
     }

     txtPhotoUrl.value = '';
     txtName.value = '';

  });


}());
