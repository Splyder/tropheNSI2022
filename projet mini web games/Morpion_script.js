let game=0;
let game_run=true;
let L=[0,0,0,0,0,0,0,0,0];
let texte1="C'est aux cercles de jouer.";
let texte2="C'est aux croix de jouer.";
let texte3="Les cercles ont gagnés";
let texte4="Les croix ont gagnés";

function morpion_click(id){
  if (game_run){
    number=parseInt(id.substr(-1));
    if(L[number-1]==0){  
      if(game%2==1){
        document.getElementById(id).style.backgroundImage = "url(images/croix.png)";
        document.getElementById("paragraphe_player").innerHTML = texte1;
        L[number-1]++;
        L[number-1]++;
      }else{
        document.getElementById(id).style.backgroundImage = "url(images/cercle.png)";
        document.getElementById("paragraphe_player").innerHTML = texte2;
        L[number-1]++;
      }
    game++;
    let v=verifier();
    if(v==1){
      document.getElementById("paragraphe_player").innerHTML = texte3;
      document.getElementById("abandonner_button").innerHTML = "Rejouer";
      game_run=false;
    }
    else if(v==2){
      document.getElementById("paragraphe_player").innerHTML = texte4;
      document.getElementById("abandonner_button").innerHTML = "Rejouer";
      game_run=false;
    }  
    else if(game==9){
      document.getElementById("paragraphe_player").innerHTML = "Match nul!";
      document.getElementById("abandonner_button").innerHTML = "Rejouer";
      game_run=false;
    }
    }
  }
}


function verifier(){
  for (let i = 1; i < 3; i++) {
    if(L[0]==i&&L[1]==i&&L[2]==i){return(i);}
    else if(L[3]==i&&L[4]==i&&L[5]==i){return(i);}
    else if(L[6]==i&&L[7]==i&&L[8]==i){return(i);}
    else if(L[0]==i&&L[3]==i&&L[6]==i){return(i);}
    else if(L[1]==i&&L[4]==i&&L[7]==i){return(i);}
    else if(L[2]==i&&L[5]==i&&L[8]==i){return(i);}
    else if(L[0]==i&&L[4]==i&&L[8]==i){return(i);}
    else if(L[2]==i&&L[4]==i&&L[6]==i){return(i);}
}
}

function reinitialiser(){
  let button_id_list=["morpion_button1","morpion_button2","morpion_button3","morpion_button4","morpion_button5","morpion_button6","morpion_button7","morpion_button8","morpion_button9"];
  for (let i = 0; i < 9; i++) {
    document.getElementById(button_id_list[i]).style.backgroundImage = "url(images/vide.png)";
  }
  game=0;
  game_run=true;
  document.getElementById("paragraphe_player").innerHTML = texte1;
  document.getElementById("abandonner_button").innerHTML = "Abandonner";
  for (let i = 0; i < 9; i++) {
    L[i]=0;
  }
}