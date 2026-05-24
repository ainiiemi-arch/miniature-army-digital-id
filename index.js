const express = require("express");

const app = express();

app.use(express.json());

function createPrompt(theme, style){

theme = theme.toLowerCase();

return `
✨ ${style} Miniature Prompt

ultra detailed ${style} miniature ${theme}, cute chibi characters, handcrafted diorama, cinematic lighting, kawaii pastel aesthetic, adorable tiny world, realistic miniature objects, tilt shift effect, cozy atmosphere, highly detailed, aesthetic composition, 4k ultra hd

Negative Prompt:
low quality, blur, distorted anatomy, ugly lighting, watermark
`;

}

app.get("/", (req,res)=>{

res.send(`

<!DOCTYPE html>
<html>

<head>

<title>Miniature Army Digital ID</title>

<style>

body{
margin:0;
padding:0;
font-family:sans-serif;
background:linear-gradient(135deg,#ffd6e7,#fff);
height:100vh;
display:flex;
justify-content:center;
align-items:center;
transition:0.3s;
}

.dark{
background:#111;
color:white;
}

.box{
width:90%;
max-width:550px;
background:rgba(255,255,255,0.7);
backdrop-filter:blur(10px);
padding:25px;
border-radius:30px;
box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

h1{
text-align:center;
color:#ff4fa3;
}

.chatbox{
display:flex;
align-items:center;
background:#f5f5f5;
border-radius:50px;
padding:10px;
margin-top:20px;
}

.chatbox input{
flex:1;
border:none;
background:transparent;
outline:none;
padding:10px;
font-size:16px;
}

.chatbox button{
width:50px;
height:50px;
border:none;
border-radius:50%;
background:black;
color:white;
font-size:20px;
cursor:pointer;
}

.actions{
display:flex;
gap:10px;
margin-top:15px;
flex-wrap:wrap;
}

.actions button,
select{
flex:1;
padding:12px;
border:none;
border-radius:12px;
background:#ff4fa3;
color:white;
font-weight:bold;
cursor:pointer;
}

#hasil{
margin-top:20px;
max-height:400px;
overflow-y:auto;
padding:5px;
}

.msg-user{
background:#ffeaf4;
padding:12px;
border-radius:15px;
margin-top:10px;
text-align:right;
}

.msg-bot{
background:white;
padding:15px;
border-radius:15px;
margin-top:10px;
border:1px solid #eee;
white-space:pre-wrap;
}

.dark .msg-bot{
background:#222;
color:white;
}

#loading{
display:none;
text-align:center;
margin-top:10px;
font-weight:bold;
animation:pulse 1s infinite;
}

@keyframes pulse{
0%{opacity:0.3;}
50%{opacity:1;}
100%{opacity:0.3;}
}

</style>

</head>

<body>

<div class="box">

<h1>Miniature Army Digital ID</h1>

<p style="text-align:center;">by Aeniikoo ✨</p>

<div class="chatbox">

<input
type="text"
id="tema"
placeholder="Minta prompt miniature..."
>

<button onclick="generateMiniature()">
↑
</button>

</div>

<div class="actions">

<select id="style">
<option value="Anime">Anime</option>
<option value="Ghibli">Ghibli</option>
<option value="Pixar">Pixar</option>
<option value="Realistic">Realistic</option>
<option value="Cyberpunk">Cyberpunk</option>
</select>

<button onclick="copyPrompt()">
Copy
</button>

<button onclick="downloadPrompt()">
Download
</button>

<button onclick="toggleDark()">
Dark
</button>

<button onclick="editText()">
Edit
</button>

<button onclick="deleteText()">
Delete
</button>

</div>

<div id="loading">
Generating Prompt...
</div>

<div id="hasil"></div>

</div>

<script>

function toggleDark(){
document.body.classList.toggle("dark");
}

function editText(){

let text = document.getElementById("tema").value;

let newText = prompt("Edit teks:", text);

if(newText !== null){
document.getElementById("tema").value = newText;
}

}

function deleteText(){
document.getElementById("tema").value = "";
}

function copyPrompt(){

const text = document.getElementById("hasil").innerText;

navigator.clipboard.writeText(text);

alert("Prompt copied ✨");

}

function downloadPrompt(){

const text = document.getElementById("hasil").innerText;

const blob = new Blob([text], {type:"text/plain"});

const a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "prompt.txt";

a.click();

}

const hasil = document.getElementById("hasil");

async function generateMiniature(){

const tema = document.getElementById("tema").value;

const style = document.getElementById("style").value;

if(!tema) return;

document.getElementById("loading").style.display = "block";

hasil.innerHTML += \`
<div class="msg-user">\${tema}</div>
\`;

document.getElementById("tema").value = "";

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

const data = await response.json();

document.getElementById("loading").style.display = "none";

hasil.innerHTML += \`
<div class="msg-bot">\${data.result}</div>
\`;

hasil.scrollTop = hasil.scrollHeight;

let history = JSON.parse(localStorage.getItem("history")) || [];

history.push(tema);

localStorage.setItem("history", JSON.stringify(history));

}

document
.getElementById("tema")
.addEventListener("keypress", function(e){

if(e.key === "Enter"){
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

const style = req.body.style || "Realistic";

if(!theme){

return res.json({
result:"Masukkan tema miniature dulu ✨"
});

}

const result = createPrompt(theme, style);

res.json({
result:result
});

});

app.listen(3000, ()=>{

console.log("Running on http://localhost:3000");

});
