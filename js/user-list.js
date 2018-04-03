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
  var userRef = database.ref('users');
  userRef.on('child_added', snap => {

    var tdName = document.createElement('TD');
    tdName.innerHTML = snap.val().name;

    var tdMail = document.createElement('TD');
    tdMail.innerHTML = snap.val().mail;

    var tdNotification = document.createElement('TD');
    tdNotification.innerHTML = '<input type="checkbox" id="' + snap.key + '"' + ((snap.val().notification) ? "checked" : " ") + ' class="selectone"><label for="' + snap.key + '"> </label>';
    tdNotification.style.textAlign = "center";

    var tr = document.createElement('TR');
    tr.appendChild(tdName);
    tr.appendChild(tdMail);
    tr.appendChild(tdNotification);
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


  $(document).ready(function() {
    $(document).on('change','.selectone',function() {
      if ($(this).is(':checked')) {
	 database.ref('users').child(this.id).update({notification:true});
      } else {
	 database.ref('users').child(this.id).update({notification:false});
      }
    });
/*
    $(document).on('change','.selectall',function() {
      if ($(this).is(':checked')) {
        $('.selectone').prop('checked', true);
      } else {
        $('.selectone').prop('checked', false);
      }
    });

    // Update select all based on individual checkbox 
    $(document).on('click','.selectone', function() {
      if ($(this).is(':checked')) {
      	if ($('.selectone:checked').length == $('.selectone').length) {
       		$('.selectall').prop('checked', true);
    		} else {
        	$('.selectall').prop('checked', false);
        }
      } else {
        $('.selectall').prop('checked', false);
      }
    });*/
  });

}());
