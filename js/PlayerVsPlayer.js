// factory function for repeating objects
const People = function(name, marker) {
  return {name, marker}
}

const GameBoard = (function(){
  let _GameBoard = new Array(3);
  _GameBoard[0] = new Array(3);
  _GameBoard[1] = new Array(3);
  _GameBoard[2] = new Array(3);

  const _GAMEBOARDCELLS = document.getElementsByClassName("game-board-cell");
  const _TURN_FIGURE = document.getElementById("turn_figure");
  let _CurrentTurn = "x";
  let _Combination = "";
  let _IdsWinningSquares = ""; 

  function SetAddEventListeners(){
    for(const cell of _GAMEBOARDCELLS){
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

  function _ChangeTurn(){
    if(_CurrentTurn === "o"){
      _TURN_FIGURE.setAttribute("src","./images/icons/icon-o-grey.svg");
      return;
    }
    _TURN_FIGURE.setAttribute("src","./images/icons/icon-x-grey.svg");   
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
    if(_Combination === "xxx" || _Combination === "ooo") {
      GameController.TruncateGame(_GAMEBOARDCELLS);
      ColorWinningSquares();
    }
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
  return {SetAddEventListeners,_mouseleave,_mouseover,_click};
}())

const PlayerController = (function(){
}())

const GameController = (function(){
  function TruncateGame(_GameBoardCells){
    /*1-) Va a parar el juego*/
    for(const element of _GameBoardCells){
      element.removeEventListener("mouseover",GameBoard._mouseover);
      element.removeEventListener("mouseout",GameBoard._mouseleave);
      element.removeEventListener("click",GameBoard._click);
      element.style.cursor =  "default";
    }
  }
  return{TruncateGame};
}());

GameBoard.SetAddEventListeners();