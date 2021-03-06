let playerRed=true; //red
let playerYellow=false; //yellow

/**
* post: Manages gameplay
* post: Creates the table and adds cell attributes
* post: Defines functions: cell.onclick and an anonymous function that is called when the new game button is clicked
* cell.onclick() calls the click function when a cell is clicked
* the anonymous function deletes the table when 'new game' is clicked and then calls connectFour() function again to start a new game.
*/
function connectFour() {
    playerRed=true; //red
    playerYellow=false; //yellow
    table = document.getElementById("gameBoard");

    for(let i = 0; i < 6; i++){
        //console.log("got here row"+i);
		table.insertRow(i);
		for(let j = 0; j < 7; j++){
            //console.log("got here col"+j);
			table.rows[i].insertCell(j);
            cell = table.rows[i].cells[j];
            cell.id = i*7+j;
            cell.hasValue = false;
            cell.isRed = false;
            cell.isYellow = false;

            cell.onclick =  function(){
                //this.style.backgroundColor="beige";
                click(this, j);
            };

        }
    }

    document.getElementById("newGame").onmousedown = function(){
        for(let i=5; i>=0; i--){
            table.deleteRow(i);
        }

        document.getElementById("test1").innerHTML="";
        document.getElementById("test2").innerHTML="";
        document.getElementById("test3").innerHTML="";
        document.getElementById("test4").innerHTML="";
        document.getElementById("test5").innerHTML="";
        document.getElementById("test6").innerHTML="";
        document.getElementById("test7").innerHTML="";
        document.getElementById("test8").innerHTML="";
        document.getElementById("test9").innerHTML="";
        document.getElementById("test10").innerHTML="";
        document.getElementById("test11").innerHTML="";

        connectFour()};
}

/**
* pre: is called when a table cell is clicked
* post: places a piece on the board and checks for winners
* exception: alert is called when user tries to click on a column that is full
* return: returns when a player wins
* @param cell the cell that is affected when click is called
* @param col the column of the cell that is clicked
*/
function click(cell, col){
    //console.log("clicked cell # "+cell.id);
    if(cell.hasValue)
    {
        alert("Cannot click here.");
        return;
    }

    if(playerRed==true) //player red
    {

        let cellSelected=selectCell(cell, col); //finds next available cell at bottom of column and adds emoji to the board

        if(winChoice())
        {
            printWinner();
            return;
        }
    }
    else //player yellow
    {
        let cellSelected=selectCell(cell, col);

        if(winChoice())
        {
            printWinner();
            return;
        }
    }
    switchPlayer();
}

/**
* pre: a cell is clicked
* post: updates the table so that when a column is clicked, the next available cell at the bottom of the table is filled
* return: returns the cell that is actually affected: the cell where a piece is placed
* @param cell the cell that is clicked. This changes by the end of the function to return the cell where the piece is placed
* @param col the column in which the cell that is clicked lives
*/
function selectCell(cell, col){
    for(let i=0; i<5; i++)
    {
        for(let j=0; j<7; j++)
        {
            if(j==col)
            {
                if(cell.hasValue==false && table.rows[i+1].cells[j].hasValue==false) //if cell has no value yet, move down to the next cell
                {
                    cell=table.rows[i+1].cells[j]; //this will move it to the bottom of the table
                }
            }
        }
    }

    cell.hasValue=true;
    if(playerRed==true)
    {
        cell.innerHTML="&#x1F534;"; //red
        cell.isRed=true;
    }
    else //if yellow turn
    {
        cell.innerHTML="&#x1F601"; //yellow
        cell.isYellow=true;
    }
    return(cell);
}

/**
* pre: player booleans are set
* post: switches player booleans so that one is true while the other is false
*/
function switchPlayer(){
    if(playerRed==true)
    {
        playerRed=false;
        playerYellow=true;
    }
    else
    {
        playerRed=true;
        playerYellow=false;
    }
}

/**
* pre: a cell is clicked
* post: checks for a winner and returns true if winner exists; false otherwise
* return: returns true when the click results in a win; false otherwise
*/
function winChoice(){
    let winCountHoriz=checkHoriz(); //count
    let winCountVert=checkVertical(); //count
    let winDiagUp=checkDiagUp(); //bool
    let winDiagDown=checkDiagDown(); //bool
    if(winCountHoriz>=4 || winCountVert>=4 || winDiagUp==true || winDiagDown==true)
    {
        return(true);
    }
    else
    {
        return(false);
    }
}

