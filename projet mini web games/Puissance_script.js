let game=0;
let game_run=true;
let L=[0,0,0,0,0,0,0
      ,0,0,0,0,0,0,0
      ,0,0,0,0,0,0,0
      ,0,0,0,0,0,0,0
      ,0,0,0,0,0,0,0
      ,0,0,0,0,0,0,0];
let texte1="C'est aux jaunes de jouer.";
let texte2="C'est aux rouges de jouer.";
let texte3="Les jaunes ont gagnés.";
let texte4="Les rouges ont gagnés.";

function puissance4_click(id){
  if (game_run){
    number=parseInt(id.substr(-1));
    if(game%2==1){p=1}else{p=2}
    if(L[number+35]==0){tuile=number+35;}
    else if(L[number+28]==0){tuile=number+28;}
    else if(L[number+21]==0){tuile=number+21;}
    else if(L[number+14]==0){tuile=number+14;}
    else if(L[number+7]==0){tuile=number+7;}
    else if(L[number]==0){tuile=number;}
    else{tuile=-1;}
    if(tuile>-1){
      placer(tuile);
      L[tuile]=p;
      game++;
      if(verifier(p)){console.log(verifier(p));ecrire("La partie est finie");game_run=false;}
      else if(game==42){ecrire("La partie est finie");game_run=false;}
    }
  }
}

function reinitialiser(){
  for (let i = 0; i < 42; i++) {
    if(i<=9){id="tuile0"+i.toString();}else{id="tuile"+i.toString();}
    document.getElementById(id).style.backgroundColor="white";
    L[i]=0;
  }
  game_run=true
}

function verifier(){
  let x=false;
  if(game%2==1){let p=1;}else{let p=2;}
  for(let i = 0; i < 42; i++){
    if(i%7<4){
      if(L[i]==p&&L[i+1]==p&&L[i+2]==p&&L[i+3]==p){x++;}
    }
    if(i%7<4&&i<=18){
      if(L[i]==p&&L[i+8]==p&&L[i+16]==p&&L[i+24]==p){x++;}
    }
    if(i<=18){
      if(L[i]==p&&L[i+7]==p&&L[i+14]==p&&L[i+21]==p){x++;}
    }
    if(i%7>2&&2<i<21){
      if(L[i]==p&&L[i+6]==p&&L[i+12]==p&&L[i+18]==p){x++;}
    }
  }console.log(p);
  return(x>0)
}

function placer(x){
  if(x<=9){id="tuile0"+x.toString();}else{id="tuile"+x.toString();}
  if(game%2==1){
    document.getElementById(id).style.backgroundColor="red";
    ecrire(texte1);
  }
  else{
    document.getElementById(id).style.backgroundColor="yellow";
    ecrire(texte2);
  }
}

function ecrire(texte){
  document.getElementById("paragraphe_player").innerHTML = texte;
}