//adicione o código do seu banco de dados
const firebaseConfig = {
  apiKey: "AIzaSyCG8j5K3DiMASeIxDsP_05gIP6Y1Fmm1Zw",
  authDomain: "kwiitter-c0c6b.firebaseapp.com",
  databaseURL: "https://kwiitter-c0c6b-default-rtdb.firebaseio.com",
  projectId: "kwiitter-c0c6b",
  storageBucket: "kwiitter-c0c6b.appspot.com",
  messagingSenderId: "362899324362",
  appId: "1:362899324362:web:d57ee6ca8b436b0da4a333"
};

//// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Bem vindo(a) " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando nome da sala"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "web_page.html";
}

function getData() 
{  
    firebase.database().ref("/").on('value', function(snapshot) 
    { 
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
        { 
            childKey  = childSnapshot.key;
            Room_names = childKey;
            //Comece a programar 
            console.log("Nome da sala: " + Room_names);
            row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
            document.getElementById("output").innerHTML += row;
            //Programe até aqui
        });
    });
}

getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "web_page.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