/**
* pre: a cell is clicked
* post: checks for a vertical winner: checks for 4 vertically adjacent matching pieces
* return: returns the winCount, which is a counter for how many vertically adjacent cells there are. either returns 4 or 0.
*/
function checkVertical(){
    let winCount=0;
    let cell=table.rows[0].cells[0];
    for(let i=0; i<7; i++)
    {
        for(let j=0; j<6; j++)
        {
            cell=table.rows[j].cells[i];
            if(playerRed==true && cell.isRed)
            {
                winCount++;
                if(winCount>=4)
                {
                    return(winCount);
                }
            }
            else if(playerYellow==true && cell.isYellow)
            {
                winCount++;
                if(winCount>=4)
                {
                    return(winCount);
                }
            }
            else
            {
                winCount=0;
            }
        }
    }
    return(winCount);
}

/**
* pre: a cell is clicked
* post: checks for a horizontal winner: checks for 4 horizontally adjacent matching pieces
* return: returns the winCount, which is a counter for how many horizontally adjacent cells there are. either returns 4 or 0.
*/
function checkHoriz(){
    let winCount=0;
    let cell=table.rows[0].cells[0];
    for(let i=0; i<6; i++)
    {
        for(let j=0; j<7; j++)
        {
            cell=table.rows[i].cells[j];
            if(playerRed==true && cell.isRed)
            {
                winCount++;
                if(winCount>=4)
                {
                    return(winCount);
                }
            }
            else if(playerYellow==true && cell.isYellow)
            {
                winCount++;
                if(winCount>=4)
                {
                    return(winCount);
                }
            }
            else
            {
                winCount=0;
            }

        }
    }
    return(winCount);
}

/**
* pre: a cell is clicked
* post: checks for a diagonal winner: checks for 4 diagonally adjacent matching pieces going from left to bottom right
* return: returns true if 4 consecutive diagonal pieces are on the board; false otherwise
*/
function checkDiagDown(){
    let cell=table.rows[0].cells[0];
    for(let i=3; i<6; i++)
    {
        for(let j=0; j<4; j++)
        {
            cell=table.rows[i].cells[j];

            if(playerRed==true)
            {
                if(cell.isRed && table.rows[i-1].cells[j+1].isRed && table.rows[i-2].cells[j+2].isRed && table.rows[i-3].cells[j+3].isRed)
                {
                   return(true);
                }
            }
            else
            {
                if(cell.isYellow && table.rows[i-1].cells[j+1].isYellow && table.rows[i-2].cells[j+2].isYellow && table.rows[i-3].cells[j+3].isYellow)
                {
                   return(true);
                }
            }

        }
    }
    return(false);
}

/**
* pre: a cell is clicked
* post: checks for a diagonal winner: checks for 4 diagonally adjacent matching pieces going from right to top left
* return: returns true if 4 consecutive diagonal pieces are on the board; false otherwise
*/
function checkDiagUp(){
    let cell=table.rows[0].cells[0];
    for(let i=3; i<6; i++)
    {
        for(let j=3; j<7; j++)
        {
            cell=table.rows[i].cells[j];

            if(playerRed==true)
            {
                if(cell.isRed && table.rows[i-1].cells[j-1].isRed && table.rows[i-2].cells[j-2].isRed && table.rows[i-3].cells[j-3].isRed)
                {
                   return(true);
                }
            }
            else
            {
                if(cell.isYellow && table.rows[i-1].cells[j-1].isYellow && table.rows[i-2].cells[j-2].isYellow && table.rows[i-3].cells[j-3].isYellow)
                {
                   return(true);
                }
            }

        }
    }
    return(false);
}

