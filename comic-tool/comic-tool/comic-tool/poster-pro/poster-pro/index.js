const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Army Digital ID</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#ffd6ea,#f8d6ff);
min-height:100vh;
padding:20px;
display:flex;
justify-content:center;
align-items:center;
}

.container{
width:100%;
max-width:1100px;
background:#fff;
padding:30px;
border-radius:35px;
box-shadow:0 15px 45px rgba(0,0,0,0.12);
}

.top{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:25px;
flex-wrap:wrap;
gap:10px;
}

.brand h1{
font-size:38px;
font-weight:700;
background:linear-gradient(90deg,#ff4fa3,#6c63ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.brand p{
color:#777;
font-size:14px;
margin-top:5px;
font-weight:500;
}

.member{
background:#111;
color:#fff;
padding:12px 18px;
border-radius:14px;
font-size:14px;
}

.grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:18px;
}

.full{
grid-column:1/-1;
}

.box{
display:flex;
flex-direction:column;
}

.box label{
font-size:14px;
font-weight:600;
margin-bottom:8px;
color:#444;
}

.box input,
.box textarea,
.box select{
background:#f5f5f5;
border:none;
padding:15px;
border-radius:18px;
outline:none;
font-size:14px;
}

textarea{
min-height:120px;
resize:none;
}

.buttons{
display:flex;
gap:12px;
margin-top:25px;
flex-wrap:wrap;
}

button{
border:none;
padding:14px 20px;
border-radius:16px;
font-weight:600;
cursor:pointer;
transition:0.3s;
}

button:hover{
transform:translateY(-2px);
}

.generate{
background:#ff4fa3;
color:#fff;
}

.copy{
background:#111;
color:#fff;
}

.reset{
background:#eee;
}

.export{
background:#6c63ff;
color:#fff;
}

.random{
background:#00b894;
color:#fff;
}

.output{
margin-top:30px;
background:#f8f8f8;
padding:25px;
border-radius:25px;
}

.output h2{
color:#ff4fa3;
margin-bottom:15px;
}

.prompt{
background:#fff;
padding:20px;
border-radius:20px;
line-height:1.8;
white-space:pre-wrap;
border:2px dashed #ffd0e5;
font-size:14px;
}

.action{
margin-top:18px;
display:flex;
gap:10px;
flex-wrap:wrap;
}

.small{
padding:12px 16px;
font-size:13px;
}

.edit{
background:#ffc107;
}

.delete{
background:#ff4d4d;
color:#fff;
}

.save{
background:#00b894;
color:#fff;
}

.history{
margin-top:30px;
}

.history h3{
margin-bottom:15px;
color:#ff4fa3;
}

.historyItem{
background:#fff;
padding:15px;
border-radius:18px;
margin-bottom:12px;
border:1px solid #eee;
font-size:13px;
}

.loginBox{
position:fixed;
inset:0;
background:rgba(0,0,0,0.6);
display:flex;
justify-content:center;
align-items:center;
z-index:999;
}

.loginCard{
background:#fff;
padding:30px;
border-radius:30px;
width:90%;
max-width:380px;
}

