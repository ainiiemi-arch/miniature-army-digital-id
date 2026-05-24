<!-- ========================= -->
<!-- VOICE OVER PREMIUM V2 -->
<!-- DOWNLOAD MP3 VERSION -->
<!-- ========================= -->

<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Voice Over Premium</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#f8f1ff,#ead7ff,#d9bfff);
min-height:100vh;
padding:30px;
overflow-x:hidden;
color:#5d4a7d;
}

body::before{
content:'';
position:fixed;
width:500px;
height:500px;
background:#c79cff;
filter:blur(120px);
top:-150px;
left:-150px;
opacity:.4;
z-index:-1;
}

body::after{
content:'';
position:fixed;
width:400px;
height:400px;
background:#ffd6ff;
filter:blur(120px);
bottom:-120px;
right:-120px;
opacity:.5;
z-index:-1;
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
font-size:60px;
font-weight:700;
color:#8b5cf6;
text-shadow:0 5px 20px rgba(139,92,246,.3);
}

.title p{
margin-top:10px;
font-size:18px;
color:#7d6d9b;
}

.badge{
display:inline-block;
margin-top:15px;
padding:10px 20px;
border-radius:50px;
background:#efe3ff;
color:#7c3aed;
font-weight:600;
font-size:14px;
}

.grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:25px;
}

.card{
background:rgba(255,255,255,.55);
backdrop-filter:blur(15px);
border-radius:30px;
padding:25px;
box-shadow:0 10px 30px rgba(0,0,0,.08);
border:1px solid rgba(255,255,255,.4);
}

.card h2{
font-size:22px;
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
color:#666;
box-shadow:inset 0 2px 10px rgba(0,0,0,.05);
}

.label{
display:block;
margin-bottom:10px;
font-weight:600;
font-size:14px;
}

select,
input[type=range]{
width:100%;
margin-bottom:20px;
}

select{
padding:15px;
border:none;
border-radius:15px;
background:white;
font-size:15px;
color:#555;
}

.styles{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
gap:15px;
margin-top:25px;
}

.style-card{
background:white;
padding:15px;
border-radius:20px;
text-align:center;
transition:.3s;
cursor:pointer;
border:2px solid transparent;
}

.style-card:hover{
transform:translateY(-5px);
border-color:#c084fc;
}

.style-card img{
width:70px;
height:70px;
border-radius:50%;
object-fit:cover;
margin-bottom:10px;
}

.style-card h3{
font-size:15px;
color:#7c3aed;
}

.buttons{
display:flex;
gap:15px;
margin-top:25px;
flex-wrap:wrap;
}

button{
border:none;
padding:16px 25px;
border-radius:50px;
font-size:15px;
font-weight:600;
cursor:pointer;
transition:.3s;
}

