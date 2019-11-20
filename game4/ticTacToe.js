let playerX=true;
let playerO=false;

/**
* post: Manages gameplay
* post: Creates the table and adds cell attributes
* post: Defines functions: cell.onclick and an anonymous function that is called when the new game button is clicked
* cell.onclick() calls the click function when a cell is clicked
* the anonymous function deletes the table when 'new game' is clicked and then calls ticTacToe() function again to start a new game.
*/
function ticTacToe() {
    playerX=true;
    table = document.getElementById("gameBoard");

    for(let i = 0; i < 3; i++){
        //console.log("got here row"+i);
		table.insertRow(i);
		for(let j = 0; j < 3; j++){
            //console.log("got here col"+j);
			table.rows[i].insertCell(j);
			cell = table.rows[i].cells[j];
            cell.id = i*3+j;
            cell.hasValue = false;
            cell.isX = false;
            cell.isO = false;

            cell.onclick =  function(){
                document.getElementById(i*3+j).style.backgroundColor="beige";
                click(this);
            };

        }
    }

    document.getElementById("newGame").onmousedown = function(){
        for(let i=2; i>=0; i--){
            table.deleteRow(i);
        }

        document.getElementById("test1").innerHTML="";
        document.getElementById("test2").innerHTML="";
        document.getElementById("test3").innerHTML="";
        document.getElementById("test4").innerHTML="";
        document.getElementById("test5").innerHTML="";

        ticTacToe()};
}

/**
* pre: is called when a table cell is clicked
* post: Updates cell contents with X or O, checks for winner, then switches players
* exception: alert is called when user tries to click on a cell that has already been clicked
* return: returns when a player wins
* param: cell: the cell that is affected when click is called
*/
function click(cell){
    //console.log("clicked cell # "+cell.id);
    if(cell.hasValue)
    {
        alert("Cannot click here.");
        return;
    }

    if(playerX==true)
    {
        cell.innerHTML="&#88"; //X
        cell.hasValue=true;
        cell.isX=true;
        if(winChoice(cell))
        {
            printWinner();
            return;
        }
    }
    else
    {
        cell.innerHTML="&#79"; //O
        cell.hasValue=true;
        cell.isO=true;
        if(winChoice(cell))
        {
            printWinner();
            return;
        }
    }
    switchPlayer();
}

/**
* pre: player booleans are set
* post: switches player booleans so that one is true while the other is false
*/
function switchPlayer(){
    if(playerX==true)
    {
        playerX=false;
        playerO=true;
    }
    else
    {
        playerX=true;
        playerO=false;
    }
}

/**
* post: Checks the whole board for a winning sequence
* return: returns false if there is no winner; returns true if a winning sequence is on the board
* @param  cell the cell whose contents are examined for a win
*/
function winChoice(cell){

        if(cell.isX)
        {
            if(document.getElementById(0).innerHTML=="X" && document.getElementById(1).innerHTML=="X" && document.getElementById(2).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(0).innerHTML=="X" && document.getElementById(3).innerHTML=="X" && document.getElementById(6).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(0).innerHTML=="X" && document.getElementById(1).innerHTML=="X" && document.getElementById(2).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(0).innerHTML=="X" && document.getElementById(4).innerHTML=="X" && document.getElementById(8).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(1).innerHTML=="X" && document.getElementById(4).innerHTML=="X" && document.getElementById(7).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(2).innerHTML=="X" && document.getElementById(4).innerHTML=="X" && document.getElementById(6).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(2).innerHTML=="X" && document.getElementById(5).innerHTML=="X" && document.getElementById(8).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(3).innerHTML=="X" && document.getElementById(4).innerHTML=="X" && document.getElementById(5).innerHTML=="X")
            {
                return(true);
            }
            else if(document.getElementById(6).innerHTML=="X" && document.getElementById(7).innerHTML=="X" && document.getElementById(8).innerHTML=="X")
            {
                return(true);
            }
            else
            {
                return(false);
            }
        }
        else//isO
        {
            if(document.getElementById(0).innerHTML=="O" && document.getElementById(1).innerHTML=="O" && document.getElementById(2).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(0).innerHTML=="O" && document.getElementById(3).innerHTML=="O" && document.getElementById(6).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(0).innerHTML=="O" && document.getElementById(1).innerHTML=="O" && document.getElementById(2).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(0).innerHTML=="O" && document.getElementById(4).innerHTML=="O" && document.getElementById(8).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(1).innerHTML=="O" && document.getElementById(4).innerHTML=="O" && document.getElementById(7).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(2).innerHTML=="O" && document.getElementById(4).innerHTML=="O" && document.getElementById(6).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(2).innerHTML=="O" && document.getElementById(5).innerHTML=="O" && document.getElementById(8).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(3).innerHTML=="O" && document.getElementById(4).innerHTML=="O" && document.getElementById(5).innerHTML=="O")
            {
                return(true);
            }
            else if(document.getElementById(6).innerHTML=="O" && document.getElementById(7).innerHTML=="O" && document.getElementById(8).innerHTML=="O")
            {
                return(true);
            }
            else
            {
                return(false);
            }
        }

}

/**
* pre: the board is full
* post: Prints an alert for which player won
*/
function printWinner(){
    if(playerX==true)
    {
        alert("Player X wins!");
    }
    else
    {
        alert("Player O wins!");
    }
}

/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
    window.location.replace("../homePage.html");
  }

function test(){
    console.log("Hello");
    document.write("Text to display.");
}

function test2(){
    console.log("Hello");
    document.write("<br>HELLLLLLOOOOOOO.");
}

function ticTacToeTestSuite(){
    let test1="Test 1: Clicking a cell changes inner text to X when it is X's turn: ";
    let test2="Test 2: Clicking a cell changes inner text to O when it is O's turn: ";
    let test3="Test 3: Each time a click occurs, it becomes the other player's turn: ";
    let test4="Test 4: Three X's in a row results in X winning and prints win alert: ";
    let test5="Test 5: Three O's in a row results in O winning: ";

    //test 1
    cell = table.rows[0].cells[0];
    click(cell);
    if(cell.innerHTML=="X")
    {
        document.getElementById("test1").innerHTML=test1 + "PASSED";
    }
    else
    {
        document.getElementById("test1").innerHTML=test1 + "FAILED";
    }

    //test 2
    cell = table.rows[0].cells[1];
    click(cell);
    if(cell.innerHTML=="O")
    {
        document.getElementById("test2").innerHTML=test2 + "PASSED";
    }
    else
    {
        document.getElementById("test2").innerHTML=test2 + "FAILED";
    }

    //test 3
    if(playerX==true)
    {
        cell=table.rows[0].cells[2];
        click(cell);
        if(playerO==true)
        {
            document.getElementById("test3").innerHTML=test3 + "PASSED";
        }
        else
        {
            document.getElementById("test3").innerHTML=test3 + "FAILED";
        }
    }
    else
    {
        document.getElementById("test3").innerHTML=test3 + "FAILED";
    }

    //test 4
    clearBoard();
    cell=table.rows[0].cells[0]; //X
    click(cell);
    cell=table.rows[0].cells[1]; //O
    click(cell);
    cell=table.rows[1].cells[0]; //X
    click(cell);
    cell=table.rows[2].cells[1]; //O
    click(cell);
    cell=table.rows[2].cells[0]; //X
    click(cell);

}

function clearBoard(){
        for(let i=2; i>=0; i--){
            table.deleteRow(i);
        }
    
        ticTacToe();
}
