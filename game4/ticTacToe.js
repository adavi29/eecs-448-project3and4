let player1=true;
let player2=false;

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

            cell.isAdjacent= function(){
                if(this.id==3*i+j+1)
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

    if(player1==true)
    {
        cell.innerHTML="&#88"; //X
        cell.hasValue=true;
        cell.isX=true;
    }
    else
    {
        cell.innerHTML="&#79;"; //O
        cell.hasValue=true;
        cell.isO=true;
    }
    switchPlayer();
}

function switchPlayer(){
    if(player1==true)
    {
        player1=false;
        player2=true;
    }
    else
    {
        player1=true;
        player2=false;
    }
}

function isAdjacent(cell){
    
}