.generate-btn{
background:linear-gradient(90deg,#a855f7,#7c3aed);
color:white;
box-shadow:0 10px 20px rgba(124,58,237,.3);
}

.download-btn{
background:white;
color:#7c3aed;
}

.history-btn{
background:#f2e8ff;
color:#7c3aed;
}

button:hover{
transform:scale(1.05);
}

.audio-box{
margin-top:30px;
background:white;
padding:20px;
border-radius:25px;
text-align:center;
}

audio{
width:100%;
margin-top:15px;
}

.features{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:20px;
margin-top:40px;
}

.feature{
background:rgba(255,255,255,.55);
backdrop-filter:blur(10px);
padding:20px;
border-radius:25px;
text-align:center;
}

.feature h4{
margin-top:10px;
color:#7c3aed;
}

.footer{
margin-top:50px;
text-align:center;
font-size:14px;
color:#8a7aa8;
}

@media(max-width:900px){

.grid{
grid-template-columns:1fr;
}

.title h1{
font-size:42px;
}

}

</style>
</head>

<body>

<div class="container">

<div class="title">
<h1>Voice Over Premium</h1>
<p>Aesthetic Pastel Lilac Kpoper Style 💜</p>

<div class="badge">
Natural • Cute • Kpop Idol • Premium
</div>

</div>

<div class="grid">

<!-- LEFT -->

<div class="card">

<h2>🎤 Input Script</h2>

<textarea id="text">
Halo semuanya~
Selamat datang di voice over premium aesthetic.
Semoga harimu menyenangkan 💜
</textarea>

<div class="buttons">

<button class="generate-btn" onclick="generateVoice()">
✨ Generate Voice
</button>

<button class="download-btn" onclick="downloadMp3()">
⬇ Download MP3
</button>

<button class="history-btn">
🕘 Save Project
</button>

</div>

<div class="audio-box">

<h3>Preview Audio</h3>

<audio controls id="audioPlayer"></audio>

</div>

</div>

<!-- RIGHT -->

<div class="card">

<h2>⚙️ Pengaturan Voice</h2>

<label class="label">Bahasa</label>

<select id="language">
<option value="id-ID">Indonesia</option>
<option value="en-US">English</option>
<option value="ko-KR">Korean</option>
<option value="ja-JP">Japanese</option>
</select>

<label class="label">Style Voice</label>

<select id="voiceStyle">
<option>Natural Female</option>
<option>Kpop Idol Girl</option>
<option>Soft Anime</option>
<option>Deep Narrator</option>
<option>Warm Cute</option>
<option>Elegant Premium</option>
</select>

<label class="label">Speed</label>

<input type="range" id="speed" min="0.5" max="2" step="0.1" value="1">

<label class="label">Pitch</label>

<input type="range" id="pitch" min="0.5" max="2" step="0.1" value="1">

<div class="styles">

<div class="style-card">
<img src="https://i.pinimg.com/564x/47/70/7d/47707d2a8f5d3f32f78eaf7db92a4d8d.jpg">
<h3>Natural</h3>
</div>

<div class="style-card">
<img src="https://i.pinimg.com/564x/6c/07/37/6c07379a73f8e5afbf03a6d4240e3533.jpg">
<h3>Cute</h3>
</div>

<div class="style-card">
<img src="https://i.pinimg.com/564x/70/4e/65/704e652c50c56dc33d4a06c7e8d16d08.jpg">
<h3>Kpop</h3>
</div>

<div class="style-card">
<img src="https://i.pinimg.com/564x/4d/7f/83/4d7f838df60216791db6a18ec7dc80d6.jpg">
<h3>Soft</h3>
</div>

</div>

</div>

</div>

<!-- FEATURES -->

<div class="features">

<div class="feature">
<h4>🎧 Premium Audio</h4>
<p>Natural dan realistis</p>
</div>

<div class="feature">
<h4>⚡ Fast Generate</h4>
<p>Proses lebih cepat</p>
</div>

<div class="feature">
<h4>💾 Save Project</h4>
<p>Simpan script voice</p>
</div>

<div class="feature">
<h4>🌏 Multi Language</h4>
<p>Indonesia, Korea, Jepang</p>
</div>

<div class="feature">
<h4>⬇ Download MP3</h4>
<p>Download hasil audio</p>
</div>

</div>

<div class="footer">
Made with 💜 Aesthetic Kpoper Style
</div>

</div>

<script>

let utterance;

function generateVoice(){

const text = document.getElementById("text").value;
const language = document.getElementById("language").value;
const speed = document.getElementById("speed").value;
const pitch = document.getElementById("pitch").value;

utterance = new SpeechSynthesisUtterance(text);

utterance.lang = language;
utterance.rate = speed;
utterance.pitch = pitch;

speechSynthesis.speak(utterance);

alert("✨ Voice berhasil diputar!");

}

function downloadMp3(){

alert("⚠ Browser SpeechSynthesis tidak bisa download MP3 asli.\n\nUntuk versi REAL MP3 gunakan ElevenLabs API atau OpenAI TTS API.");

}

</script>

</body>
</html>
