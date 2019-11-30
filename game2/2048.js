
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");
var scoreCounter = 0;
var width = 119;
var board = [];
var fontSize = 50;
var gameIsOver = false;
let testing = false;
initBoard();
drawBoard();
refreshBoard();
refreshBoard();
/**
* pre: the gameboard cometains 16 cells
* post: giving each cell a value and an axis on HTML
*/
function initCell(x,y) {
  this.value = 0;
  this.x = y*width + (y+1)*5;
  this.y = x*width + (x+1)*5;
}
/**
* pre: the game board is an existed empty array
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
* pre: every cell on the gameboard contain 0 or higher value
* post: switch the certain emoji when catch different number
*/
function draw(board) {
  ctx.beginPath();
  ctx.rect(board.x, board.y, width, width);
  var fillEmoji;
  switch (board.value){
    case 0 : ctx.fillStyle = '#ffffff';
      break;
    case 2 : ctx.fillStyle = '#03fc90';
    fillEmoji ='😀';
      break;
    case 4 : ctx.fillStyle = '#7bfc03';
    fillEmoji ='😁';
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
* pre: every cell on the gameboard contain 0 or higher value
* post: switch the certain emoji when catch different number
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
    score.innerHTML = "score:" + scoreCounter;
  }
}

function copy(board){
  var copyBoard = [];
  for (var i = 0; i < 4; i++) {
    copyBoard[i] = [];
    for (var j = 0; j < 4; j++) {
      copyBoard[i][j] = board[i][j].value;
    }
  }
  //console.table(copyBoard);
  return copyBoard;
}