/**
* pre: the board is full
* post: Prints an alert for which player won
*/
function printWinner(){
    if(playerRed==true)
    {
        alert("Player Red wins!");
    }
    else
    {
        alert("Player Yellow wins!");
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
* pre: the connectFour method is implemented
* post: Clears the table and reruns the game: used for testing
*/
function clearBoard(){
    for(let i=5; i>=0; i--){
        table.deleteRow(i);
    }

    connectFour();
}

/**
* pre: winner bool is initialized, BoardReset is implemented, connect Four game is fully implemented
* post: Runs the test suite when the button is pressed and prints results to the webpage
*/
let test5Bool=false;
let test6Bool=false;
let test7Bool=false;
let test8Bool=false;
let test9Bool=false;
let test10Bool=false;
function connectFourTestSuite(){
    clearBoard();
    let test1="Test 1: Clicking any cell places a piece at the bottom of the column clicked simulating a piece dropped into the board: ";
    let test2="Test 2: Clicking a cell changes inner text to red circle when it is red's turn: ";
    let test3="Test 3: Clicking a cell changes inner text to yellow emoji when it is yellow's turn: ";
    let test4="Test 4: Once the bottom position of a column is taken, the next piece is placed above it when that column is selected again: ";
    let test5="Test 5: Four red vertical pieces triggers a win for red: ";
    let test6="Test 6: Four yellow vertical pieces triggers a win for yellow: ";
    let test7="Test 7: Four red horizontal pieces triggers a win for red: ";
    let test8="Test 8: Four yellow horizontal pieces triggers a win for yellow: ";
    let test9="Test 9: Four red diagonal pieces triggers a win for red: ";
    let test10="Test 10: Four yellow diagonal pieces triggers a win for yellow: ";
    let test11="Test 11: After one player places a piece, it becomes the other player's turn: ";

    //test 1
    cell = table.rows[0].cells[0];
    let cellSelected=selectCell(cell, 0);
    console.log("inner html:" + cellSelected.innerHTML);
    if(cellSelected.hasValue==true && cellSelected==table.rows[5].cells[0])
    {
        document.getElementById("test1").innerHTML=test1 + "PASSED";
    }
    else
    {
        document.getElementById("test1").innerHTML=test1 + "FAILED";
    }
    //test 2
    if(cellSelected.innerHTML=="🔴")
    {
        document.getElementById("test2").innerHTML=test2 + "PASSED";
    }
    else
    {
        document.getElementById("test2").innerHTML=test2 + "FAILED";
    }

    //test3
    switchPlayer();
    cell = table.rows[3].cells[4];
    cellSelected=selectCell(cell, 4);
    console.log("inner html:" + cellSelected.innerHTML);
    if(cellSelected.innerHTML=="😁" && cellSelected==table.rows[5].cells[4])
    {
        document.getElementById("test3").innerHTML=test3 + "PASSED";
    }
    else
    {
        document.getElementById("test3").innerHTML=test3 + "FAILED";
    }

    //test4
    switchPlayer();
    cell = table.rows[3].cells[4];
    cellSelected=selectCell(cell, 4);
    console.log("inner html:" + cellSelected.innerHTML);
    if(cellSelected.innerHTML=="🔴" && cellSelected==table.rows[4].cells[4])
    {
        document.getElementById("test4").innerHTML=test4 + "PASSED";
    }
    else
    {
        document.getElementById("test4").innerHTML=test4 + "FAILED";
    }

    //test5
    test5Bool=true;
    clearBoard();
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test5); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test5); //yellow
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test5); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test5); //yellow
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test5); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test5); //yellow
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test5); //red
    test5Bool=false;

    //test6
    test6Bool=true;
    clearBoard();
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test6); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test6); //yellow
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test6); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test6); //yellow
    cell = table.rows[0].cells[1];
    clickTestMode(cell, 1, test6); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test6); //yellow
    cell = table.rows[0].cells[0];
    clickTestMode(cell, 0, test6); //red
    cell = table.rows[0].cells[3];
    clickTestMode(cell, 3, test6); //yellow
    test6Bool=false;

      //test7
      test7Bool=true;
      clearBoard();
      cell = table.rows[0].cells[1];
      clickTestMode(cell, 1, test7); //red
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test7); //yellow
      cell = table.rows[0].cells[2];
      clickTestMode(cell, 2, test7); //red
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test7); //yellow
      cell = table.rows[0].cells[3];
      clickTestMode(cell, 3, test7); //red
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test7); //yellow
      cell = table.rows[0].cells[4];
      clickTestMode(cell, 4, test7); //red
      test7Bool=false;

      //test8
      test8Bool=true;
      clearBoard();
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test8); //red
      cell = table.rows[0].cells[2];
      clickTestMode(cell, 2, test8); //yellow
      cell = table.rows[0].cells[1];
      clickTestMode(cell, 1, test8); //red
      cell = table.rows[0].cells[3];
      clickTestMode(cell, 3, test8); //yellow
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test8); //red
      cell = table.rows[0].cells[4];
      clickTestMode(cell, 4, test8); //yellow
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test8); //red
      cell = table.rows[0].cells[5];
      clickTestMode(cell, 5, test8); //yellow
      test8Bool=false;

      //test9
      test9Bool=true;
      clearBoard();
      cell = table.rows[0].cells[3];
      clickTestMode(cell, 3, test9); //red
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test9); //yellow
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test9); //red
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test9); //yellow
      cell = table.rows[0].cells[0];
      clickTestMode(cell, 0, test9); //red
      cell = table.rows[0].cells[2];
      clickTestMode(cell, 2, test9); //yellow
      cell = table.rows[0].cells[1];
      clickTestMode(cell, 1, test9); //red
      cell = table.rows[0].cells[1];
      clickTestMode(cell, 1, test9); //yellow
      cell = table.rows[0].cells[1];
      clickTestMode(cell, 1, test9); //red
      cell = table.rows[0].cells[5];
      clickTestMode(cell, 5, test9); //yellow
      cell = table.rows[0].cells[2];
      clickTestMode(cell, 2, test9); //red
      test9Bool=false;

        //test10
        test10Bool=true;
        clearBoard();
        cell = table.rows[0].cells[3];
        clickTestMode(cell, 3, test10); //red
        cell = table.rows[0].cells[3];
        clickTestMode(cell, 3, test10); //yellow
        cell = table.rows[0].cells[5];
        clickTestMode(cell, 5, test10); //red
        cell = table.rows[0].cells[4];
        clickTestMode(cell, 4, test10); //yellow
        cell = table.rows[0].cells[4];
        clickTestMode(cell, 4, test10); //red
        cell = table.rows[0].cells[4];
        clickTestMode(cell, 4, test10); //yellow
        cell = table.rows[0].cells[1];
        clickTestMode(cell, 1, test10); //red
        cell = table.rows[0].cells[5];
        clickTestMode(cell, 5, test10); //yellow
        cell = table.rows[0].cells[5];
        clickTestMode(cell, 5, test10); //red
        cell = table.rows[0].cells[5];
        clickTestMode(cell, 5, test10); //yellow
        cell = table.rows[0].cells[0];
        clickTestMode(cell, 0, test10); //red
        cell = table.rows[0].cells[6];
        clickTestMode(cell, 6, test10); //yellow
        cell = table.rows[0].cells[6];
        clickTestMode(cell, 6, test10); //red
        cell = table.rows[0].cells[6];
        clickTestMode(cell, 6, test10); //yellow
        cell = table.rows[0].cells[0];
        clickTestMode(cell, 0, test10); //red
        cell = table.rows[0].cells[6];
        clickTestMode(cell, 6, test10); //yellow
        cell = table.rows[0].cells[0];
        clickTestMode(cell, 0, test10); //red
        cell = table.rows[0].cells[6];
        clickTestMode(cell, 6, test10); //yellow
        test10Bool=false;

        //test 11
        clearBoard();
        cell = table.rows[0].cells[6];
        clickTestMode(cell, 6, test10); //red
        if(playerYellow==true)
        {
            document.getElementById("test11").innerHTML=test11 + "PASSED";
        }
        else
        {
            document.getElementById("test11").innerHTML=test11 + "FAILED";
        }

        clearBoard();

}

