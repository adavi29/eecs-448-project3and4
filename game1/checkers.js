/**
* checkers()
* parameter: none
* pre: empty table must exist in HTML
* post: generates board and cells
*/

function checkers() {
	table = document.getElementById("table");
	table.redTurn = true;
	table.hasJumped = false;
	table.from = null;
	table.canJump = false;
	n=8; //n is the size of the board
	for(let i = 0; i < n; i++){
		table.insertRow(i);
		for(let j = 0; j < n; j++){
			table.rows[i].insertCell(j);
			cell = table.rows[i].cells[j];
			cell.id = i*n+j;
			cell.isRed = false;
			cell.hasPiece = false;
			cell.king = false;
			cell.option = false;
			cell.jump = false;

			if((cell.id)%2 != i%2){
				cell.style.backgroundColor="grey";
				cell.isRed = (cell.id<3*n); //assigns initial reds
				cell.hasPiece = ((cell.id>(n-3)*n-1)||(cell.id<3*n)); //assigns all
			}

			/*//////######Debug########//////////
			if(cell.id == 26){
				cell.isRed = false;
				cell.hasPiece = true;
				cell.king = true;
			}
			if(cell.id == 51)
			cell.hasPiece = false;

			////////////////////////////////////*/
			cell.onmousedown =  function(){
				for(let i = 0; i<n; i++){
					for(let j = 0; j < n; j++){
						if((i*n+j)%2 != i%2){
							document.getElementById(i*n+j).style.backgroundColor="grey";
						}
					}
				}
				click(this, n); };
			}
		}



		for(let i = 0; i < n; i++){
			for(let j = 0; j < n; j++){
				cell = table.rows[i].cells[j];
				if(cell.hasPiece){
					(cell.isRed) ? cell.innerHTML = "&#128308" : cell.innerHTML =  "&#9899";
				}
			}
		}

		document.getElementById("reset").onmousedown = function(){
			for(let l = (n-1); l >= 0; l--){
				table.deleteRow(l);
			}
			checkers()};
		}

/**
* click(cell, n)
* parameter: cell: the cell that was clicked, n is size of the board
* pre: board must exist with cells, click must have happened on a cell
* post: decides what to do with click depending on what's within the cell,
* 		whose turn it is, and if a piece has been clicked or jumped before
* return : none
*/
function click(cell, n){
	console.log("click!", cell.id);
		if(!table.shown){
			if(cell.hasPiece){
				if(cell.isRed==table.redTurn){
					showOptions(cell);
				}
			}
		}
		else{
			if((table.from.isRed==cell.isRed)&&(cell.hasPiece)){
				resetOptions();
				showOptions(cell);
			}
			if((cell.option)&&(!cell.hasPiece)){
				if(!cell.jump){
					move(table.from, cell);
					newTurn();
				}
				else{
						jump(table.from, cell);
						if(!table.canJump){
							newTurn(); //no new turn if the piece can jump again
						}
				}
			}
	}

}

/**
* showOptions(cell)
* parameter: cell: the cell that was clicked
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: shows any cells that the piece can move or jump to, marks them as options or jump, and
* prepares the board for the next jump or move.
* return : none
*/


