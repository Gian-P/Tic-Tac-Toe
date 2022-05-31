const PlayerVsPlayerModule = (function () {
  'use strict';

  let _CurrentTurn = "x";

  let _Player1Choice = localStorage.getItem("Player1Mark")

  const _GameBoardCells = document.getElementsByClassName("game-board-cell");

  const _X_Player = document.getElementById("x_player");

  const _O_Player = document.getElementById("o_player");

  const _turn_figure = document.getElementById("turn_figure");

  let GameBoard = new Array(3);
  GameBoard[0] = new Array(3);
  GameBoard[1] = new Array(3);
  GameBoard[2] = new Array(3);

  function SetAddEventListeners(){
    for(const cell of _GameBoardCells){
      cell.addEventListener("mouseover",_mouseover);
      cell.addEventListener("mouseout",_mouseleave);
      cell.addEventListener("click",_click);
    }
  }

  function _mouseover(event){
    event.target.className += ` preview-${_CurrentTurn}`;
  }
  
  function _mouseleave(event){
    event.target.className = "game-board-cell empty";
  }
  
  function _click(event){
    _UpdateGameBoard(event,_CurrentTurn);
    event.target.className = `game-board-cell active ${_CurrentTurn}`;
    event.target.removeEventListener("mouseover",_mouseover);
    event.target.removeEventListener("mouseout",_mouseleave);
    event.target.removeEventListener("click",_click);
    _CurrentTurn === "x" ? _CurrentTurn = "o" :  _CurrentTurn = "x";
    _ChangeTurn(_CurrentTurn);
  }

  function ChangePlayerLabel(){
    if(_Player1Choice === "x"){
      _X_Player.innerText = "(player 1)";
      _O_Player.innerText = "(player 2)";
      return;
    }
    _O_Player.innerText = "(player 1)";
    _X_Player.innerText = "(player 2)";
  }

  function _ChangeTurn(_CurrentTurn){
    if(_CurrentTurn === "o"){
      _turn_figure.setAttribute("src","./images/icons/icon-o-grey.svg");
      return;
    }
    _turn_figure.setAttribute("src","./images/icons/icon-x-grey.svg");
  }

  function _UpdateGameBoard(event,_CurrentTurn){
    let currentPosition = event.target.id; 
    let FirstPosition = parseInt(currentPosition.slice(0,1));
    let SecondPosition = parseInt(currentPosition.slice(1,2));
    GameBoard[FirstPosition][SecondPosition] = _CurrentTurn;
  }


  return {SetAddEventListeners,ChangePlayerLabel};
})();

PlayerVsPlayerModule.SetAddEventListeners();
PlayerVsPlayerModule.ChangePlayerLabel();