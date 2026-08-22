const deck=[['A','♠'],['K','♠'],['Q','♠'],['J','♠'],['10','♥'],['9','♥'],['8','♥'],['7','♥'],['A','♦'],['K','♦'],['Q','♦'],['J','♦'],['A','♣'],['K','♣'],['Q','♣'],['J','♣']];
const B=document.getElementById('board');
const S=document.getElementById('status');
const A=document.getElementById('action');
const C=document.getElementById('confirm');
const R=document.getElementById('reset');
const O=document.getElementById('overlay');
const CNT=document.getElementById('count');
const FS=document.getElementById('fs');
let M=Array.from({length:4},()=>Array(4).fill(0)),phase='setup',treasure=null;
function draw(){B.innerHTML='';for(let r=0;r<4;r++)for(let c=0;c<4;c++){let i=r*4+c,d=document.createElement('div');d.className='card'+(M[r][c]?' up':'');if(phase==='treasure'&&treasure&&treasure[0]===r&&treasure[1]===c)d.classList.add('treasure');d.innerHTML=`<div class="inner"><img class="face back" src="img/back.svg"><img class="face front" src="img/card_${i}.svg"></div>`;d.onclick=()=>clickCard(r,c);B.appendChild(d);}}
function clickCard(r,c){if(phase==='setup'){M[r][c]^=1;draw();return;}if(phase==='treasure'){treasure=[r,c];draw();return;}if(phase==='guess'){phase='end';S.textContent=(r===treasure[0]&&c===treasure[1])?'🎉 Tesoro trovato!':'❌ Tesoro non trovato.';R.classList.remove('hidden');}}
function err(){return 8*((M[2].reduce((a,b)=>a+b)+M[3].reduce((a,b)=>a+b))%2)+4*((M[1].reduce((a,b)=>a+b)+M[3].reduce((a,b)=>a+b))%2)+2*(([0,1,2,3].reduce((s,i)=>s+M[i][2]+M[i][3],0))%2)+(([0,1,2,3].reduce((s,i)=>s+M[i][1]+M[i][3],0))%2);}
A.onclick=()=>{phase='treasure';S.textContent='Clicca una carta per scegliere il tesoro, poi premi Conferma tesoro.';A.classList.add('hidden');C.classList.remove('hidden');draw();};
C.onclick=()=>{if(!treasure){S.textContent='Scegli prima una carta.';return;}let[i,j]=treasure;M[i][j]^=1;let x=err();M[i][j]^=1;let rr=Math.floor(x/4),cc=x%4;phase='anim';C.disabled=true;O.classList.remove('hidden');let t=3;CNT.textContent=t;let id=setInterval(()=>{t--;if(t>0)CNT.textContent=t;else{clearInterval(id);O.classList.add('hidden');setTimeout(()=>{M[rr][cc]^=1;draw();phase='guess';S.textContent='Il primo mago ha girato una carta. Ora il secondo mago sceglie il tesoro.';C.classList.add('hidden');},500);}},1000);};
R.onclick=()=>location.reload();
FS.onclick=()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen();};
draw();