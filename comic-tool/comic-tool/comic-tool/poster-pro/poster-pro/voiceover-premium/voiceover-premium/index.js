const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const gTTS = require("gtts");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/generate", async (req, res) => {

    try {

        const text = req.body.text;

        if (!text) {

            return res.status(400).json({
                success:false,
                error:"Text kosong"
            });

        }

        const filename = "voice_" + Date.now() + ".mp3";

        const filepath = path.join(__dirname, filename);

        const gtts = new gTTS(text, "id");

        gtts.save(filepath, function(err){

            if(err){

                return res.status(500).json({
                    success:false,
                    error:"Gagal generate audio"
                });

            }

            return res.json({
                success:true,
                audio:filename
            });

        });

    } catch(err){

        return res.status(500).json({
            success:false,
            error:err.message
        });

    }

});

app.get("/", (req,res)=>{

res.send(`

<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Aeniikoo Voice Maker</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{

background:
linear-gradient(rgba(245,233,255,.92),rgba(233,213,255,.92)),
url('https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1974&auto=format&fit=crop');

background-size:cover;
background-position:center;
background-attachment:fixed;

min-height:100vh;
padding:25px;
overflow-x:hidden;
color:#6b21a8;

}

.container{

max-width:1200px;
margin:auto;

}

.title{

text-align:center;
margin-bottom:40px;

}

.title h1{

font-size:58px;
font-weight:700;
color:#8b5cf6;
text-shadow:0 5px 20px rgba(139,92,246,.4);

}

.title p{

margin-top:10px;
font-size:18px;
font-weight:500;

}

.grid{

display:grid;
grid-template-columns:1fr 1fr;
gap:25px;

}

.card{

background:rgba(255,255,255,.5);
backdrop-filter:blur(20px);
padding:25px;
border-radius:30px;
box-shadow:0 10px 30px rgba(0,0,0,.08);
border:1px solid rgba(255,255,255,.4);

}

.card h2{

margin-bottom:20px;
color:#7c3aed;

}

textarea{

width:100%;
height:220px;
border:none;
outline:none;
resize:none;
padding:20px;
border-radius:20px;
font-size:15px;
background:white;
color:#555;

}

select{

width:100%;
padding:15px;
border:none;
border-radius:15px;
margin-bottom:20px;
font-size:15px;

}

button{

border:none;
padding:16px 28px;
border-radius:50px;
font-size:15px;
font-weight:600;
cursor:pointer;
transition:.3s;

}

.generate-btn{

background:linear-gradient(90deg,#a855f7,#7c3aed);
color:white;
width:100%;
margin-top:20px;
box-shadow:0 10px 20px rgba(124,58,237,.3);

}

.generate-btn:hover{

transform:scale(1.03);

}

audio{

width:100%;
margin-top:25px;

}

.download{

margin-top:20px;
display:none;

}

.download a{

display:block;
text-align:center;
padding:15px;
background:#8b5cf6;
color:white;
text-decoration:none;
border-radius:50px;
font-weight:600;

}

.loading{

display:none;
margin-top:20px;
text-align:center;
font-weight:600;

}

.features{

display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:20px;
margin-top:30px;

}

.feature{

background:rgba(255,255,255,.5);
padding:20px;
border-radius:25px;
text-align:center;

}

.feature h3{

margin-bottom:10px;

}

.sakura{

position:fixed;
top:-10px;
font-size:24px;
animation:fall linear infinite;
z-index:999;

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

@media(max-width:900px){

.grid{

grid-template-columns:1fr;

}

.title h1{

font-size:40px;

}

}

</style>

</head>

<body>

<div class="container">

<div class="title">

<h1>🌸 Aeniikoo Voice Maker</h1>
<p>Pastel Lilac Sakura Kpoper Aesthetic ✨</p>

</div>

<div class="grid">

<div class="card">

<h2>🎤 Input Script</h2>

<textarea id="text">
Halo semuanya~
Selamat datang di Aeniikoo Voice Maker 💜🌸
</textarea>

<button class="generate-btn" onclick="generateVoice()">
Generate Voice Over
</button>

<div class="loading" id="loading">
Generating Premium Audio...
</div>

<audio controls id="audio"></audio>

<div class="download" id="download">

<a id="downloadLink" download>
⬇ Download MP3
</a>

</div>

</div>

<div class="card">

<h2>⚙️ Voice Settings</h2>

<select>
<option>Natural Female</option>
<option>Kpop Idol</option>
<option>Soft Anime</option>
<option>Cute Girl</option>
<option>Deep Narrator</option>
</select>

<select>
<option>Indonesia</option>
<option>English</option>
<option>Korean</option>
<option>Japanese</option>
</select>

<div class="features">

<div class="feature">
<h3>🎧 Premium</h3>
<p>Natural Voice</p>
</div>

<div class="feature">
<h3>⚡ Fast</h3>
<p>Quick Generate</p>
</div>

<div class="feature">
<h3>⬇ MP3</h3>
<p>Download Audio</p>
</div>

<div class="feature">
<h3>🌍 Multi</h3>
<p>Multi Language</p>
</div>

</div>

</div>

</div>

</div>

<script>

async function generateVoice(){

const text = document.getElementById("text").value;

if(text.trim() === ""){

alert("Isi text terlebih dahulu");

return;

}

document.getElementById("loading").style.display = "block";

try{

const response = await fetch("/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
text:text
})

});

const data = await response.json();

document.getElementById("loading").style.display = "none";

if(data.success){

const audio = document.getElementById("audio");

audio.src = "/" + data.audio;

audio.load();

audio.play();

document.getElementById("download").style.display = "block";

document.getElementById("downloadLink").href = "/" + data.audio;

}else{

alert(data.error);

}

}catch(err){

document.getElementById("loading").style.display = "none";

alert("Server Error");

}

}

function createSakura(){

const sakura = document.createElement("div");

sakura.classList.add("sakura");

sakura.innerHTML = "🌸";

sakura.style.left = Math.random() * window.innerWidth + "px";

sakura.style.animationDuration =
(Math.random() * 5 + 5) + "s";

document.body.appendChild(sakura);

setTimeout(()=>{

sakura.remove();

},10000);

}

setInterval(createSakura,300);

</script>

</body>
</html>

`);

});

app.listen(PORT, ()=>{

console.log("🌸 Aeniikoo Voice Maker Running");
console.log("http://localhost:" + PORT);

});