.loginCard h2{
font-size:30px;
font-weight:700;
background:linear-gradient(90deg,#ff4fa3,#6c63ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
margin-bottom:8px;
}

.loginCard p{
font-size:13px;
color:#777;
margin-bottom:20px;
}

.loginCard input{
width:100%;
margin-bottom:15px;
padding:14px;
border:none;
background:#f5f5f5;
border-radius:14px;
}

.loginCard button{
width:100%;
margin-top:10px;
}

.loginBtn{
background:#ff4fa3;
color:#fff;
}

.signupBtn{
background:#6c63ff;
color:#fff;
}

@media(max-width:700px){

.grid{
grid-template-columns:1fr;
}

.brand h1{
font-size:28px;
}

.container{
padding:22px;
}

}

</style>
</head>

<body>

<div class="loginBox" id="loginBox">

<div class="loginCard">

<h2>Army Digital ID</h2>

<p>by Aeniikoo ✨</p>

<input type="text" id="username" placeholder="Username">

<input type="password" id="password" placeholder="Password">

<button class="loginBtn" onclick="login()">Login</button>

<button class="signupBtn" onclick="signup()">Sign Up</button>

</div>

</div>

<div class="container">

<div class="top">

<div class="brand">
<h1>Army Digital ID</h1>
<p>by Aeniikoo ✨</p>
</div>

<div class="member" id="memberName">Guest</div>

</div>

<div class="grid">

<div class="box full">

<label>Ide Poster</label>

<input type="text" id="tema" placeholder="contoh: konser cyberpunk neon">

</div>

<div class="box">

<label>Style</label>

<select id="style">
<option>Cinematic</option>
<option>Anime</option>
<option>3D Render</option>
<option>3D Chibi</option>
<option>Luxury</option>
<option>Cyberpunk</option>
<option>Kawaii</option>
<option>Minimalist</option>
<option>Vintage</option>
</select>

</div>

<div class="box">

<label>Rasio</label>

<select id="ratio">
<option>1:1</option>
<option>4:5</option>
<option>9:16</option>
<option>16:9</option>
<option>A4 Poster</option>
</select>

</div>

<div class="box">

<label>Warna Dominan</label>

<input type="text" id="warna" placeholder="pink pastel">

</div>

<div class="box">

<label>Mood</label>

<input type="text" id="mood" placeholder="dreamy cinematic">

</div>

<div class="box full">

<label>Detail Tambahan</label>

<textarea id="detail"></textarea>

</div>

</div>

<div class="buttons">

<button class="generate" onclick="generatePrompt()">Generate</button>

<button class="copy" onclick="copyPrompt()">Copy</button>

<button class="reset" onclick="resetAll()">Reset</button>

<button class="export" onclick="exportPDF()">Export PDF</button>

<button class="random" onclick="randomPrompt()">Random</button>

</div>

<div class="output">

<h2>Hasil Prompt</h2>

<div class="prompt" id="hasil">
Prompt akan muncul di sini...
</div>

<div class="action">

<button class="small edit" onclick="editPrompt()">Edit</button>

<button class="small delete" onclick="deletePrompt()">Delete</button>

<button class="small save" onclick="savePrompt()">Save</button>

</div>

</div>

<div class="history">

<h3>Saved Prompt</h3>

<div id="historyList"></div>

</div>

</div>

<script>

function signup(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if(username && password){

localStorage.setItem("memberUser", username);
localStorage.setItem("memberPass", password);

alert("Sign Up Berhasil!");

}else{

alert("Isi Username dan Password!");

}

}

function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const savedUser = localStorage.getItem("memberUser");
const savedPass = localStorage.getItem("memberPass");

if(username === savedUser && password === savedPass){

localStorage.setItem("member", username);

document.getElementById("memberName").innerText = username;

document.getElementById("loginBox").style.display = "none";

alert("Login Berhasil!");

}else{

alert("Username atau Password Salah!");

}

}

window.onload = function(){

const member = localStorage.getItem("member");

if(member){

document.getElementById("memberName").innerText = member;

document.getElementById("loginBox").style.display = "none";

}

loadHistory();

}

function generatePrompt(){

const tema = document.getElementById("tema").value;
const style = document.getElementById("style").value;
const ratio = document.getElementById("ratio").value;
const warna = document.getElementById("warna").value;
const mood = document.getElementById("mood").value;
const detail = document.getElementById("detail").value;

const prompt = \`

Ultra detailed \${style} poster about \${tema},
\${warna} color palette,
\${mood} atmosphere,
cinematic lighting,
professional typography,
premium poster design,
high detail composition,
4k ultra hd,
ratio \${ratio},
\${detail}

Negative Prompt:
low quality,
blur,
watermark,
bad anatomy,
distorted objects

\`;

document.getElementById("hasil").innerText = prompt;

}

function randomPrompt(){

const ideas = [
"festival musik neon",
"poster anime school",
"robot cyberpunk city",
"miniature food world",
"cute chibi cafe",
"luxury fashion poster",
"kawaii dessert land"
];

document.getElementById("tema").value =
ideas[Math.floor(Math.random()*ideas.length)];

generatePrompt();

}

function copyPrompt(){

navigator.clipboard.writeText(
document.getElementById("hasil").innerText
);

alert("Prompt berhasil dicopy!");

}

function resetAll(){

document.getElementById("tema").value = "";
document.getElementById("warna").value = "";
document.getElementById("mood").value = "";
document.getElementById("detail").value = "";

document.getElementById("hasil").innerText =
"Prompt akan muncul di sini...";

}

function editPrompt(){

const current =
document.getElementById("hasil").innerText;

const edited = prompt("Edit Prompt:", current);

if(edited !== null){

document.getElementById("hasil").innerText = edited;

}

}

function deletePrompt(){

document.getElementById("hasil").innerText = "";

}

function savePrompt(){

const promptText =
document.getElementById("hasil").innerText;

let history =
JSON.parse(localStorage.getItem("promptHistory")) || [];

history.unshift(promptText);

localStorage.setItem(
"promptHistory",
JSON.stringify(history)
);

loadHistory();

alert("Prompt tersimpan!");

}

function loadHistory(){

let history =
JSON.parse(localStorage.getItem("promptHistory")) || [];

const historyList =
document.getElementById("historyList");

historyList.innerHTML = "";

history.forEach(item => {

historyList.innerHTML += \`
<div class="historyItem">\${item}</div>
\`;

});

}

async function exportPDF(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

const text =
document.getElementById("hasil").innerText;

doc.text(text,10,10);

doc.save("poster-prompt.pdf");

}

</script>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname,"index.html"), html);

app.listen(PORT, () => {

console.log("Server running!");
console.log("http://localhost:" + PORT);

});
