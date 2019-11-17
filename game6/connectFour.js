let playerR=true; //red
let playerY=false; //yellow

function connectFour() {
    table = document.getElementById("gameBoard");

    for(let i = 0; i < 6; i++){
        //console.log("got here row"+i);
		table.insertRow(i);
		for(let j = 0; j < 7; j++){
            //console.log("got here col"+j);
			table.rows[i].insertCell(j);
            cell = table.rows[i].cells[j];
            //col = table.cells[i];
            cell.id = i*7+j;
            cell.hasValue = false;
            cell.isRed = false;
            cell.isYellow = false;

            /*col.onclick = function(){
                document.getElementById(j).style.backgroundColor="beige";
            };*/

            cell.onclick =  function(){
                this.style.backgroundColor="beige";
                //document.getElementById(i*7+j).style.backgroundColor="beige";
                click(this);
            };

        }
    }

    document.getElementById("newGame").onmousedown = function(){
        for(let i=5; i>=0; i--){
            table.deleteRow(i);
        }
        connectFour()};
}

function click(cell){
    //console.log("clicked cell # "+cell.id);
    if(cell.hasValue)
    {
        alert("Cannot click here.");
        return;
    }

    if(playerR==true) //player red
    {
        cell.innerHTML="&#x1F534;"; //red
        cell.hasValue=true;
        cell.isRed=true;
        if(winChoice(cell))
        {
            printWinner();
            return;
        }
    }
    else //player yellow
    {
        cell.innerHTML="&#x1F601"; //yellow
        cell.hasValue=true;
        cell.isYellow=true;
        if(winChoice(cell))
        {
            printWinner();
            return;
        }
    }
    switchPlayer();
}