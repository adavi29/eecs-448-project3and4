let playerX=true;
let playerY=false;

function ticTacToe() {
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
            
            cell.onmousedown =  function(){
                document.getElementById(i*3+j).style.backgroundColor="beige";
                click(this); 
            };

        }   
    } 
}

function click(cell){
    console.log("clicked cell # "+cell.id);

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

function switchPlayer(){
    if(playerX==true)
    {
        playerX=false;
        playerY=true;
    }
    else
    {
        playerX=true;
        playerY=false;
    }
}

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

function printWinner(){
    if(playerX==true)
    {
        alert("Player X wins!");
    }
    else
    {
        alert("Player Y wins!");
    }
}