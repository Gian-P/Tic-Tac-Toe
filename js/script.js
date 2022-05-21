let Mark_choice_container = document.getElementById("Mark_choice_container");

let orange = document.getElementById("orange");
let svg_s = document.getElementsByTagName("path");
let estilos = document.styleSheets;

let players_choice_x = document.getElementById("player's_choice_x");
let players_choice_o = document.getElementById("player's_choice_o");
 
players_choice_x.addEventListener("click",CheckChoice); 

players_choice_o.addEventListener("click",CheckChoice);

function CheckChoice(e){
  let choice = null;
  let Current_Choice = Mark_choice_container.className.charAt(13);
  try{
    choice = e.target.className.charAt(20);
  }catch{
    choice = e.target.className.baseVal;
  }
  if(choice === Current_Choice) return;

  if(choice === "x"){
  estilos[0].cssRules[3].styleSheet.rules[16].selectorText = ".game-menu-marks .mark-choices.x:after";
  Mark_choice_container.className = "mark-choices x";

  svg_s[0].setAttribute("fill","#1F3641");
  svg_s[1].setAttribute("fill","#A8BFC9");
  }
  if(choice === "o"){
    estilos[0].cssRules[3].styleSheet.rules[16].selectorText = ".game-menu-marks .mark-choices.o:after";
    Mark_choice_container.className = "mark-choices o";

    svg_s[0].setAttribute("fill","#A8BFC9");
    svg_s[1].setAttribute("fill","#1F3641");
  }
}

function LoadGame(){
  location.href = "CpuVsPlayer.html";
}

