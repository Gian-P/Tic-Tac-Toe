const PlayerVsPlayerModule = (function () {
  'use strict';
  /*let  localStorage.getItem("Player1Mark")*/

  const _GameBoardCells = document.getElementsByClassName("game-board-cell");

  const _MARK_CHOICE_CONTAINER = document.getElementById("mark_choice_container");

  function _mouseover(event){
    event.target.className += " preview-x";
  }
  
  function _mouseleave(event){
    event.target.className = "game-board-cell empty";
  }
  
  function _click(event){
    event.target.className = "game-board-cell active x";
    event.target.removeEventListener("mouseover",_mouseover);
    event.target.removeEventListener("mouseout",_mouseleave);
  }

  function SetAddEventListeners(){
    for(const cell of _GameBoardCells){
      cell.addEventListener("mouseover",_mouseover);
      cell.addEventListener("mouseout",_mouseleave);
      cell.addEventListener("click",_click);
    }
  }

  return {SetAddEventListeners};
})();

PlayerVsPlayerModule.SetAddEventListeners();