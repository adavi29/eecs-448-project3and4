let playerRed=true; //red
let playerYellow=false; //yellow
let winner="";

function connectFour() {
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
            //cell.adjCounter=0;

            /*col.onclick = function(){
                document.getElementById(j).style.backgroundColor="beige";
            };*/

            cell.onclick =  function(){
                //this.style.backgroundColor="beige";
                //document.getElementById(i*7+j).style.backgroundColor="beige";
                click(this, j);
            };

        }
    }

    document.getElementById("newGame").onmousedown = function(){
        for(let i=5; i>=0; i--){
            table.deleteRow(i);
        }
        connectFour()};
}

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
        //cell.adjCounter++; //increase count for the cell you're hitting
        //adjustCounters(cell);//increase cell adjCounter for all cells adjacent
    }
    else //if yellow turn
    {
        cell.innerHTML="&#x1F601"; //yellow
        cell.isYellow=true;
        //cell.adjCounter++;
        //adjustCounters(cell);//increase cell adjCounter for all cells adjacent
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

function winChoice(){
    let winCountHoriz=checkHoriz();
    let winCountVert=checkVertical();
    let winCountDiag=checkDiag();
    if(winCountHoriz>=4 || winCountVert>=4 || winCountDiag>=4)
    {
        return(true);
    }
    else
    {
        return(false);
    }
}

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

function checkDiag(){

}

/*function adjustCounters(cell){
    for(let i=0; i<6; i++)
    {
        for(let i=0; i<7; i++)
        {

        }
    }
}*/

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