function showOptions(cell){
	table.shown = true;
	table.from = cell;

	let can = {bl:false, br:false, tl:false, tr:false};
	let alg = {bl:-1+n, br:1+n, tl:-1-n, tr:1-n};
	let far = {bl:false, br:false, tl:false, tr:false};
	let dub = {bl:-2+2*n, br:2+2*n, tl:-2-2*n, tr:2-2*n};


	if(cell.isRed||cell.king){
		can.bl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) + n < n*n));
		can.br = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) + n < n*n));
	}
	if(!(cell.isRed)||cell.king){
		can.tl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) - n >= 0));
		can.tr = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) - n >= 0));
	}
	for(let direction in can){
		if(can[direction]){
			nearCell = document.getElementById(parseInt(cell.id)+alg[direction]);
			if(nearCell.hasPiece){
				if(nearCell.isRed!=cell.isRed){
					if(cell.isRed||cell.king){
						far.bl = ((parseInt(nearCell.id)%n != 0)&&(parseInt(nearCell.id) + n < n*n));
						far.br = ((parseInt(nearCell.id)%n != (n-1))&&(parseInt(nearCell.id) + n < n*n));
					}
					if(!(cell.isRed)||cell.king){
						far.tl = ((parseInt(nearCell.id)%n != 0)&&(parseInt(nearCell.id) - n >= 0));
						far.tr = ((parseInt(nearCell.id)%n != (n-1))&&(parseInt(nearCell.id) - n >= 0));
					}
					if(far[direction]){
						farCell = document.getElementById(parseInt(cell.id)+dub[direction]);
						if(!farCell.hasPiece){
							farCell.style.backgroundColor="lightgrey";
							farCell.option = true;
							farCell.jump = true;
							table.canJump = true;
						}
						else{
							table.canJump = false;
						}
					}
				}
			}
			else{
				if(!table.hasJumped){
					nearCell.style.backgroundColor="lightgrey";
					nearCell.option=true;
				}
			}
		}
	}
}

/**
* move(fromCell, toCell)
* parameter: fromCell: the cell you're moving piece from; toCell: the cell you're moving it to
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: Gives the toCell the properties of the fromCell and then resets the fromCell
* return : none
*/


function move(fromCell, toCell){
	if(toCell.option){
		toCell.isRed = fromCell.isRed;
		toCell.king = fromCell.king;
		fromCell.king = false;
		fromCell.isRed = false;
		fromCell.hasPiece = false;
		toCell.hasPiece = true;
		fromCell.innerHTML = "";
		if((toCell.id < n)||(toCell.id >= n*(n-1))){
			toCell.king = true;
		}
		if(toCell.king){
			(toCell.isRed) ? toCell.innerHTML = "❤️" : toCell.innerHTML =  "🖤";
		}
		else{
			(toCell.isRed) ? toCell.innerHTML = "&#128308" : toCell.innerHTML =  "&#9899";
		}
	}
}

/**
* jump(fromCell, toCell)
* parameter: fromCell: the cell you're moving piece from; toCell: the cell you're moving it to
* pre: board must exist with cells, click must have happened on a cell that had a piece in it, piece must be between from and to
* post: Gives the toCell the properties of the fromCell and then resets the fromCell and the cell between them
* return : none
*/

function jump(fromCell, toCell){
	if(toCell.option){
		midCell = document.getElementById(parseInt(fromCell.id)+parseInt(toCell.id-fromCell.id)/2)

		midCell.hasPiece = false;
		midCell.king = false;
		midCell.innerHTML = "";

		toCell.isRed = fromCell.isRed;
		toCell.king = fromCell.king;
		fromCell.king = false;
		fromCell.isRed = false;
		fromCell.hasPiece = false;
		toCell.hasPiece = true;
		fromCell.innerHTML = "";
		table.hasJumped = true;
		if((toCell.id < n)||(toCell.id >= n*(n-1))){
			toCell.king = true;
		}
		if(toCell.king){
			(toCell.isRed) ? toCell.innerHTML = "❤️" : toCell.innerHTML =  "🖤";
		}
		else{
			(toCell.isRed) ? toCell.innerHTML = "&#128308" : toCell.innerHTML =  "&#9899";
		}
		resetOptions();
		showOptions(toCell);
		}
}

/**
* newTurn()
* parameter: none
* pre: checkers() must have been run
* post: Resets options, calls resetOPtions, resets the fromCell, toggles whose turn it is
* return : none
*/

function newTurn() {
	table.from = null;
	resetOptions();
	table.hasJumped = false;
	table.redTurn = !table.redTurn;
	table.redTurn ? document.getElementById("body").style.backgroundColor = "darkRed" : document.getElementById("body").style.backgroundColor ="black";
}

/**
* newTurn()
* parameter: none
* pre: checkers() must have been run
* post: goes through each cell and undoes everything that showOptions could have done to each cell
* return : none
*/

function resetOptions(){
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			document.getElementById(i*n+j).option = false;
			document.getElementById(i*n+j).jump = false;
		}
	}
	table.shown = false;
	table.canJump = false;
}

/**
* backHome()
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html");
}