/**
* pre: must be in test mode
* post: Only used for testing: places a piece on the board and checks for winners then switches players
* return: returns when a player wins
* @param cell the cell that is affected when click is called
* @param col the column of the cell that is clicked
* @param testNum takes in the variable that contains a string that is used to print to the screen by changing the innerHTML
* difference from click(cell, col): suppresses the winner alerts and takes an extra parameter
*/
function clickTestMode(cell, col, testNum){

    //console.log("clicked cell # "+cell.id);
    if(cell.hasValue)
    {
        alert("Cannot click here.");
        return;
    }

    if(playerRed==true) //player red
    {

        let cellSelected=selectCell(cell, col); //finds next available cell at bottom of column and adds emoji to the board

        if(winChoice())
        {
            //printWinner();
            if(test5Bool==true)
            {
                document.getElementById("test5").innerHTML=testNum + "PASSED";
            }
            else if(test7Bool==true)
            {
                document.getElementById("test7").innerHTML=testNum + "PASSED";
            }
            else if(test9Bool==true)
            {
                document.getElementById("test9").innerHTML=testNum + "PASSED";
            }
            return;
        }
        else if(test5Bool==true)
        {
            document.getElementById("test5").innerHTML=testNum + "FAILED";
        }
        else if(test7Bool==true)
        {
            document.getElementById("test7").innerHTML=testNum + "FAILED";
        }
        else if(test9Bool==true)
        {
            document.getElementById("test9").innerHTML=testNum + "FAILED";
        }

    }
    else //player yellow
    {
        let cellSelected=selectCell(cell, col);

        if(winChoice())
        {
            //printWinner();
            if(test6Bool==true)
            {
                document.getElementById("test6").innerHTML=testNum + "PASSED";
            }
            else if(test8Bool==true)
            {
                document.getElementById("test8").innerHTML=testNum + "PASSED";
            }
            else if(test10Bool==true)
            {
                document.getElementById("test10").innerHTML=testNum + "PASSED";
            }
            return;
        }
        else if(test6Bool==true)
        {
            document.getElementById("test6").innerHTML=testNum + "FAILED";
        }
        else if(test8Bool==true)
        {
            document.getElementById("test8").innerHTML=testNum + "FAILED";
        }
        else if(test10Bool==true)
        {
            document.getElementById("test10").innerHTML=testNum + "FAILED";
        }
    }
    switchPlayer();
}
