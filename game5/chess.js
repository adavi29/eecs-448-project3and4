/**
* pre: empty table must exist in HTML
* post: generates board and cells
*/

function chess() {
	table = document.getElementById("table");
	table.whiteTurn = true;
	table.from = null;
	n=8; //n is the size of the board
	for(let i = 0; i < n; i++){
		table.insertRow(i);
		for(let j = 0; j < n; j++){
			table.rows[i].insertCell(j);
			cell = table.rows[i].cells[j];
			cell.id = i*n+j;
			cell.isWhite = false;
			cell.pieceName = ''; //should line up with official chess notation
			cell.option = false; //
			cell.hasMoved = false;

			cell.isWhite = (cell.id<2*n);  //assigns initial white
			cell.hasPiece = ((cell.id>(n-2)*n-1)||(cell.id<2*n)); //assigns all

			if((cell.id)%2 != i%2){
				cell.style.backgroundColor="grey";
			}

			/*//////######Debug########//////////
			if(cell.id == 26){
				cell.isWhite = false;
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
					else{
						document.getElementById(i*n+j).style.backgroundColor="white";

					}
				}
			}
			click(this); };
		}
	}

	for(let i = 0; i < 2*n; i++){
			document.getElementById(i).pieceName = "rnbkqbnrpppppppp".charAt(i);
			document.getElementById(n*n-i-1).pieceName = "rnbkqbnrpppppppp".charAt(i);
			document.getElementById(i).innerHTML = document.getElementById(i).pieceName;
			document.getElementById(n*n-i-1).innerHTML = document.getElementById(n*n-i-1).pieceName;
	}


	document.getElementById("reset").onmousedown = function(){
		for(let l = (n-1); l >= 0; l--){
			table.deleteRow(l);
		}
		chess()};
}

/**
* pre: board must exist with cells, click must have happened on a cell
* post: decides what to do with click depending on what's within the cell,
* 		whose turn it is, and if a piece has been clicked or jumped before
* @param cell the cell that was clicked
* @param n size of the board
*/
function click(cell){
	console.log("click!", cell.id);
	if(!table.shown){
		if(cell.hasPiece){
			if(cell.isWhite==table.whiteTurn){
				showOptions(cell);
			}
		}
	}
	else{
		if((table.from.isWhite==cell.isWhite)&&(cell.hasPiece)){
			resetOptions();
			showOptions(cell);
		}
	//	if((cell.option)&&(!cell.hasPiece)){
		if(cell.option){
			move(table.from, cell);
			newTurn();
		}
	}
}

/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: shows any cells that the piece can move or jump to, marks them as options or jump, and
* prepares the board for the next jump or move.
* @param cell the cell that was clicked
*/


function showOptions(cell){
	table.shown = true;
	table.from = cell;
	sign = (cell.isWhite) ? 1 : -1;

	if(cell.pieceName=='p'){
//		linOptions(up, false);
		if(cell.isWhite){
		diagOptions(cell, "br", true);
		diagOptions(cell, "bl", true);
		}
		else{
		diagOptions(cell, "tr", true);
		diagOptions(cell, "tl", true);
		}


		if(!cell.hasMoved){
			document.getElementById(parseInt(cell.id) + sign*2*n).option = true;
		}
	}

}

function diagOptions(cell, direction, recurse){
	let diagonals = {tr:1-n, br:1+n, bl:-1+n, tl:-1-n};
	let exists = {bl:false, br:false, tl:false, tr:false};
	exists.bl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) + parseInt(n) < n*n));
	exists.br = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) + parseInt(n) < n*n));
	exists.tl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) - n >= 0));
	exists.tr = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) - n >= 0));

	if(exists[direction]){
		console.log(parseInt(cell.id)+parseInt(diagonals[direction]));
		nearCell = document.getElementById(parseInt(cell.id)+parseInt(diagonals[direction]));
		if(nearCell.hasPiece){
			if(nearCell.isWhite != cell.isWhite){
				nearCell.option = true;
				nearCell.style.backgroundColor="lightPink";
			}
		}
		else{
			nearCell.option = true;
			nearCell.style.backgroundColor="lightPink";
			if(recurse){
				diagOptions(nearCell, direction, recurse);
			}
		}
	}
}

function linOptions(direction, recurse){
	let cardinals =  {up:-n, rt:1, dn:n, lf:-1};

}
	/*
	table.shown = true;
	table.from = cell;

	let can = {bl:false, br:false, tl:false, tr:false};
	let alg = {bl:-1+n, br:1+n, tl:-1-n, tr:1-n};
	let far = {bl:false, br:false, tl:false, tr:false};
	let dub = {bl:-2+2*n, br:2+2*n, tl:-2-2*n, tr:2-2*n};


	if(cell.isWhite||cell.king){
		can.bl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) + parseInt(n) < n*n));
		can.br = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) + parseInt(n) < n*n));
	}
	if(!(cell.isWhite)||cell.king){
		can.tl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) - n >= 0));
		can.tr = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) - n >= 0));
	}
	for(let direction in can){
		if(can[direction]){
			nearCell = document.getElementById(parseInt(cell.id)+parseInt(alg[direction]));
			if(nearCell.hasPiece){
				if(nearCell.isWhite!=cell.isWhite){
					if(cell.isWhite||cell.king){
						far.bl = ((parseInt(nearCell.id)%n != 0)&&(parseInt(nearCell.id) + parseInt(n) < n*n));
						far.br = ((parseInt(nearCell.id)%n != (n-1))&&(parseInt(nearCell.id) + parseInt(n) < n*n));
					}
					if(!(cell.isWhite)||cell.king){
						far.tl = ((parseInt(nearCell.id)%n != 0)&&(parseInt(nearCell.id) - n >= 0));
						far.tr = ((parseInt(nearCell.id)%n != (n-1))&&(parseInt(nearCell.id) - n >= 0));
					}
					if(far[direction]){
						farCell = document.getElementById(parseInt(cell.id)+parseInt(dub[direction]));
						if(!farCell.hasPiece){
							farCell.style.backgroundColor="lightgrey";
							farCell.option = true;
							farCell.jump = true;
							table.canJump = true;
						}
						else{
							table.canJump = table.canJump||false;
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
	*/

/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: Gives the toCell the properties of the fromCell and then resets the fromCell
* @param fromCell the cell you're moving piece from
* @param toCell the cell you're moving it to
*/


function move(fromCell, toCell){
	if(toCell.option){
		toCell.isWhite = fromCell.isWhite;
		toCell.pieceName = fromCell.pieceName;
		fromCell.isWhite = false;
		fromCell.hasPiece = false;
		toCell.hasPiece = true;
		fromCell.innerHTML = "";
		toCell.innerHTML = toCell.pieceName;
		if((toCell.id < n)||(toCell.id >= n*(n-1))){ //promote pawn
		//	toCell.king = true;
		}
	}
}

/**
* pre: checkers() must have been run
* post: Resets options, calls resetOPtions, resets the fromCell, toggles whose turn it is
*/

function newTurn() {
	table.from = null;
	resetOptions();
	table.whiteTurn = !table.whiteTurn;
	table.whiteTurn ? document.getElementById("body").style.backgroundColor = "darkgray" : document.getElementById("body").style.backgroundColor ="black";
}

/**
* pre: checkers() must have been run
* post: goes through each cell and undoes everything that showOptions could have done to each cell
*/

function resetOptions(){
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			document.getElementById(i*n+j).option = false;
		}
	}
	table.shown = false;
}

/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html");
}
