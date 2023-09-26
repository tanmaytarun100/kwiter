const firebaseConfig = {
  apiKey: "AIzaSyCu5cHdVkZBrQ3PuJmLbC0acL-wLBC5gYc",
  authDomain: "lets-chat-with-app.firebaseapp.com",
  databaseURL: "https://lets-chat-with-app-default-rtdb.firebaseio.com",
  projectId: "lets-chat-with-app",
  storageBucket: "lets-chat-with-app.appspot.com",
  messagingSenderId: "632419545889",
  appId: "1:632419545889:web:a724ede7084a145a720460",
  measurementId: "G-30Q3W8DK2R"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code

        console.log(firebase_message_id);
        console.log(message_data);
        names = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];


        A1 = "<h4>" + names + "<img class='user_tick' src='tick.png'></h4>";
        A2 = "<h4 class='message_h4'>" + message + "</h4>";
        A3 = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick= 'updateLike(this.id)'>";
        A4 = "<span class='glyphicon glyphicon-thumbs-up'>  Like :  " + like + "</span></button><hr>";


        apple = A1 + A2 + A3 + A4;
        document.getElementById("output").innerHTML += apple;
        //End code
      }
    });
  });
}
getData();

function updateLike(message_id) {
  T1 = message_id;
  likes = document.getElementById(T1).value;
  updated_likes = Number(likes) + 1;

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });

}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
