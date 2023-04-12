//LINKS DO SEU APP FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCG8j5K3DiMASeIxDsP_05gIP6Y1Fmm1Zw",
  authDomain: "kwiitter-c0c6b.firebaseapp.com",
  databaseURL: "https://kwiitter-c0c6b-default-rtdb.firebaseio.com",
  projectId: "kwiitter-c0c6b",
  storageBucket: "kwiitter-c0c6b.appspot.com",
  messagingSenderId: "362899324362",
  appId: "1:362899324362:web:d57ee6ca8b436b0da4a333"
};

//inicializar o Firebase
firebase.initializeApp(firebaseConfig);
var user_name=localStorage.getItem("user_name");
var room_name=localStorage.getItem("room_name");

function send(){
  var msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like:0
  });
  document.getElementById("msg").value =" ";

}

function getData(){
  firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose") 
      {
        firebase_message_id = childKey;
        message_data = childData;
//Inicie a programar aqui
        console.log(firebase_message_id);
        console.log(message_data);
	      var name = message_data['name'];
	      message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+ like+" onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: "+ like +"</span></button><hr>";
        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row;
//Programe até aqui
      } 

    });  
  }); 
}

getData();
function updateLike(message_id){
  var button_id = message_id;
  var likes=document.getElementById(button_id).value;
  var updated_likes=Number (likes)+1;
  firebase.database().ref(room_name).child(message_id).update({
    like:updated_likes

  })
}

function logout()
{
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");


}





















