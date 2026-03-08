const helloBtn = document.getElementById("helloBtn");
const secondBtn = document.getElementById("secondBtn");
const resetBtn = document.getElementById("resetBtn");
const secretBtn = document.getElementById("secretBtn");

const gd = document.getElementById("gd");
const ohwow = document.getElementById("ohwow");

const comboCounter = document.getElementById("comboCounter");
const achievementBox = document.getElementById("achievement");

let combo = 0;
let secretUnlocked = false;
let chaosUsed = false;

// sound effects
const clickSFX = new Audio("click.wav"); // put your mp3 in same folder
const achievementSFX = new Audio("achievement.mp3"); // put your mp3 in same folder

/* combo update */

function updateCombo(){
combo++;
comboCounter.textContent = "Combo: " + combo;

comboCounter.animate([
{ transform:"scale(1)" },
{ transform:"scale(1.2)" },
{ transform:"scale(1)" }
],{duration:200});

if(combo === 1) unlockAchievement("First Click!", "Clicked your first button", "bronze");
if(combo === 5) unlockAchievement("Click click click!", "Get a 5x combo", "bronze");
if(combo === 10) unlockAchievement("Cant stop clicking", "Get a 10x combo", "silver");
if(combo === 50) unlockAchievement("Do you click often?", "Get a 50x combo", "gold")
}

/* achievements */

const achievementContainer = document.getElementById("achievement-container");
const allAchievements = [];

function unlockAchievement(title, description, type="bronze"){

achievementSFX.play();

const box = document.createElement("div");
box.classList.add("achievement");

let icon = "🏅";
if(type==="silver") icon="🥈";
if(type==="gold") icon="🥇";
if(type==="special") icon="🔥";

box.innerHTML = `<div>${icon} ${title}</div><small>${description}</small>`;

achievementContainer.appendChild(box);
allAchievements.push({title, description, icon});

setTimeout(()=>box.classList.add("show"),10);

setTimeout(()=>{
    box.classList.remove("show");
    setTimeout(()=>box.remove(),400);
},3000);

updateAchPage();
}

function updateAchPage(){
const ul = document.getElementById("achList");
ul.innerHTML = ""; // clear
allAchievements.forEach(a=>{
    const li = document.createElement("li");
    li.textContent = `${a.icon} ${a.title}: ${a.description}`;
    ul.appendChild(li);
});
}

const achToggle = document.getElementById("achToggle");
const achPage = document.getElementById("achPage");

achToggle.addEventListener("click", ()=>{
    achPage.classList.toggle("show");
});

/* buttons */

helloBtn.addEventListener("click", function(){

clickSFX.play();
updateCombo();

gd.textContent = "Hello!";
secondBtn.disabled = false;

confetti({particleCount:60,spread:70,origin:{y:0.6}});

});

secondBtn.addEventListener("click",()=>{

updateCombo();

clickSFX.play();

ohwow.textContent="Oh wow!! 🎉";
resetBtn.disabled=false;

confetti({particleCount:150,spread:90});

});

resetBtn.addEventListener("click",()=>{

clickSFX.play();

gd.textContent="";
ohwow.textContent="";

secondBtn.disabled=true;
resetBtn.disabled=true;

secondBtn.textContent="Don't click me yet :3";

// combo is NOT changed

});

/* secret code */

let secretCode="";

document.addEventListener("keydown",e=>{

if(chaosUsed) return;

secretCode += e.key.toLowerCase();

if(secretCode.includes("pancake") && !secretUnlocked){

secretUnlocked = true;
secretBtn.classList.add("show");

unlockAchievement("What did I type?", "Found the secret button", "special");

}

});

/* secret chaos */

secretBtn.addEventListener("click",()=>{

chaosUsed = true;

document.body.classList.add("rainbow");

let waves = 10;

for(let i=0;i<waves;i++){

setTimeout(()=>{
confetti({
particleCount:200,
spread:120,
origin:{x:Math.random(),y:Math.random()}
});
},i*300);

}

/* after chaos ends */

setTimeout(()=>{

document.body.classList.remove("rainbow");

secretBtn.classList.remove("show");

unlockAchievement("Secret Finder", "Pressed the secret button", "special");

},waves*300+500);

});


/* floating particles */

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<60;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*3+1,
speed:Math.random()*0.5+0.2
});
}

function drawParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="rgba(255,255,255,0.5)";

particles.forEach(p=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();

p.y+=p.speed;

if(p.y>canvas.height) p.y=0;
});

requestAnimationFrame(drawParticles);

}

drawParticles();

/* mouse sparkle */

document.addEventListener("mousemove",e=>{

const trail=document.createElement("div");

trail.style.position="fixed";
trail.style.left=e.clientX+"px";
trail.style.top=e.clientY+"px";
trail.style.width="6px";
trail.style.height="6px";
trail.style.background="white";
trail.style.borderRadius="50%";
trail.style.pointerEvents="none";

document.body.appendChild(trail);

setTimeout(()=>trail.remove(),300);

});