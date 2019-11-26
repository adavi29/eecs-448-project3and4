
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
/**
* pre: the gameboard contains 16 cells
* post: gives each cell a value and an axis on HTML
*/
function initCell(x,y) {
  this.value = 0;
  this.x = y*width + (y+1)*5;
  this.y = x*width + (x+1)*5;
}
/**
* pre: the game board is an existing empty array
* post: initialized the gameboard like a 2D array contians 16 cells
*/
function initBoard () {
  for (var i = 0; i < 4; i++) {
    board[i] = [];
    for (var j = 0; j < 4; j++) {
      board[i][j] = new initCell(i,j);
    }
  }
}
/**
* pre: every cell on the gameboard contains 0 or higher value
* post: switches the certain emoji when it catches different number
*/
function draw(board) {
  ctx.beginPath();
  ctx.rect(board.x, board.y, width, width);
  var fillEmoji;
  switch (board.value){
    case 0 : ctx.fillStyle = '#ffffff';
      break;
    case 2 : ctx.fillStyle = '#03fc90';
    fillEmoji ='😁';
      break;
    case 4 : ctx.fillStyle = '#7bfc03';
    fillEmoji ='😀';
      break;
    case 8 : ctx.fillStyle = '#b6e312';
    fillEmoji ='😂';
      break;
    case 16 : ctx.fillStyle = '#bfff00';
    fillEmoji ='😎';
     break;
    case 32 : ctx.fillStyle = '#f0ec16';
    fillEmoji ='😍';
      break;
    case 64 : ctx.fillStyle = '#d4ad2c';
    fillEmoji ='😙';
      break;
    case 128 : ctx.fillStyle = '#ed7505';
    fillEmoji ='🤗';
      break;
    case 256 : ctx.fillStyle = '#d43a17';
    fillEmoji ='😶';
      break;
    case 512 : ctx.fillStyle = '#d41798';
    fillEmoji ='🙄';
      break;
    case 1024 : ctx.fillStyle = '#ab17d4';
    fillEmoji ='😏';
      break;
    case 2048 : ctx.fillStyle = '#4a13bf';
    fillEmoji ='😮';
      break;
    case 4096 : ctx.fillStyle = '#1e204a';
    fillEmoji ='😝';
      break;
    default : ctx.fillStyle = '#000111';
  }
  ctx.fill();
  if (board.value != 0) {
    ctx.font = '50px normal';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(fillEmoji, board.x + width/2 , board.y + width/2 +10);
  }
}
/**
* pre: every cell on the gameboard contains 0 or higher value
* post: switches the certain emoji when it catches a different number
*/
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
    score.innerHTML = "Score:" + scoreCounter;
  }
}

/**
* pre: the game board is created on HTML
* post: Checks if all cells are filled then end gameboard.
*Checks if all cells are filled but some two cells can be combained and don't end the game.
*If the board is not full then return a new random cell on the board.
*/
function refreshBoard() {
  var ableCells = 0;
  //var sameCells = 0;
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if(board[i][j].value == 0 ) {
        ableCells++;
      }
    }
  }
  /*
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      if (board[i][j].value == board[i][j+1].value ||board[i+1][j].value == board[i][j].value)
      {

      }
    }
  }
*/
  if(ableCells == 0 ) {  //&& sameCells == 0
    canvas.style.opacity = '0.7';
    alert("Game Over!!!! Final Score:"+ scoreCounter);
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
/**
* pre: the game is begined
* post: Takes all the cells to the top side, if two same cells meet then they are added together
*/
function boardMoveUp(){
  var x;

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
      if (board[i][j].value != 0) {
        x = i;
        while (x-1 >= 0) {
          if (board[x-1][j].value == board[x][j].value) {
            board[x-1][j].value = board[x-1][j].value + board[x][j].value;
            scoreCounter =  board[x-1][j].value + scoreCounter;
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
/**
* pre: the game starts
* post: Takes all the cells to the buttom side, if two same cells meet then they are added together
*/
function boardMoveDown(){
  var x;
    for (var j = 0; j < 4; j++) {
      for (var i = 2; i >= 0; i--) {

      if (board[i][j].value != 0) {
        x = i;
        while (x+1 < 4) {

          if (board[x+1][j].value == board[x][j].value) {
            board[x+1][j].value = board[x+1][j].value + board[x][j].value;
            scoreCounter =  board[x+1][j].value + scoreCounter;
            board[x][j].value = 0;
            break;

          }
          else if (board[x+1][j].value == 0) {
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
/**
* pre: the game starts
* post: Takes all the cells to the left side, if two same cells meet then they are added together
*/
function boardMoveLeft(){
  var y;
  for(var i = 0; i < 4; i++)
  {
    for(var j = 1; j < 4; j++)
    {
      if(board[i][j].value !== 0 ) {
        y = j;
        while (y-1 >= 0) {
          if (board[i][y-1].value == board[i][y].value)
          {
            board[i][y-1].value = board[i][y].value + board[i][y-1].value;
            scoreCounter =  board[i][y - 1].value + scoreCounter;
            board[i][y].value = 0;
            break;
          }
          else if (board[i][y-1].value == 0)
          {
            board[i][y-1].value = board[i][y].value;
            board[i][y].value = 0;
            y--;
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
/**
* pre: the game starts
* post: Takes all the cells to the right side, if two same cells meet then they are added together
*/
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

            board[i][y + 1].value =  board[i][y].value + board[i][y+1].value;
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

/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("../homePage.html");
}
