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

  var adminIds = [];
  var adminRef = database.ref("admin");

  adminRef.on('child_added', snap => {
	adminIds.push(snap.key);
	var sw = 0;
	const adminCount = 2; //snap.numChildren doesnt count the total of records in admin node
	const uid = firebase.auth().currentUser.uid;
	for (const id of adminIds) {
		if (id === uid) {
			sw = sw + 1;
		}
	}
	if (sw === 0 && adminIds.length === adminCount){
		console.log("User not authorized");
		window.location.replace("http://dieapp.cl");
	}

  });

  firebase.auth().onAuthStateChanged(function(user) {

	if (user) {
		var userName = document.getElementById("userName");
		userName.innerHTML = user.displayName;
		const uid = firebase.auth().currentUser.uid;
	} else {
		console.log("no user signed in");
		window.location.replace("http://dieapp.cl");
	}
  });

}());
