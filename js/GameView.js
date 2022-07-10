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
    GameController.RestartGame(GAMEBOARDCELLS,MODAL,event);
  });
  ORANGE_MEDIUM.addEventListener("click",function _f2(event){
    GameController.RestartGame(GAMEBOARDCELLS,MODAL,event);
  });
  RIGHT_SIDE_BUTTON.addEventListener("click",function _f3(event){
    GameController.LoadRestartMessage(MODAL,MESSAGE_CARTEL,MESSAGE_DECLARATION,GREY_MEDIUM,ORANGE_MEDIUM,event);
  });

  function _f4(event){
    BotController.MakeMove(_f4);
  }

  MODAL.addEventListener("click",_RemoveMessage);
  let _CurrentTurn = "x";
  let _Combination = "";
  let _IdsWinningSquares = ""; 

  function SetAddEventListeners(){
    _CurrentTurn = "x";
    let _CpuMark = localStorage.getItem("cpu");
    _TURN_FIGURE.setAttribute("src",`https://i.imgur.com/1680F0J.jpg`);
    _InitializeGameBoard();
    for(const cell of GAMEBOARDCELLS){
      cell.addEventListener("mouseover",_mouseover);
      cell.addEventListener("mouseout",_mouseleave);
      cell.addEventListener("click",Click);
      cell.addEventListener("click", _f4);
    }
    if(_CpuMark === "x") BotController.MakeMove();
  }

  function _mouseover(event){
    event.target.className += ` preview-${_CurrentTurn}`;
  }
  
  function _mouseleave(event){
    event.target.className = "game-board-cell empty";
  }
  /*cambios*/
  function Click(event,row,column){
    let cell = null;
    event === "ia" ? cell = document.getElementById(String(row) + String(column)) : cell = event.target;
    _Combination = "";
    _IdsWinningSquares = "";
    cell.className = `game-board-cell active ${_CurrentTurn}`;
    _UpdateGameBoard(cell,event);
    cell.removeEventListener("mouseover",_mouseover);
    cell.removeEventListener("mouseout",_mouseleave);
    cell.removeEventListener("click",Click);
    setTimeout(() => cell.removeEventListener("click",_f4), 0);
    _ChangeTurn();
  }

  function _ChangeTurn(){
    if(_CurrentTurn === "x"){
      _TURN_FIGURE.setAttribute("src","https://i.imgur.com/BkQ7RtC.jpg");
      _CurrentTurn = "o";
    }
    else{
      _TURN_FIGURE.setAttribute("src","https://i.imgur.com/1680F0J.jpg");
      _CurrentTurn = "x";
  }
}

  function _UpdateGameBoard(cell /*event*/,event ){

    let currentPosition = cell.id; 
    let Row = parseInt(currentPosition.slice(0,1));
    let Column = parseInt(currentPosition.slice(1,2));
    GameBoard[Row][Column] = _CurrentTurn;
    _EvaluateGame(Row,Column,event);
  }

  function _InitializeGameBoard(){
    for(let row = 0; row < 3; row++){
      for(let column = 0; column < 3; column++){
        GameBoard[row][column] = "0";
      }
    }
  }

  function _EvaluateGame(Row,Column,event){
    _CheckLeftDiagonal(Row,Column);
    _CheckRightDiagonal(Row,Column);
    _CheckHorizontal(Row,Column);
    _CheckVertical(Row,Column);
    if(_Combination === "xxx" || _Combination === "ooo") {
      GameController.TruncateGame(GAMEBOARDCELLS,_mouseover,_mouseleave,Click,_f4);
      _ColorWinningSquares(_Combination.slice(0,1));
      return _UpdateScore(event);
    }
    if(!_CheckTie(GameBoard)){
      _UpdateScore(event);
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
  
  function _UpdateScore(event){
    let _CpuMark = localStorage.getItem("cpu");
    if(_Combination === "xxx"){
      _PLAYER_1_COUNTER.innerText === "0" ? _PLAYER_1_COUNTER.innerText = 1 : _PLAYER_1_COUNTER.innerText = parseInt(_PLAYER_1_COUNTER.innerText) + 1;
      if(event === "ia" && _CpuMark === "x") return _LoadWinningMessage("x","green","AI HAS WON!","message");
      return _LoadWinningMessage("x","green","YOU WON!","message");
    }

    if(_Combination === "ooo"){
      _PLAYER_2_COUNTER.innerText === "0" ? _PLAYER_2_COUNTER.innerText = 1 : _PLAYER_2_COUNTER.innerText =  parseInt(_PLAYER_2_COUNTER.innerText) + 1;
      if(event === "ia" && _CpuMark === "o") return _LoadWinningMessage("o","yellow","AI HAS WON!","message");
      return _LoadWinningMessage("o","yellow","YOU WON!","message");
    }
    TIE.innerText === "0" ? TIE.innerText = 1 : TIE.innerText =  parseInt(TIE.innerText) + 1;   
    _LoadWinningMessage("message_cartel","","IT'S A TIE!","message_paragraph");
  }

  function _CheckTie(GameBoard){
    for(let row = 0; row < 3; row++){
      for(let column = 0; column < 3; column++){
        if(GameBoard[row][column] === "0") return true;
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

  return {SetAddEventListeners,Click,GameBoard};
}())

const GameController = (function(){

  function TruncateGame(GameBoardCells,_mouseover,_mouseleave,Click,_f4){
    for(const element of GameBoardCells){
      element.removeEventListener("mouseover",_mouseover);
      element.removeEventListener("mouseout",_mouseleave);
      element.removeEventListener("click",Click);
      element.removeEventListener("click",_f4)
      element.style.cursor =  "default";
    }
  }

  function RestartGame(GAMEBOARDCELLS,MODAL,event){ 
    if(event.target.innerText == "NO, CANCEL") {
      setTimeout(() => MODAL.className = "modal", 300);
      return;
    }

    if(event.target.id === "grey_medium"){  
      setTimeout(() => location.href = "index.html", 300); 
      return;
    }

    for(let i = 0; i < GAMEBOARDCELLS.length; i++){
      GAMEBOARDCELLS[i].className = "game-board-cell empty";
    }
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
    let CpuMark = localStorage.getItem("cpu");
    let Player1Mark = localStorage.getItem("Player1Mark");
    let Player2Mark = "";
    Player1Mark === "x" ? Player2Mark === "o" : Player2Mark === "x";
    let player1 = People(Player1Name,Player1Mark);
    let player2 = People(Player2Name,Player2Mark);
    let cpu = People("cpu",CpuMark);
    if(Player1Mark === "x"){
      Player1Name === "" ? _X_PLAYER.innerText = "Player 1" : _X_PLAYER.innerText = player1["name"];
      Player2Name === "" ? _O_PLAYER.innerText = "Player 2" : _O_PLAYER.innerText = player2["name"];
    }
    else if(Player1Mark === "o"){
      Player1Name === "" ? _X_PLAYER.innerText = "Player 1" : _O_PLAYER.innerText = player1["name"];
      Player2Name === "" ? _O_PLAYER.innerText = "Player 2" : _X_PLAYER.innerText = player2["name"];
    }
    else{
      cpu["marker"] === "x" ? _X_PLAYER.innerText = "CPU" : _X_PLAYER.innerText = "Player 1";
      cpu["marker"] === "o" ? _O_PLAYER.innerText = "CPU" : _O_PLAYER.innerText = "Player 1";
    }
  }
  return {SetPlayersNames};
}())

const BotController = (function(){
  let _CpuMark = localStorage.getItem("cpu");
  let scores = {
    x: 0,
    o: 0,
    tie: 0,
  }
  if(_CpuMark === "o"){
    scores["x"] = -1;
    scores["o"] = 1;
  }else{
    scores["x"] = 1;
    scores["o"] = -1;
  }

  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  function _PlayerHasWon(board){
    let tie = "tie";
    let index = 0;
    let GameBoardArray = Array(9).fill(null);

    for(let row = 0; row < 3; row++){
      for(let column = 0; column < 3; column++){
        if(board[row][column] !== "0"){
          GameBoardArray[index] = board[row][column];
        }
        index += 1;
      }
    }

    for(const condition of winningCombos){
      let [a,b,c] = condition;
      if(GameBoardArray[a] && (GameBoardArray[a] === GameBoardArray[b] && GameBoardArray[a] === GameBoardArray[c])){
        return GameBoardArray[a];
      }
      else if(GameBoardArray[a] === null || GameBoardArray[b] === null || GameBoardArray[c] === null){
        tie = null;
      }    
    }
    return tie;
  }

  function MakeMove(_f4){
    let _CpuMark = localStorage.getItem("cpu");
    if(!_CpuMark) return; 
    // AI to make its turn
    let ai = _CpuMark;
    let bestScore = -Infinity;
    let move;
    let score;
    for(let row = 0; row < 3; row++){
      if(score === 1) break;
      for(let column = 0; column < 3; column++){
        if(GameBoard.GameBoard[row][column] === "0"){
          GameBoard.GameBoard[row][column] = ai;
          score = minimax(GameBoard.GameBoard,0,false);
          GameBoard.GameBoard[row][column] = "0";
          if(score > bestScore){
            bestScore = score;
            move = {row , column};
          }
          if(score === 1) break;
        }
      }
    }
    GameBoard.GameBoard[move.row][move.column] = ai;
    GameBoard.Click("ia",move.row,move.column);
  }

  function minimax(board,depth,isMaximizing){
    //checkWinner returns null, tie or the winner
    //checkWinner is based on GameBoard.GameBoard
    let result = _PlayerHasWon(board);
    let _CpuMark = localStorage.getItem("cpu");
    let player1MarkCopy = localStorage.getItem("player1MarkCopy");
    //si result es distinto de null quiere decir que es un terminal state con lo cual retorna el score que simboliza el valor de la posicion para esta llamada de minimax
    if(result !== null){
      return scores[result];
    }
    /*
    this function is finding the best score for all the posible next turns by the ai player
    if it is the maximizing player check all the spots find the best posible outcome and return it, but call minmax recursively at the next future move
     */
    if(isMaximizing){
      let bestScore = -Infinity;
      for(let row = 0; row < 3; row++){
        for(let column = 0; column < 3; column++){
          //Is the spot available?
          if(board[row][column] === "0"){
            board[row][column] = _CpuMark;
            let score = minimax(board,depth + 1, false);
            board[row][column] = "0";
            if(score > bestScore){
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
    /*
    this function does the same thing as the one above but for the human player
    The minimizing player wants to find the best score for it which is the lowest score which is the human player
     */
    else{
      let bestScore = Infinity;
      for(let row = 0; row < 3; row++){
        for(let column = 0; column < 3; column++){
          //Is the spot available?
          if(board[row][column] === "0"){
            board[row][column] = player1MarkCopy;
            let score = minimax(board,depth + 1, true);
            board[row][column] = "0";
            if(score < bestScore){
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } 
  }
  return {MakeMove};
}())

PlayerController.SetPlayersNames();
GameBoard.SetAddEventListeners();