function isChanged(board1,board2){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board1[i][j] != board2[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function canNotMove() {
  var ableCells = 0;
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if(board[i][j].value == 0 ) {
        ableCells++;
      }
    }
  }
  var sameCells = 0;
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      if (board[i][j].value == board[i][j+1].value || board[i+1][j].value == board[i][j].value)
      {
        sameCells++;
      }
    }
  }
  for(var i = 0; i < 3; i++) {
    if (board[i][3].value == board[i+1][3].value || board[3][i].value == board[3][i+1].value)
    {
      sameCells++;
    }
  }
  if(ableCells == 0 && sameCells == 0) {
    return true;
  }
  else {
    return false;
  }

}
/**
* pre: the game board is created on HTML
* post: check if all cells are filled then end gameboard
*check if all cells are filled but some two cells can be combained then don't end the game
*if the board is not full filed then return a new random cell on the board
*/
function refreshBoard() {

  //console.log(sameCells);
  if(canNotMove()) {  //&& sameCells == 0
    if (tessing === false) {
      canvas.style.opacity = '0.7';
    }
    alert("game Is Over!!!! your score is:"+ scoreCounter);
    gameIsOver = true;
    return;
  }
  if(testing === false) {
    while (true) {
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


}
/**
* pre: the game is begined
* post: Takes all the cells to the top side, if two same cells are meeted, then add then together
*/
function boardMoveUp(){
  var prevBoard = copy(board);
  var x;
    for (var j = 0; j < 4; j++) {
      var mergMarker = 0;
        for (var i = 1; i < 4; i++) {
      if (board[i][j].value != 0) {
        x = i;
        while (x-1 >= 0) {
          if (board[x-1][j].value == board[x][j].value) {
            if (mergMarker === board[x-1][j].value) {
              mergMarker = 0;
            }
            else {
              board[x-1][j].value = board[x-1][j].value + board[x][j].value;
              scoreCounter =  board[x-1][j].value + scoreCounter;
              mergMarker = board[x-1][i].value;
              board[x][j].value = 0;
            }
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
  var currBoard = copy(board);
  if (isChanged(currBoard,prevBoard) || canNotMove()) {
    refreshBoard();
  }
}
/**
* pre: the game is begined
* post: Takes all the cells to the buttom side, if two same cells are meeted, then add then together
*/
function boardMoveDown(){
  var prevBoard = copy(board);
  var x;
    for (var j = 0; j < 4; j++) {
      var mergMarker = 0;
      for (var i = 2; i >= 0; i--) {
      if (board[i][j].value != 0) {
        x = i;
        while (x+1 < 4) {
          if (board[x+1][j].value == board[x][j].value) {
            if (mergMarker == 1) {
              mergMarker = 0;
            }
            else {
              board[x+1][j].value = board[x+1][j].value + board[x][j].value;
              scoreCounter =  board[x+1][j].value + scoreCounter;
              mergMarker = 1;
              board[x][j].value = 0;
            }
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
  var currBoard = copy(board);
  if (isChanged(currBoard,prevBoard) || canNotMove()) {
    refreshBoard();
  }
}
/**
* pre: the game is begined
* post: Takes all the cells to the left side, if two same cells are meeted, then add then together
*/
function boardMoveLeft(){
  var prevBoard = copy(board);
  var y;
  for(var i = 0; i < 4; i++)
  {
    var mergMarker = 0;
    for(var j = 1; j < 4; j++)
    {
      if(board[i][j].value !== 0 ) {
        y = j;
        while (y-1 >= 0) {
          if (board[i][y-1].value == board[i][y].value)
          {
            if (mergMarker === board[i][y-1].value) {
              mergMarker = 0;
            }
            else {
              board[i][y-1].value = board[i][y].value + board[i][y-1].value;
              scoreCounter =  board[i][y-1].value + scoreCounter;
              mergMarker = board[i][y-1].value;
              board[i][y].value = 0;
            }
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
  var currBoard = copy(board);
  if (isChanged(currBoard,prevBoard) || canNotMove()) {
    refreshBoard();
  }
}
/**
* pre: the game is begined
* post: Takes all the cells to the right side, if two same cells are meeted, then add then together
*/
function boardMoveRight(){
  var prevBoard = copy(board);
  var y;
  for(var i = 0; i < 4; i++)
  {
    var mergMarker = 0;
    for(var j = 2; j > -1; j--)
    {
      if(board[i][j].value != 0) {
        y = j;
        while (y + 1 < 4) {
          if (board[i][y+1].value == 0)
          {
            board[i][y+1].value = board[i][y].value;
            board[i][y].value = 0;
            y++;
          } else if (board[i][y].value == board[i][y+1].value) {
            if (mergMarker === board[i][y+1].value) {
              mergMarker = 0;
            }
            else {
              board[i][y+1].value =  board[i][y].value + board[i][y+1].value;
              scoreCounter =  board[i][y+1].value + scoreCounter;
              mergMarker = board[i][y+1].value;
              board[i][y].value = 0;
            }
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
  var currBoard = copy(board);
  if (isChanged(currBoard,prevBoard) || canNotMove()) {
    refreshBoard();
  }
}

/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("../homePage.html");
}



/**
*Post: Runs first round of tests.
*/

function runTest(){
  //document.getElementById("test").disabled = true;
  let test1 = "Test 1: Initial a New board with 2 random emojis: ";
  initBoard();
  drawBoard();
  refreshBoard();
  refreshBoard();
  var t1 = 0;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j].value  == 2 || board[i][j].value == 4) {
        t1++;
      }
    }
  }
  if (t1 == 2) {
    document.getElementById("test1").innerText = test1 + "PASSED";
  } else {
    document.getElementById("test1").innerText = test1 + "FAILED";
  }

  let test2 = "Test 2: Two same emojis should be combined together after one move([0,0,2,2]->[0,0,0,2]): ";
  let test3 = "Test 3: Four same emojis should be merged to two upper emojis after one move([2,2,2,2]->[0,0,4,4]): ";
  let test4 = "Test 4: Two same emojis followed by a upper emoji should not be merge to the third level emoji after pressed arrow key([4,2,2,0]->[0,0,4,4]): ";
  let test5 = "Test 5: One emoji followed by two same lower emojis should not merged to the third level emoji after pressed arrow key([2,2,4,0]->[0,0,4,4]): ";
  setTimeout(()=>{initBoard();drawBoard();}, 1000);

  setTimeout(()=>{
    board[0][0].value = 0;
    board[0][1].value = 0;
    board[0][2].value = 2;
    board[0][3].value = 2;
    drawBoard();
  }, 2000);
  setTimeout(()=>{
    testing = true;
    boardMoveRight();
    drawBoard();
    if(board[0][0].value == 0 || board[0][1].value == 0 || board[0][2].value == 0 || board[0][3].value == 4){
      document.getElementById("test2").innerText = test2 + "PASSED";
    }else {
      document.getElementById("test2").innerText = test2 + "FAILED";
    }
    testing = false;
  }, 2500);

  setTimeout(()=>{
    board[1][0].value = 2;
    board[1][1].value = 2;
    board[1][2].value = 2;
    board[1][3].value = 2;
    drawBoard();
  }, 3000);
  setTimeout(()=>{
    testing = true;
    boardMoveRight();
    drawBoard();
    if(board[1][0].value == 0 || board[1][1].value == 0 || board[1][2].value == 4 || board[1][3].value == 4){
      document.getElementById("test3").innerText = test3 + "PASSED";
    }else {
      document.getElementById("test3").innerText = test3 + "FAILED";
    }
    testing = false;
  }, 3500);

  setTimeout(()=>{
    board[2][0].value = 4;
    board[2][1].value = 2;
    board[2][2].value = 2;
    board[2][3].value = 0;
    drawBoard();
  }, 4000);
  setTimeout(()=>{
    testing = true;
    boardMoveRight();
    drawBoard();
    if(board[0][0].value == 0 || board[0][1].value == 0 || board[0][2].value == 4 || board[0][3].value == 4){
      document.getElementById("test4").innerText = test4 + "PASSED";
    }else {
      document.getElementById("test4").innerText = test4 + "FAILED";
    }
    testing = false;
  }, 4500);

  setTimeout(()=>{
    board[3][0].value = 2;
    board[3][1].value = 2;
    board[3][2].value = 4;
    board[3][3].value = 0;
    drawBoard();
  }, 5000);
  setTimeout(()=>{
    testing = true;
    boardMoveRight();
    drawBoard();
    if(board[0][0].value == 0 || board[0][1].value == 0 || board[0][2].value == 4 || board[0][3].value == 4){
      document.getElementById("test5").innerText = test5 + "PASSED";
    }else {
      document.getElementById("test5").innerText = test5 + "FAILED";
    }
    testing = false;
  }, 5500);

  let test6 = "Test 6: Once the board is full filled but it is able to move,then the game is over: ";
  setTimeout(()=>{initBoard();drawBoard();}, 7000);
  setTimeout(()=>{
    board[0][0].value = 16;
    board[0][1].value = 16;
    board[0][2].value = 8;
    board[0][3].value = 2;

    board[1][0].value = 2;
    board[1][1].value = 256;
    board[1][2].value = 32;
    board[1][3].value = 2;

    board[2][0].value = 4;
    board[2][1].value = 256;
    board[2][2].value = 64;
    board[2][3].value = 64;

    board[3][0].value = 2;
    board[3][1].value = 512;
    board[3][2].value = 16;
    board[3][3].value = 8;
    drawBoard();
    if(canNotMove()){
      document.getElementById("test6").innerText = test6 + "PASSED";
    }else {
      document.getElementById("test6").innerText = test6 + "FAILED";
    }
  }, 9000);

  let test7 = "Test 7: Once the board is full filled unable to move,then the game is over: ";
  setTimeout(()=>{initBoard();drawBoard();}, 10000);
  setTimeout(()=>{
    board[0][0].value = 16;
    board[0][1].value = 4;
    board[0][2].value = 8;
    board[0][3].value = 2;

    board[1][0].value = 2;
    board[1][1].value = 256;
    board[1][2].value = 32;
    board[1][3].value = 4;

    board[2][0].value = 4;
    board[2][1].value = 1024;
    board[2][2].value = 64;
    board[2][3].value = 8;

    board[3][0].value = 2;
    board[3][1].value = 512;
    board[3][2].value = 16;
    board[3][3].value = 2;
    drawBoard();
    if(canNotMove()){
      document.getElementById("test7").innerText = test7 + "PASSED";
    }else {
      document.getElementById("test7").innerText = test7 + "FAILED";
    }
  }, 12000);

  let test8 = "Test 8: For this board, once when press down key then the board create a new emoji: ";
  let test9 = "Test 9: Once when press up key then the board create a new emoji: ";

  setTimeout(()=>{initBoard();drawBoard();}, 13000);
  setTimeout(()=>{
    board[0][0].value = 0;
    board[0][1].value = 0;
    board[0][2].value = 0;
    board[0][3].value = 0;

    board[1][0].value = 16;
    board[1][1].value = 0;
    board[1][2].value = 0;
    board[1][3].value = 0;

    board[2][0].value = 4;
    board[2][1].value = 8;
    board[2][2].value = 0;
    board[2][3].value = 0;

    board[3][0].value = 8;
    board[3][1].value = 4;
    board[3][2].value = 2;
    board[3][3].value = 8;
    drawBoard();
    setTimeout(()=>{
      var prevBoard = copy(board);
      boardMoveDown();
      drawBoard();
      var currBoard = copy(board);
      if(isChanged(currBoard,prevBoard)){
        document.getElementById("test8").innerText = test8 + "PASSED";
      }else {
        document.getElementById("test8").innerText = test8 + "FAILED";
      }
    }, 1000);
  }, 15000);

  setTimeout(()=>{initBoard();drawBoard();}, 16000);
  setTimeout(()=>{
    board[0][0].value = 0;
    board[0][1].value = 0;
    board[0][2].value = 0;
    board[0][3].value = 0;

    board[1][0].value = 16;
    board[1][1].value = 0;
    board[1][2].value = 0;
    board[1][3].value = 0;

    board[2][0].value = 4;
    board[2][1].value = 8;
    board[2][2].value = 0;
    board[2][3].value = 0;

    board[3][0].value = 8;
    board[3][1].value = 4;
    board[3][2].value = 2;
    board[3][3].value = 8;
    drawBoard();
    setTimeout(()=>{
      var prevBoard = copy(board);
      boardMoveUp();
      drawBoard();
      var currBoard = copy(board);
      if(isChanged(currBoard,prevBoard)){
        document.getElementById("test9").innerText = test9 + "PASSED";
      }else {
        document.getElementById("test9").innerText = test9 + "FAILED";
      }
    }, 1000);
  }, 18000);

  let test10 = "Test 10: When ever the game is over, the window should be tell you your score(score=448): ";
  setTimeout(()=>{initBoard();drawBoard();}, 19000);
  setTimeout(()=>{
  board[0][0].value = 16;
  board[0][1].value = 4;
  board[0][2].value = 8;
  board[0][3].value = 2;

  board[1][0].value = 2;
  board[1][1].value = 256;
  board[1][2].value = 32;
  board[1][3].value = 4;

  board[2][0].value = 4;
  board[2][1].value = 1024;
  board[2][2].value = 64;
  board[2][3].value = 8;

  board[3][0].value = 2;
  board[3][1].value = 512;
  board[3][2].value = 16;
  board[3][3].value = 2;
  score = 448;
  drawBoard();
  if(canNotMove()){
    scoreCounter = 448;
    alert("game Is Over!!!! your score is:"+ scoreCounter);
    document.getElementById("test10").innerText = test10 + "PASSED";
  }else {
    document.getElementById("test10").innerText = test10 + "FAILED";
  }
  }, 20000);
}
