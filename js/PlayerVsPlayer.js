const PlayerVsPlayerModule = (function () {
  'use strict';

  let _CurrentTurn = "x";

  let _Player1Choice = localStorage.getItem("Player1Mark")

  const _GameBoardCells = document.getElementsByClassName("game-board-cell");

  const _X_Player = document.getElementById("x_player");

  const _O_Player = document.getElementById("o_player");

  const _turn_figure = document.getElementById("turn_figure");

  let _GameBoard = new Array(3);
  _GameBoard[0] = new Array(3);
  _GameBoard[1] = new Array(3);
  _GameBoard[2] = new Array(3);

  let _Combination = "";
  let _IdsWinningSquares = ""; 

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
    _Combination = "";
    _IdsWinningSquares = "";
    event.target.className = `game-board-cell active ${_CurrentTurn}`;
    _UpdateGameBoard(event);
    event.target.removeEventListener("mouseover",_mouseover);
    event.target.removeEventListener("mouseout",_mouseleave);
    event.target.removeEventListener("click",_click);
    _CurrentTurn === "x" ? _CurrentTurn = "o" :  _CurrentTurn = "x";
    _ChangeTurn();
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

  function _ChangeTurn(){
    if(_CurrentTurn === "o"){
      _turn_figure.setAttribute("src","./images/icons/icon-o-grey.svg");
      return;
    }
    _turn_figure.setAttribute("src","./images/icons/icon-x-grey.svg");
  }

  function _UpdateGameBoard(event){
    let currentPosition = event.target.id; 
    let Row = parseInt(currentPosition.slice(0,1));
    let Column = parseInt(currentPosition.slice(1,2));
    _GameBoard[Row][Column] = _CurrentTurn;
    _EvaluateGame(Row,Column);
  }

  function _EvaluateGame(Row,Column){
    _CheckLeftDiagonal(Row,Column);
    _CheckRightDiagonal(Row,Column);
    _CheckHorizontal(Row,Column);
    _CheckVertical(Row,Column);
    if(_Combination === "xxx" || _Combination === "ooo") TruncateGame();
  }

  function _CheckLeftDiagonal(Row,Column){
    if(_Combination === "xxx" || _Combination === "ooo") return;
    _Combination = "";
    _IdsWinningSquares = "";

    while(_IsIndexValid(Row,Column)){
      /*Left Diagonal*/
      Row -= 1;
      Column -= 1;
    }

    /*Left Diagonal*/
    Row += 1;
    Column += 1;

    while(_IsIndexValid(Row,Column)){
      _Combination += _GameBoard[Row][Column];
      _IdsWinningSquares += String(Row).concat(String(Column));
      Row += 1;
      Column += 1;
    }
  }

  function _CheckRightDiagonal(Row,Column){
    if(_Combination === "xxx" || _Combination === "ooo") return;
    _Combination = "";
    _IdsWinningSquares = "";

    while(_IsIndexValid(Row,Column)){
      /*Right Diagonal*/
      Row -= 1;
      Column += 1;
    }

    /*Right Diagonal*/
    Row += 1;
    Column -= 1;

    while(_IsIndexValid(Row,Column)){
      _Combination += _GameBoard[Row][Column];
      _IdsWinningSquares += String(Row).concat(String(Column));
      Row += 1;
      Column -= 1;
    }
  }

  function _CheckHorizontal(Row,Column){
    if(_Combination === "xxx" || _Combination === "ooo") return;
    _Combination = "";
    _IdsWinningSquares = "";

    while(_IsIndexValid(Row,Column)){
      /*Horizontal Combination*/
      Row -= 1;
    }
    /*Horizontal Combination*/
    Row += 1;

    while(_IsIndexValid(Row,Column)){
      _Combination += _GameBoard[Row][Column];
      _IdsWinningSquares += String(Row).concat(String(Column));
      Row += 1;
    }
  }

  function _CheckVertical(Row,Column){
    if(_Combination === "xxx" || _Combination === "ooo") return;
    _Combination = "";
    _IdsWinningSquares = "";

    while(_IsIndexValid(Row,Column)){
      /*Vertical Combination*/
      Column -= 1;
    }

    /*Vertical Combination*/
    Column += 1;

    while(_IsIndexValid(Row,Column)){
      _Combination += _GameBoard[Row][Column];
      _IdsWinningSquares += String(Row).concat(String(Column));
      Column += 1;
    }
  }

  function _IsIndexValid(Row,Column){
    if((Row >= 0 && Row <= 2) && (Column >= 0 && Column <= 2)) return true;
  }

  function TruncateGame(){
    /*1-) Va a parar el juego*/
    for(const element of _GameBoardCells){
      element.removeEventListener("mouseover",_mouseover);
      element.removeEventListener("mouseout",_mouseleave);
      element.removeEventListener("click",_click);
      element.style.cursor =  "default";
    }
    ColorWinningSquares();
  }

  function ColorWinningSquares(){
    let FirstCell = document.getElementById(_IdsWinningSquares.slice(0,2));
    let SecondCell = document.getElementById(_IdsWinningSquares.slice(2,4)); 
    let ThirdCell = document.getElementById(_IdsWinningSquares.slice(4,6));
    
    if(_Combination === "ooo"){
      FirstCell.className += " match_o";
      SecondCell.className += " match_o";
      ThirdCell.className += " match_o";
      return;
    }
    FirstCell.className += " match_x";
    SecondCell.className += " match_x";
    ThirdCell.className += " match_x";
    
  }
  return {SetAddEventListeners,ChangePlayerLabel};
})();

PlayerVsPlayerModule.SetAddEventListeners();
PlayerVsPlayerModule.ChangePlayerLabel();