// factory function for repeating objects
const People = function(name, marker) {
  return {name, marker}
}

const GameBoard = (function(){
  let GameBoard = new Array(3);
  GameBoard[0] = new Array(3);
  GameBoard[1] = new Array(3);
  GameBoard[2] = new Array(3);

  const GAMEBOARDCELLS = document.getElementsByClassName("game-board-cell");
  const _TURN_FIGURE = document.getElementById("turn_figure");
  const _PLAYER_1_COUNTER = document.getElementById("_PLAYER_1_COUNTER");
  const _PLAYER_2_COUNTER = document.getElementById("_PLAYER_2_COUNTER");
  const TIE = document.getElementById("Tie");
  const MODAL = document.getElementById("modal");
  const IMG_CARTEL = document.getElementById("img_cartel");
  const MESSAGE_CARTEL = document.getElementById("message_cartel");
  const MESSAGE_DECLARATION = document.getElementById("message_declaration");
  const GREY_MEDIUM = document.getElementById("grey_medium");
  const ORANGE_MEDIUM = document.getElementById("orange_medium");
  const RIGHT_SIDE_BUTTON = document.getElementById("right_side_button");
  GREY_MEDIUM.addEventListener("click",function _f1(event){
    GameController.RestartGame(GAMEBOARDCELLS,GameBoard,MODAL,event);
  });
  ORANGE_MEDIUM.addEventListener("click",function _f2(event){
    GameController.RestartGame(GAMEBOARDCELLS,GameBoard,MODAL,event);
  });
  RIGHT_SIDE_BUTTON.addEventListener("click",function _f3(event){
    GameController.LoadRestartMessage(MODAL,MESSAGE_CARTEL,MESSAGE_DECLARATION,GREY_MEDIUM,ORANGE_MEDIUM,event);
  });

  MODAL.addEventListener("click",_RemoveMessage);
  let _CurrentTurn = "x";
  let _Combination = "";
  let _IdsWinningSquares = ""; 

  function SetAddEventListeners(){
    _CurrentTurn = "x";
    _TURN_FIGURE.setAttribute("src",`./images/icons/icon-${_CurrentTurn}-grey.svg`);
    for(const cell of GAMEBOARDCELLS){
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
    _ChangeTurn();
  }

  function _ChangeTurn(){
    _CurrentTurn === "x" ? _CurrentTurn = "o" :  _CurrentTurn = "x";
    _TURN_FIGURE.setAttribute("src",`./images/icons/icon-${_CurrentTurn}-grey.svg`);
  }

  function _UpdateGameBoard(event){
    let currentPosition = event.target.id; 
    let Row = parseInt(currentPosition.slice(0,1));
    let Column = parseInt(currentPosition.slice(1,2));
    GameBoard[Row][Column] = _CurrentTurn;
    _EvaluateGame(Row,Column);
  }

  function _EvaluateGame(Row,Column){
    _CheckLeftDiagonal(Row,Column);
    _CheckRightDiagonal(Row,Column);
    _CheckHorizontal(Row,Column);
    _CheckVertical(Row,Column);
    if(_Combination === "xxx" || _Combination === "ooo") {
      GameController.TruncateGame(GAMEBOARDCELLS,_mouseover,_mouseleave,_click);
      _ColorWinningSquares(_Combination.slice(0,1));
      return _UpdateScore();
    }
    if(!_CheckTie(GameBoard)){
      _UpdateScore("tie");
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
      _Combination += GameBoard[Row][Column];
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
      _Combination += GameBoard[Row][Column];
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
      _Combination += GameBoard[Row][Column];
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
      _Combination += GameBoard[Row][Column];
      _IdsWinningSquares += String(Row).concat(String(Column));
      Column += 1;
    }
  }

  function _IsIndexValid(Row,Column){
    if((Row >= 0 && Row <= 2) && (Column >= 0 && Column <= 2)) return true;
  }

  function _ColorWinningSquares(winner){
    let FirstCell = document.getElementById(_IdsWinningSquares.slice(0,2));
    let SecondCell = document.getElementById(_IdsWinningSquares.slice(2,4)); 
    let ThirdCell = document.getElementById(_IdsWinningSquares.slice(4,6));
    FirstCell.className += ` match_${winner}`;
    SecondCell.className += ` match_${winner}`;
    ThirdCell.className += ` match_${winner}`;
  }
  
  function _UpdateScore(){
    if(_Combination === "xxx"){
      _PLAYER_1_COUNTER.innerText === "0" ? _PLAYER_1_COUNTER.innerText = 1 : _PLAYER_1_COUNTER.innerText = parseInt(_PLAYER_1_COUNTER.innerText) + 1;
      return _LoadWinningMessage("x","green","YOU WON!","message");
    }

    if(_Combination === "ooo"){
      _PLAYER_2_COUNTER.innerText === "0" ? _PLAYER_2_COUNTER.innerText = 1 : _PLAYER_2_COUNTER.innerText =  parseInt(_PLAYER_2_COUNTER.innerText) + 1;
      return _LoadWinningMessage("o","yellow","YOU WON!","message");
    }
    TIE.innerText === "0" ? TIE.innerText = 1 : TIE.innerText =  parseInt(TIE.innerText) + 1;   
    _LoadWinningMessage("message_cartel","","IT'S A TIE!","message_paragraph");
  }

  function _CheckTie(GameBoard){
    for(item of GameBoard){
      for(element of item){
        if(element === undefined) return true;
      }
    }
  }
  
  function _LoadWinningMessage(winner,color,message,MessageDeclarationClass){
    MODAL.className += " active";
    MESSAGE_CARTEL.className = winner;
    MESSAGE_DECLARATION.innerText = message;
    MESSAGE_DECLARATION.className = MessageDeclarationClass;
    GREY_MEDIUM.innerText = "QUIT";
    ORANGE_MEDIUM.innerText = "NEXT ROUND";
    if(color) IMG_CARTEL.setAttribute("src",`./images/icons/icon-${winner}-bright-${color}.svg`);  
  }

  function _RemoveMessage(){
    setTimeout(() => MODAL.className = "modal", 300);
  }

  return {SetAddEventListeners};
}())

const GameController = (function(){

  function TruncateGame(GameBoardCells,_mouseover,_mouseleave,_click){
    for(const element of GameBoardCells){
      element.removeEventListener("mouseover",_mouseover);
      element.removeEventListener("mouseout",_mouseleave);
      element.removeEventListener("click",_click);
      element.style.cursor =  "default";
    }
  }

  function RestartGame(GAMEBOARDCELLS,GameBoardArray,MODAL,event){ 
    if(event.target.innerText == "NO, CANCEL") {
      setTimeout(() => MODAL.className = "modal", 300);
      return;
    }

    if(event.target.id === "grey_medium"){  
      setTimeout(() => location.href = "index.html", 250); 
      return;
    }
    for(cell of GAMEBOARDCELLS){
      cell.className = "game-board-cell empty";
    }
    GameBoardArray.forEach(element => {
      element[0] = undefined;
      element[1] = undefined;
      element[2] = undefined;
    });
    GameBoard.SetAddEventListeners();
  }

  function LoadRestartMessage(MODAL,MESSAGE_CARTEL,MESSAGE_DECLARATION,GREY_MEDIUM,ORANGE_MEDIUM,event){

    MODAL.className += " active";
    MESSAGE_CARTEL.className = "message_cartel";
    MESSAGE_DECLARATION.innerText = "RESTART GAME";
    MESSAGE_DECLARATION.className = "restart_message";
    GREY_MEDIUM.innerText = "NO, CANCEL";
    ORANGE_MEDIUM.innerText = "YES, RESTART";
  }
  
  return{TruncateGame,RestartGame,LoadRestartMessage};
}());

const PlayerController = (function(){
  function SetPlayersNames(){
    const _X_PLAYER = document.getElementById("x_player");
    const _O_PLAYER = document.getElementById("o_player");
    let Player1Name = localStorage.getItem("player-1-input");
    let Player2Name = localStorage.getItem("player-2-input");
    let Player1Mark = localStorage.getItem("Player1Mark");
    let Player2Mark = "";
    Player1Mark === "x" ? Player2Mark === "o" : Player2Mark === "x";
    let player1 = People(Player1Name,Player1Mark);
    let player2 = People(Player2Name,Player2Mark);
    if(Player1Mark === "x"){
      Player1Name === "" ? _X_PLAYER.innerText = "Player 1" : _X_PLAYER.innerText = player1["name"];
      Player2Name === "" ? _O_PLAYER.innerText = "Player 2" : _O_PLAYER.innerText = player2["name"];
    }else{
      Player1Name === "" ? _X_PLAYER.innerText = "Player 1" : _O_PLAYER.innerText = player1["name"];
      Player2Name === "" ? _O_PLAYER.innerText = "Player 2" : _X_PLAYER.innerText = player2["name"];
    }
  }
  return {SetPlayersNames};
}())

PlayerController.SetPlayersNames();
GameBoard.SetAddEventListeners();