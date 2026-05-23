const express = require("express");

const app = express();

app.use(express.json());

function createPrompt(theme) {

theme = theme.toLowerCase();

if (theme.includes("video")) {

return `
🎬 Miniature Video Prompt by Aeniikoo

Create a cinematic miniature video scene of ${theme}, tiny cute chibi characters interacting, handcrafted diorama, kawaii pastel aesthetic, realistic miniature objects, cozy lighting, tilt shift effect, cinematic camera movement, ultra detailed, adorable atmosphere.

Negative Prompt:
blurry, low quality, ugly motion, bad lighting, distorted characters, watermark
`;

} else if (theme.includes("anime")) {

return `
🌸 Anime Miniature Prompt

ultra detailed anime style miniature ${theme}, cute chibi anime characters, kawaii pastel aesthetic, handcrafted diorama, cinematic miniature photography, realistic textures, adorable tiny world, cozy atmosphere

Negative Prompt:
low quality, blurry, ugly face, distorted anatomy
`;

} else {

return `
✨ Miniature Prompt Generator

ultra detailed miniature ${theme}, cute chibi characters, handcrafted diorama, kawaii pastel aesthetic, adorable miniature world, tiny realistic objects, cinematic miniature photography, soft lighting, tilt shift effect, cozy atmosphere, highly detailed, toy photography style, realistic textures, warm pastel colors, aesthetic composition, 4k ultra hd

Negative Prompt:
low quality, blur, messy background, watermark, distorted objects
`;

}

}

app.get("/", (req, res) => {

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
background:#ffd6e7;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
}

.box{
width:90%;
max-width:500px;
background:white;
padding:25px;
border-radius:30px;
box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

h1{
text-align:center;
color:#ff4fa3;
}

p{
text-align:center;
color:gray;
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
}

.actions button{
flex:1;
padding:10px;
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

</style>
</head>

<body>

<div class="box">

<h1>Miniature Army Digital ID</h1>

<p>by Aeniikoo ✨</p>

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

<button onclick="editText()">
Edit
</button>

<button onclick="deleteText()">
Delete
</button>

</div>

<div id="hasil"></div>

</div>

<script>

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

const hasil = document.getElementById("hasil");

async function generateMiniature(){

const tema = document.getElementById("tema").value;

if(!tema) return;

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
theme:tema
})

});

const data = await response.json();

hasil.innerHTML += \`
<div class="msg-bot">\${data.result}</div>
\`;

hasil.scrollTop = hasil.scrollHeight;

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

app.post("/generate", (req, res) => {

const theme = req.body.theme;

if(!theme){

return res.json({
result:"Masukkan tema miniature dulu ✨"
});

}

const result = createPrompt(theme);

res.json({
result:result
});

});

app.listen(3000, () => {

console.log("Running on http://localhost:3000");

});
