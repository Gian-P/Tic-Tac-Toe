let cells = document.getElementsByClassName("game_board_cell");

for(const cell of cells){
  cell.addEventListener("mouseover",mouseover);
  cell.addEventListener("mouseout",mouseleave);
  cell.addEventListener("click",click);
}

function mouseover(event){
  event.target.className += " preview-x";
}

function mouseleave(event){
  event.target.className = "game_board_cell empty";
}

function click(event){
  event.target.className = "game_board_cell active x";
  event.target.removeEventListener("mouseover",mouseover);
  event.target.removeEventListener("mouseout",mouseleave);
}