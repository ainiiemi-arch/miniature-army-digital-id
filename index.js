const express = require("express");

const app = express();

app.use(express.json());

function createPrompt(theme, style){

return `
🌸 ${style} 🌸

Ultra detailed ${style} ${theme},
cute chibi miniature characters,
tiny handcrafted diorama,
anime kawaii aesthetic,
soft cinematic lighting,
dreamy sakura atmosphere,
pink pastel color palette,
adorable miniature world,
high detail composition,
tilt shift photography,
professional miniature render,
4k ultra hd

Negative Prompt:
low quality,
blur,
bad anatomy,
distorted face,
watermark,
ugly lighting
`;

}

app.get("/", (req,res)=>{

res.send(`

<!DOCTYPE html>
<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Aeniikoo Miniature AI</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:sans-serif;
}

body{
background:
linear-gradient(rgba(255,240,246,0.88),
rgba(255,240,246,0.88)),
url("https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200");

background-size:cover;
background-position:center;
background-attachment:fixed;

min-height:100vh;

display:flex;
justify-content:center;
align-items:center;

padding:20px;

overflow-x:hidden;
}

/* Sakura Animation */

.sakura{
position:fixed;
top:-10px;
font-size:20px;
animation:fall linear infinite;
pointer-events:none;
z-index:1;
}

@keyframes fall{

0%{
transform:translateY(-10px) rotate(0deg);
opacity:1;
}

100%{
transform:translateY(110vh) rotate(360deg);
opacity:0;
}

}

.container{
position:relative;
z-index:2;

width:100%;
max-width:550px;

background:rgba(255,255,255,0.72);

backdrop-filter:blur(18px);

border-radius:35px;

padding:25px;

box-shadow:0 10px 40px rgba(0,0,0,0.15);
}

h1{
text-align:center;
font-size:38px;
color:#ff4fa3;
margin-bottom:10px;
}

.subtitle{
text-align:center;
color:#666;
margin-bottom:20px;
}

input,
select{
width:100%;
padding:15px;
border:none;
border-radius:18px;
margin-top:12px;
background:white;
font-size:16px;
outline:none;
}

button{
width:100%;
padding:15px;
border:none;
border-radius:18px;
margin-top:15px;
font-size:16px;
font-weight:bold;
cursor:pointer;
transition:0.3s;
}

button:hover{
transform:scale(1.03);
}

.pink{
background:#ff4fa3;
color:white;
}

.black{
background:black;
color:white;
}

#dashboard{
display:none;
}

.card{
background:#fff0f7;
padding:20px;
border-radius:25px;
margin-top:20px;
}

.chatbox{
display:flex;
gap:10px;
margin-top:20px;
}

.chatbox input{
flex:1;
margin-top:0;
}

.chatbox button{
width:60px;
margin-top:0;
border-radius:50%;
font-size:22px;
}

.actions{
display:grid;
grid-template-columns:1fr 1fr;
gap:10px;
margin-top:15px;
}

.actions button{
margin-top:0;
}

#hasil{
margin-top:20px;
max-height:350px;
overflow:auto;
padding:5px;
}

.msg-user{
background:#ffe6f1;
padding:14px;
border-radius:18px;
margin-top:10px;
text-align:right;
font-weight:bold;
}

.msg-bot{
background:white;
padding:18px;
border-radius:18px;
margin-top:10px;
white-space:pre-wrap;
line-height:1.6;
border:1px solid #eee;
}

#loading{
display:none;
text-align:center;
margin-top:15px;
font-weight:bold;
color:#ff4fa3;
animation:pulse 1s infinite;
}

@keyframes pulse{

0%{
opacity:0.3;
}

50%{
opacity:1;
}

100%{
opacity:0.3;
}

}

.dark{
background:#111 !important;
color:white;
}

.dark .container{
background:rgba(20,20,20,0.72);
}

.dark .msg-bot{
background:#222;
color:white;
border:none;
}

.dark input,
.dark select{
background:#222;
color:white;
}

</style>

</head>

<body>

<div class="container">

<div id="auth">

<h1>🌸 Aeniikoo AI</h1>

<p class="subtitle">
Premium Miniature Generator ✨
</p>

<input
type="text"
id="username"
placeholder="Username"
>

<input
type="password"
id="password"
placeholder="Password"
>

<button class="pink" onclick="signup()">
Sign Up
</button>

<button class="black" onclick="login()">
Login
</button>

</div>

<div id="dashboard">

<h1>Welcome ✨</h1>

<p class="subtitle">
Miniature Premium Dashboard 🌸
</p>

<div class="card">

<h3 id="welcomeUser"></h3>

<p style="margin-top:10px;">
Premium Member Active 🚀
</p>

</div>

<select id="style">

<option>Anime Miniature</option>

<option>Kawaii Miniature</option>

<option>Miniature Diorama</option>

<option>Tiny World</option>

<option>Mini Cafe</option>

<option>Mini Ramen Shop</option>

<option>Mini Bakery</option>

<option>Mini Market</option>

<option>Mini Kitchen</option>

<option>Tiny Bedroom</option>

<option>Miniature City</option>

<option>Japanese Miniature</option>

<option>Sakura Miniature</option>

<option>Fantasy Miniature</option>

<option>Cyberpunk Miniature</option>

<option>Studio Ghibli Miniature</option>

<option>Cute Village Miniature</option>

<option>Tiny House Miniature</option>

<option>LoFi Miniature Room</option>

<option>Pastel Miniature</option>

<option>Dreamy Miniature</option>

<option>Ultra Detail Miniature</option>

<option>Viral TikTok Miniature</option>

<option>Moonlight Miniature</option>

<option>Miniature Street Food</option>

<option>Miniature Theme Park</option>

<option>Miniature Convenience Store</option>

<option>Miniature Bookstore</option>

<option>Miniature Flower Shop</option>

<option>Miniature Gaming Room</option>

</select>

<div class="chatbox">

<input
type="text"
id="tema"
placeholder="Minta prompt miniature..."
>

<button class="pink" onclick="generateMiniature()">
↑
</button>

</div>

<div class="actions">

<button class="pink" onclick="copyPrompt()">
Copy
</button>

<button class="pink" onclick="downloadPrompt()">
Download
</button>

<button class="pink" onclick="editText()">
Edit
</button>

<button class="pink" onclick="deleteText()">
Delete
</button>

<button class="black" onclick="toggleDark()">
Dark Mode
</button>

<button class="black" onclick="logout()">
Logout
</button>

</div>

<div id="loading">
Generating Miniature Prompt...
</div>

<div id="hasil"></div>

</div>

</div>

<script>

/* Sakura */

for(let i=0;i<30;i++){

const sakura = document.createElement("div");

sakura.classList.add("sakura");

sakura.innerHTML = "🌸";

sakura.style.left = Math.random()*100 + "vw";

sakura.style.animationDuration =
(Math.random()*5+5)+"s";

sakura.style.fontSize =
(Math.random()*20+10)+"px";

document.body.appendChild(sakura);

}

/* Auth */

function signup(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

if(!username || !password){

alert("Isi username & password");

return;

}

localStorage.setItem("user",
JSON.stringify({
username,
password
}));

alert("Sign Up berhasil ✨");

}

function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

const savedUser =
JSON.parse(localStorage.getItem("user"));

if(
savedUser &&
savedUser.username === username &&
savedUser.password === password
){

localStorage.setItem("login","true");

showDashboard();

}else{

alert("Username / Password salah");

}

}

function logout(){

localStorage.removeItem("login");

location.reload();

}

function showDashboard(){

document.getElementById("auth").style.display="none";

document.getElementById("dashboard").style.display="block";

const savedUser =
JSON.parse(localStorage.getItem("user"));

document.getElementById("welcomeUser")
.innerText =
"Hello, " + savedUser.username;

}

if(localStorage.getItem("login")){
showDashboard();
}

/* Features */

function toggleDark(){
document.body.classList.toggle("dark");
}

function editText(){

let text =
document.getElementById("tema").value;

let newText =
prompt("Edit teks:", text);

if(newText !== null){

document.getElementById("tema").value =
newText;

}

}

function deleteText(){

document.getElementById("tema").value = "";

}

function copyPrompt(){

const text =
document.getElementById("hasil").innerText;

navigator.clipboard.writeText(text);

alert("Prompt copied ✨");

}

function downloadPrompt(){

const text =
document.getElementById("hasil").innerText;

const blob =
new Blob([text],{
type:"text/plain"
});

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download = "miniature-prompt.txt";

a.click();

}

const hasil =
document.getElementById("hasil");

async function generateMiniature(){

const tema =
document.getElementById("tema").value;

const style =
document.getElementById("style").value;

if(!tema) return;

document.getElementById("loading")
.style.display="block";

hasil.innerHTML +=
\`<div class="msg-user">\${tema}</div>\`;

document.getElementById("tema").value="";

const response = await fetch("/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
theme:tema,
style:style
})

});

const data =
await response.json();

document.getElementById("loading")
.style.display="none";

hasil.innerHTML +=
\`<div class="msg-bot">\${data.result}</div>\`;

hasil.scrollTop =
hasil.scrollHeight;

}

document
.getElementById("tema")
.addEventListener("keypress", function(e){

if(e.key==="Enter"){

generateMiniature();

}

});

</script>

</body>
</html>

`);

});

app.post("/generate", (req,res)=>{

const theme = req.body.theme;

const style = req.body.style;

if(!theme){

return res.json({
result:"Masukkan tema miniature dulu 🌸"
});

}

const result =
createPrompt(theme, style);

res.json({
result
});

});

app.listen(3000, ()=>{

console.log("Running on http://localhost:3000");

});
