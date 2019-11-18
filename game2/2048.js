
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");
var scoreCounter = 0;
var width = 119;
var board = [];
var fontSize = 50;
var gameIsOver = false;
initBoard();
drawBoard();
refreshBoard();
refreshBoard();

function initCell(x,y) {
  this.value = 0;
  this.x = y*width + (y+1)*5;
  this.y = x*width + (x+1)*5;
}

function initBoard () {
  for (var i = 0; i < 4; i++) {
    board[i] = [];
    for (var j = 0; j < 4; j++) {
      board[i][j] = new initCell(i,j);
    }
  }
}

function draw(board) {
  ctx.beginPath();
  ctx.rect(board.x, board.y, width, width);
  switch (board.value){
    case 0 : ctx.fillStyle = '#ffffff';
      break;
    case 2 : ctx.fillStyle = '#03fc90';
      break;
    case 4 : ctx.fillStyle = '#7bfc03';
      break;
    case 8 : ctx.fillStyle = '#b6e312';
      break;
    case 16 : ctx.fillStyle = '#bfff00';
     break;
    case 32 : ctx.fillStyle = '#f0ec16';
      break;
    case 64 : ctx.fillStyle = '#d4ad2c';
      break;
    case 128 : ctx.fillStyle = '#ed7505';
      break;
    case 256 : ctx.fillStyle = '#d43a17';
      break;
    case 512 : ctx.fillStyle = '#d41798';
      break;
    case 1024 : ctx.fillStyle = '#ab17d4';
      break;
    case 2048 : ctx.fillStyle = '#4a13bf';
      break;
    case 4096 : ctx.fillStyle = '#1e204a';
      break;
    default : ctx.fillStyle = '#000111';
  }
  ctx.fill();
  if (board.value != 0) {
    ctx.font = '45px georgia';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(board.value, board.x + width/2 , board.y + width/2 +10);
  }
}

function drawBoard() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      draw(board[i][j]);
    }
  }
}

document.onkeydown = function (event) {
  if(!gameIsOver)
  {
    if (event.keyCode === 37) {
      boardMoveLeft();
      //alert("You pressed Left Arrow");
    }else if (event.keyCode === 38) {
      boardMoveUp();
      //alert("You pressed Up Arrow");
    }else if (event.keyCode === 39) {
      boardMoveRight();
      //alert("You pressed Right Arrow");
    }else if (event.keyCode === 40) {
      boardMoveDown();
      //alert("You pressed Down Arrow");
    }
    score.innerHTML = "score:" + scoreCounter;
  }
}


function refreshBoard() {
  var ableCells = 0;
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if(board[i][j].value == 0 ) {
        ableCells++;
      }
    }
  }
  if(ableCells == 0) {
    canvas.style.opacity = '0.7';
    alert("game Is Over!!!! your score is:"+ scoreCounter);
    gameIsOver = true;
    return;
  }

  while(true) {
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    if(board[x][y].value == 0) {
      //board[x][y].value =2048;
      board[x][y].value = 2 * (Math.floor(Math.random() * 2) +1);
      drawBoard();
      return;
    }
  }

}

function boardMoveUp(){
  var x;
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j].value != 0) {
        x = i;
        while (x-1 >= 0) {
          if (board[x-1][j].value == board[x][j].value) {
            board[x-1][j].value *= 2;
            board[x][j].value = 0;
            break;
          }else if (board[x-1][j].value == 0) {
            board[x-1][j].value = board[x][j].value;
            board[x][j].value = 0;
            x--;
          }
          else {
            break;
          }
        }
      }
    }
  }
  refreshBoard();
}

function boardMoveDown(){
  var x;
  for (var i = 2; i >= 0; i--) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j].value != 0) {
        x = i;
        while (x+1 < 4) {
          if (board[x+1][j].value == board[x][j].value) {
            board[x+1][j].value *= 2;
            board[x][j].value = 0;
            break;
          }else if (board[x+1][j].value == 0) {
            board[x+1][j].value = board[x][j].value;
            board[x][j].value = 0;
            x++;
          }
          else {
            break;
          }
        }
      }
    }
  }
  refreshBoard();
}

function boardMoveLeft(){
  var curNdx;
  for(var i = 0; i < 4; i++)
  {
    for(var j = 1; j < 4; j++)
    {
      if(board[i][j].value !== 0 ) {
        curNdx = j;
        while (curNdx-1 >= 0) {
          if (board[i][curNdx-1].value == board[i][curNdx].value)
          {
            board[i][curNdx-1].value *= 2;
            board[i][curNdx].value = 0;
            scoreCounter =  board[i][curNdx - 1].value + scoreCounter;
            break;
          }
          else if (board[i][curNdx-1].value == 0)
          {
            board[i][curNdx-1].value = board[i][curNdx].value;
            board[i][curNdx].value = 0;
            curNdx--;
          }
          else
          {
            break;
          }
        }
      }
    }
  }
  refreshBoard();
}

function boardMoveRight(){
  var y;
  for(var i = 0; i < 4; i++)
  {
    for(var j = 2; j > -1; j--)
    {
      if(board[i][j].value != 0) {
        y = j;
        while (y + 1 < 4) {
          if (board[i][y + 1].value == 0)
          {
            board[i][y + 1].value = board[i][y].value;
            board[i][y].value = 0;
            y++;
          } else if (board[i][y].value == board[i][y + 1].value) {

            board[i][y + 1].value *= 2;
            scoreCounter =  board[i][y + 1].value + scoreCounter;
            board[i][y].value = 0;
            break;
          }
          else
          {
            break;
          }
        }
      }
    }
  }
  refreshBoard();
}
