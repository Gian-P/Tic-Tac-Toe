const IndexModule = (function(){
  'use strict';

  const _MARK_CHOICE_CONTAINER = document.getElementById("mark_choice_container");
  const _PLAYERS_CHOICE_X = document.getElementById("player's_choice_x");
  const _PLAYERS_CHOICE_O = document.getElementById("player's_choice_o");
  const _BUTTON_GREEN = document.getElementById("button_green");
  const _BUTTON_ORANGE = document.getElementById("button_orange");
  const _BUTTON_MODAL = document.getElementById("button_modal");
  const _FORMPLAYERVSPLAYER = document.getElementById("formPlayerVsPlayer");
  const _MODAL = document.getElementById("modal");
  const _PATHS = document.getElementsByTagName("path");
  const _PLAYER_1_INPUT = document.getElementById("input_player_1");
  const _PLAYER_2_INPUT = document.getElementById("input_player_2");
  const _ESTILOS = document.styleSheets;
  let _Choice = null;
  let _CurrentChoice = null;

  function _ChangePlayer1Mark(e){
    _CurrentChoice = _MARK_CHOICE_CONTAINER.className.charAt(13);

    try{
      _Choice = e.target.className.charAt(20);
    }catch{
      _Choice = e.target.className.baseVal;
    }

    if(_Choice === _CurrentChoice) return;
  
    if(_Choice === "x"){
      _ESTILOS[0].cssRules[3].styleSheet.rules[16].selectorText = ".game-menu-marks .mark-choices.x:after";
      _MARK_CHOICE_CONTAINER.className = "mark-choices x";
  
      _PATHS[0].setAttribute("fill","#1F3641");
      _PATHS[1].setAttribute("fill","#A8BFC9");
      return;
    }

    _ESTILOS[0].cssRules[3].styleSheet.rules[16].selectorText = ".game-menu-marks .mark-choices.o:after";
    _MARK_CHOICE_CONTAINER.className = "mark-choices o";
  
    _PATHS[0].setAttribute("fill","#A8BFC9");
    _PATHS[1].setAttribute("fill","#1F3641");
  }

  function _SaveMark(){
    localStorage.setItem("Player1Mark",_MARK_CHOICE_CONTAINER.className.charAt(13));
    localStorage.setItem("player-1-input",_PLAYER_1_INPUT.value);
    localStorage.setItem("player-2-input",_PLAYER_2_INPUT.value);
    _LoadGameView();
  }

  function _LoadGameView(){
    setTimeout(() => _FORMPLAYERVSPLAYER.submit(), 300);
  }

  function _PrepareCPU(){
    let player1Mark = _MARK_CHOICE_CONTAINER.className.charAt(13);
    localStorage.setItem("player1MarkCopy",player1Mark);
    player1Mark === "x" ? localStorage.setItem("cpu","o") : localStorage.setItem("cpu","x");
    _LoadGameView();
  }

  function _LoadCartel(){
    _MODAL.className += " active";
  }

  function SetAddEventListeners(){
     localStorage.clear();
    _PLAYERS_CHOICE_X.addEventListener("click",_ChangePlayer1Mark); 
    _PLAYERS_CHOICE_O.addEventListener("click",_ChangePlayer1Mark);
    _BUTTON_GREEN.addEventListener("click",_LoadCartel);
    _BUTTON_MODAL.addEventListener("click",_SaveMark);  
    _BUTTON_ORANGE.addEventListener("click",_PrepareCPU);
  }

  _FORMPLAYERVSPLAYER.onsubmit=function(e){
    e.preventDefault();
  }
  return {SetAddEventListeners};
})();

IndexModule.SetAddEventListeners();
