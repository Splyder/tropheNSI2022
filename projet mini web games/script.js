let image_list=["url(images/1.png)","url(images/2.png)","url(images/3.png)","url(images/4.png)","url(images/5.png)","url(images/6.png)","url(images/7.png)","url(images/8.png)","url(images/9.png)","url(images/10.png)","url(images/11.png)","url(images/12.png)","url(images/13.png)","url(images/14.png)","url(images/15.png)","url(images/16.png)","url(images/17.png)","url(images/18.png)"];
let image_de_base="url(images/test.png)"
let button_id_list=["memory_tuile_button01","memory_tuile_button02","memory_tuile_button03","memory_tuile_button04","memory_tuile_button05","memory_tuile_button06","memory_tuile_button07","memory_tuile_button08","memory_tuile_button09","memory_tuile_button10","memory_tuile_button11","memory_tuile_button12","memory_tuile_button13","memory_tuile_button14","memory_tuile_button15","memory_tuile_button16","memory_tuile_button17","memory_tuile_button18","memory_tuile_button19","memory_tuile_button20","memory_tuile_button21","memory_tuile_button22","memory_tuile_button23","memory_tuile_button24","memory_tuile_button25","memory_tuile_button26","memory_tuile_button27","memory_tuile_button28","memory_tuile_button29","memory_tuile_button30","memory_tuile_button31","memory_tuile_button32","memory_tuile_button33","memory_tuile_button34","memory_tuile_button35","memory_tuile_button36"];
//L est la liste des images correspondante à chaque tuile, elle est remplie et désordonnée dans la fonction play_memory()
let L=[];
//game est une variable qui nous permet de savoir si une partie est en cours (false lorsqu'une partie est en cours)
let game=true;
//liste_paire_trouve est une liste contenant l'ensemble des images déjà trouvé par le joueur
let liste_paire_trouve=[];
//last_pressed contient le nom de l'image de la tuile précédemment pressée
let last_pressed=null;
//last_pressed_number contient le numéro de l'id de la tuile précédemment pressée
let last_pressed_number=null;
//sec et min sont les variables qui contiennent les données du chronometre. 
let sec = 0;
let min = 0;
//seconde_value est la valeur d'une seconde. Cette variable est utile pour faire semblant qu'on à stoppé le chronometre
let seconde_value=1;
//time loop est false quand le systeme de chronometre est desactivé
let time_loop=false;
let texte1="A vous de jouer";
let texte2="La partie précédente n'est pas terminée";
let texte3="vous avez abandonné !";
let texte4="Aucune partie n'est en cours.";
let texte5="partie terminée";
let texte6="ce n'est pas une paire.";


//Cette fonction est appelée par le bouton Start Game, elle a pour but, si aucune partie n'est en cours de debuter une partie
function play_memory(){
  //cette condition verifie qu'une partie ne soit pas en cours
  if(game){
    //on remet à 0 le chronometre
    sec=0;
    min=0;
    //on remet en route le chronometre
    seconde_value=1;
    //on remplit la liste L avec 2 fois la liste image_list
    L=image_list.concat(image_list);
    //on melange aléatoirement la liste L
    L.sort(()=> Math.random() - 0.5);
    //on modifie game pour dire que la partie est en cours
    game=false;
    //on active le systeme de chronometre si il n'est pas encore activé
    if(!time_loop){temps();time_loop=true;}
  }else{
    alert(texte2);
  } 
}

//fonction appelé par le bouton Abandonner
function abandonner(){
  //vérifie si une partie est en cours
  if(game==false){
    //on arete la partie
    game=true;
    alert(texte3);
    //on vide la barre d'avancement
    document.getElementById("chargement").value=0;
    cacher();
    //on arête le chronometre
    seconde_value=0;
  }else{alert(texte4);}
  liste_paire_trouve=[];
}

//fonction qui verifie si element est present au sein de L
function appartient(element,L){
  //on verifie que L soit remplie
  if (L!=null){
    //count est une variable contenant le nombre de fois où element est present au sein de L
    let count=0;
    //pour chaque element dans L, on verifie si c'est == à element (si c'est le cas, on rajoute 1 à count)
    for(var i=0; i<L.length; i++) {
	    if(element === L[i]) {count+=1;}
	  }
    //si count==0, element n'est pas présent dans L donc on return false. Sinon on renvoie true
    if(count==0){return(false)}else{return(true)};
  }
}

//fonction enclenché dès qu'on clique sur une des tuiles du memory
function memory_button(id){
  //on verifie si une partie est en cours
  if(game==false){
    //on recupere le chiffre present à la fin de l'id du bouton
    number=parseInt(id.substr(-2));
    document.getElementById(button_id_list[number-1]).style.backgroundImage = L[number-1];
    //on regarde si une tuille à déjà été pressé
    if(last_pressed===null){
      if(appartient(L[number-1],liste_paire_trouve)){alert("vous avez déja trouvé cette paire");}
      else{last_pressed=L[number-1];last_pressed_number=number;}}
    //on regarde si la tuile déjà pressé a la meme image quecelle qui vient d'etre pressé et que les deux tuiles ne soient pas les mêmes
    else if(last_pressed==L[number-1]&&number!=last_pressed_number){
      document.getElementById(button_id_list[number-1]).className = "find";
      document.getElementById(button_id_list[last_pressed_number-1]).className = "find";
      last_pressed_number=null;last_pressed=null;liste_paire_trouve.push(L[number-1]);
      document.getElementById("chargement").value = (liste_paire_trouve.length) * (100/18);
      if (liste_paire_trouve.length==18){
        document.getElementById("chargement").value=100;
        seconde_value=0;
        
        alert(alert(texte5));game=true;}                          
    }
      //la deuxieme tuile pressé n'a pas la meme image que la première donc on retourne les deux images
    else{
      document.getElementById(button_id_list[last_pressed_number-1]).style.backgroundImage = image_de_base;
      document.getElementById(button_id_list[number-1]).style.backgroundImage =image_de_base ;
         last_pressed=null;
         last_pressed_number=null;
         alert(texte6)}
  }
}
//fonction qui change l'image de chaque tuile en la tuile de base
function cacher(){
  for (let pas = 0; pas < 36; pas++) {
      document.getElementById(button_id_list[pas]).style.backgroundImage = image_de_base;
    }
}

//révèle l'image de chaque tuille selon la liste L
function reveler(){
  //on verifie que L soit remplis (donc qu'il y ai une image pour chaque id)
  if(L!=null){
    for (let pas = 0; pas < 36; pas++) {
      document.getElementById(button_id_list[pas]).style.backgroundImage = L[pas];
    }
  }
}

//fonction permettant de changer le texte dans le paragraphe au dessus du memory
function ecrire(texte){
  document.getElementById('game_text').innerText = texte; 
}

function delai(milliseconds){
 var start = new Date().getTime();
 var end=0;
 while( (end-start) < milliseconds){
     end = new Date().getTime();
 }
}


//code pour le systeme
function temps(){
  let h2 = document.getElementsByTagName('h2')[0];
  let t;

  function tick(){
    sec=sec+seconde_value;
    if (sec >= 60) {
      sec = 0;
      min++;
      if (min >= 60) {
        min = 0;
      }
    }
  }
  
  function add(){
    tick();
    h2.textContent =(min > 9 ? min : "0" + min)+ ":" + (sec > 9 ? sec : "0" + sec);
    timer();
  }
  
  function timer() {
    t = setTimeout(add, 1000);
  }
  
  timer();
}