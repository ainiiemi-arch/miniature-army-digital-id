const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{

res.send(`

<!DOCTYPE html>
<html>

<head>

<title>Aeniikoo AI Premium</title>

<style>

body{
margin:0;
font-family:sans-serif;
background:linear-gradient(135deg,#ffd6e7,#fff);
height:100vh;
display:flex;
justify-content:center;
align-items:center;
}

.container{
width:90%;
max-width:420px;
background:white;
padding:30px;
border-radius:25px;
box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

h1{
text-align:center;
color:#ff4fa3;
}

input{
width:100%;
padding:15px;
margin-top:12px;
border:none;
border-radius:15px;
background:#f5f5f5;
font-size:16px;
}

button{
width:100%;
padding:15px;
margin-top:15px;
border:none;
border-radius:15px;
background:#ff4fa3;
color:white;
font-size:16px;
font-weight:bold;
cursor:pointer;
}

#dashboard{
display:none;
}

.card{
background:#fff0f7;
padding:20px;
border-radius:20px;
margin-top:20px;
}

.logout{
background:black;
}

</style>

</head>

<body>

<div class="container">

<div id="auth">

<h1>Aeniikoo AI ✨</h1>

<input type="text" id="username" placeholder="Username">

<input type="password" id="password" placeholder="Password">

<button onclick="signup()">
Sign Up
</button>

<button onclick="login()">
Login
</button>

</div>

<div id="dashboard">

<h1>Welcome ✨</h1>

<div class="card">

<h3 id="welcomeUser"></h3>

<p>Premium Member Active 🚀</p>

<p>✔ AI Prompt Generator</p>
<p>✔ Edit Text</p>
<p>✔ Delete Text</p>
<p>✔ Download Prompt</p>
<p>✔ Dark Mode</p>

</div>

<button class="logout" onclick="logout()">
Logout
</button>

</div>

</div>

<script>

function signup(){

const username = document.getElementById("username").value;

const password = document.getElementById("password").value;

if(!username || !password){

alert("Isi username dan password");

return;

}

const user = {
username,
password
};

localStorage.setItem("user", JSON.stringify(user));

alert("Sign Up berhasil ✨");

}

function login(){

const username = document.getElementById("username").value;

const password = document.getElementById("password").value;

const savedUser = JSON.parse(localStorage.getItem("user"));

if(
savedUser &&
username === savedUser.username &&
password === savedUser.password
){

localStorage.setItem("loggedIn", "true");

showDashboard();

}else{

alert("Username atau Password salah");

}

}

function logout(){

localStorage.removeItem("loggedIn");

location.reload();

}

function showDashboard(){

document.getElementById("auth").style.display = "none";

document.getElementById("dashboard").style.display = "block";

const savedUser = JSON.parse(localStorage.getItem("user"));

document.getElementById("welcomeUser").innerText =
"Hello, " + savedUser.username;

}

if(localStorage.getItem("loggedIn") === "true"){
showDashboard();
}

</script>

</body>
</html>

`);

});

app.listen(3000, ()=>{

console.log("Running on http://localhost:3000");

});
