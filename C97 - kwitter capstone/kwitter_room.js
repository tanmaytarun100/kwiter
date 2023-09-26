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

document.getElementById("user_name").innerHTML = "Welcome  " + user_name + "!";






function addRoom() {
  
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}




function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
