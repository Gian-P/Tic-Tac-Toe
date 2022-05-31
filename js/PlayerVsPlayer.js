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
    _UpdateGameBoard(event);
    event.target.className = `game-board-cell active ${_CurrentTurn}`;
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
    let obj ={
      _CheckLeftDiagonal:_CheckLeftDiagonal(Row,Column),
      _CheckRightDiagonal:_CheckRightDiagonal(Row,Column),
      _CheckHorizontal:_CheckHorizontal(Row,Column),
      _CheckVertical:_CheckVertical(Row,Column),
    }
    /*
    _CheckLeftDiagonal(Row,Column);
    _CheckRightDiagonal(Row,Column);
    _CheckHorizontal(Row,Column);
    _CheckVertical(Row,Column);*/
  }

  function _CheckLeftDiagonal(Row,Column){
    let CombinationLeftDiagonal = "";
    while(_IsIndexValid(Row,Column)){
      /*Left Diagonal*/
      Row -= 1;
      Column -= 1;
    }

    /*Left Diagonal*/
    Row += 1;
    Column += 1;

    while(_IsIndexValid(Row,Column)){
      CombinationLeftDiagonal += _GameBoard[Row][Column];
      Row += 1;
      Column += 1;
    }
    if(CombinationLeftDiagonal === "xxx" || CombinationLeftDiagonal === "ooo") return true;
    CombinationLeftDiagonal = "";
  }

  function _CheckRightDiagonal(Row,Column){
    let CombinationRightDiagonal = "";
    while(_IsIndexValid(Row,Column)){
      /*Right Diagonal*/
      Row -= 1;
      Column += 1;
    }

    /*Right Diagonal*/
    Row += 1;
    Column -= 1;

    while(_IsIndexValid(Row,Column)){
      CombinationRightDiagonal += _GameBoard[Row][Column];
      Row += 1;
      Column -= 1;
    }
    if(CombinationLeftDiagonal === "xxx" || CombinationLeftDiagonal === "ooo") return true;
    CombinationRightDiagonal = "";
  }

  function _CheckHorizontal(Row,Column){
    let HorizontalCombination = "";
    while(_IsIndexValid(Row,Column)){
      /*Horizontal Combination*/
      Row -= 1;
    }

    /*Horizontal Combination*/
    Row += 1;

    while(_IsIndexValid(Row,Column)){
      HorizontalCombination += _GameBoard[Row][Column];
      Row += 1;
    }
    console.log(HorizontalCombination);
    HorizontalCombination = "";
  }

  function _CheckVertical(Row,Column){
    let VerticalCombination = "";
    while(_IsIndexValid(Row,Column)){
      /*Horizontal Combination*/
      Column -= 1;
    }

    /*Horizontal Combination*/
    Column += 1;

    while(_IsIndexValid(Row,Column)){
      VerticalCombination += _GameBoard[Row][Column];
      Column += 1;
    }
    console.log(VerticalCombination);
    VerticalCombination = "";
  }

  function _IsIndexValid(Row,Column){
    if((Row >= 0 && Row <= 2) && (Column >= 0 && Column <= 2)) return true;
  }


  return {SetAddEventListeners,ChangePlayerLabel};
})();

PlayerVsPlayerModule.SetAddEventListeners();
PlayerVsPlayerModule.ChangePlayerLabel();