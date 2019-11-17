let playerRed=true; //red
let playerYellow=false; //yellow

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
        
        selectCell(cell, col);

        /*if(winChoice(cell))
        {
            printWinner();
            return;
        }*/
    }
    else //player yellow
    {
        selectCell(cell, col);

        /*if(winChoice(cell))
        {
            printWinner();
            return;
        }*/
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
    }
    else //if yellow turn
    {
        cell.innerHTML="&#x1F601"; //yellow
        cell.isYellow=true;
    }
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
