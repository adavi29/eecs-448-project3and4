/**
* pre: empty table must exist in HTML
* post: generates board and cells
*/

function chess() {
	table = document.getElementById("table");
	table.whiteTurn = true;
	table.checkingcheck = false;
	table.from = null;
	table.inCheck = false;
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
			cell.check = false;
			cell.isWhite = (cell.id<2*n);  //assigns initial white
			cell.hasPiece = ((cell.id>(n-2)*n-1)||(cell.id<2*n)); //assigns all

			if((cell.id)%2 != i%2){
				cell.style.backgroundColor="grey";
			}

		cell.onmousedown =  function(){ click(this); };
		}
	}

	for(let i = 0; i < 2*n; i++){
			whitePiece = document.getElementById(i);
			blackPiece = document.getElementById(n*n-i-1);
			whitePiece.pieceName = "rnbkqbnrpppppppp".charAt(i);
			blackPiece.pieceName = "rnbqkbnrpppppppp".charAt(i);

			whitePiece.innerHTML = "<img src=\"img/w" + "rnbkqbnrpppppppp".charAt(i) + ".png\">";
			blackPiece.innerHTML = "<img src=\"img/b" + "rnbqkbnrpppppppp".charAt(i) + ".png\">";
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
	console.log("cell #", cell.id, "option: ", cell.option, "check: ", cell.check, "white: ", cell.isWhite);
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
		if(cell.option){
			tentativeMove(table.from, cell);
		//	newTurn();
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
	if(cell.pieceName=='p'){ //PAWN
		if(cell.isWhite){
			linOptions(cell, "dn", false);
			diagOptions(cell, "br", false);
			diagOptions(cell, "bl", false);
			}
		else{
			linOptions(cell, "up", false);
			diagOptions(cell, "tl", false);
			diagOptions(cell, "tr", false);
		}
		if(!cell.hasMoved){ //don't need to check for end bounds because it can't get there without moving at least once
			//need to implement taking en passant
			sign = (cell.isWhite) ? 1 : -1;
			enpassantCell = document.getElementById(parseInt(cell.id) + sign*n);
			if(!enpassantCell.hasPiece){
				enpassantCell.pieceName = 'p'; //possibly a bad idea
				if(cell.isWhite){
					linOptions(enpassantCell, "dn", false);
				}
				else{
					linOptions(enpassantCell, "up", false);
				}
				enpassantCell.pieceName = ''; //could also be a bad idea
			}
		}
	}

	if(cell.pieceName=='r'){ //ROOK
		linOptions(cell, "up", true);
		linOptions(cell, "rt", true);
		linOptions(cell, "dn", true);
		linOptions(cell, "lf", true);
	}

	if(cell.pieceName=='b'){ //BISHOP
		diagOptions(cell, "tr", true);
		diagOptions(cell, "br", true);
		diagOptions(cell, "bl", true);
		diagOptions(cell, "tl", true);
	}

	if(cell.pieceName=='q'){ //QUEEN
		linOptions(cell, "up", true);
		linOptions(cell, "rt", true);
		linOptions(cell, "dn", true);
		linOptions(cell, "lf", true);
		diagOptions(cell, "tr", true);
		diagOptions(cell, "br", true);
		diagOptions(cell, "bl", true);
		diagOptions(cell, "tl", true);
	}

	if(cell.pieceName=='k'){ //KING
		//need to make sure they're not moving into check
		//need to implement castling
		linOptions(cell, "up", false);
		linOptions(cell, "rt", false);
		linOptions(cell, "dn", false);
		linOptions(cell, "lf", false);
		diagOptions(cell, "tr", false);
		diagOptions(cell, "br", false);
		diagOptions(cell, "bl", false);
		diagOptions(cell, "tl", false);
	}

	if(cell.pieceName=='n'){ //KNIGHT
		knightOptions(cell);
	}



}

function diagOptions(cell, direction, recurse){
	let diagonals = {tr:1-n, br:1+n, bl:-1+n, tl:-1-n};
	let exists = {bl:false, br:false, tl:false, tr:false};
	exists.tr = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) - n >= 0));
	exists.br = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) + parseInt(n) < n*n));
	exists.bl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) + parseInt(n) < n*n));
	exists.tl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) - n >= 0));

	if(exists[direction]){
		nearCell = document.getElementById(parseInt(cell.id)+parseInt(diagonals[direction]));
		if((cell.pieceName != 'k')||(nearCell.check != true)||(table.checkingcheck)){
			if(nearCell.hasPiece){
				if((nearCell.isWhite != table.whiteTurn)||(table.checkingcheck)){ //if the piece in the toCell is the fromCell's opposite color
					nearCell.option = true;
					nearCell.style.backgroundColor="lightBlue";
				}
			}
			else{
				if((cell.pieceName != 'p')||table.checkingcheck){ //pawns can only move diagonally if where they're taking a piece
					nearCell.option = true;
					nearCell.style.backgroundColor="lightBlue";
					if(recurse){
						diagOptions(nearCell, direction, recurse);
					}
				}
			}
		}
	}
}

function linOptions(cell, direction, recurse){
	let cardinals =  {up:(-n), rt:1, dn:n, lf:(-1)};
	let exists = {up:false, rt:false, dn:false, lf:false};

	exists.up = (parseInt(cell.id) - parseInt(n) >= 0);
	exists.rt = (parseInt(cell.id)%n != (n-1));
	exists.dn = (parseInt(cell.id) + parseInt(n) < n*n);
	exists.lf = (parseInt(cell.id)%n != 0);

	if(exists[direction]){
		nearCell = document.getElementById(parseInt(cell.id)+parseInt(cardinals[direction]));
		if((cell.pieceName != 'k')||(nearCell.check != true)||(table.checkingcheck)){
			if(nearCell.hasPiece){
				if(cell.pieceName != 'p'){ //pawns can't take pieces in front of them
					if((nearCell.isWhite != table.whiteTurn)||(table.checkingcheck)){ //if the piece in the toCell is the fromCell's opposite color
						nearCell.option = true;
						nearCell.style.backgroundColor="lightBlue";
					}
				}
			}
			else{
				if((cell.pieceName != 'p')||!table.checkingcheck){
					nearCell.option = true;
					nearCell.style.backgroundColor="lightBlue";
					if(recurse){
						linOptions(nearCell, direction, recurse);
					}
				}
			}
		}
	}
}

function knightOptions(cell){
	cell_j = cell.id%n;
	cell_i=Math.floor(cell.id/n);
	if(cell_i>=2){
		if(cell_j>=1)
			knightSet(table.rows[cell_i-2].cells[cell_j-1]);
		if(cell_j<(n-1))
			knightSet(table.rows[cell_i-2].cells[cell_j+1]);
	}

	if(cell_i>=1){
		if(cell_j>=2)
			knightSet(table.rows[cell_i-1].cells[cell_j-2]);
		if(cell_j<(n-2))
			knightSet(table.rows[cell_i-1].cells[cell_j+2]);
	}

	if(cell_i<(n-1)){
		if(cell_j>=2)
			knightSet(table.rows[cell_i+1].cells[cell_j-2]);
		if(cell_j<(n-2))
			knightSet(table.rows[cell_i+1].cells[cell_j+2]);
	}

	if(cell_i<(n-2)){
		if(cell_j>=1)
			knightSet(table.rows[cell_i+2].cells[cell_j-1]);
		if(cell_j<(n-1))
			knightSet(table.rows[cell_i+2].cells[cell_j+1]);
	}


}

function knightSet(cell){
	if(cell.hasPiece){
			if((cell.isWhite != table.whiteTurn)||table.checkingcheck){ //if the piece in the toCell is the fromCell's opposite color
				cell.option = true;
				cell.style.backgroundColor="lightBlue";
			}
		}
	else{
		cell.option = true;
		cell.style.backgroundColor="lightBlue";
		}
	}

/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: Gives the toCell the properties of the fromCell and then resets the fromCell
* @param fromCell the cell you're moving piece from
* @param toCell the cell you're moving it to
*/

function tentativeMove(fromCell, toCell){
	if(toCell.option){
		let tempisWhite = toCell.isWhite;
		let temppieceName = toCell.pieceName;
		let temphasPiece = toCell.hasPiece;
		let tempinnerHTML = toCell.innerHTML;


		toCell.isWhite = fromCell.isWhite;
		toCell.pieceName = fromCell.pieceName;
		toCell.innerHTML = fromCell.innerHTML;
		toCell.hasPiece = true;
		fromCell.pieceName = '';
		fromCell.isWhite = false;
		fromCell.hasPiece = false;
		fromCell.innerHTML = "";
		checkcheck(table.whiteTurn);
		if(table.inCheck){
			fromCell.pieceName = toCell.pieceName;
			fromCell.isWhite = toCell.isWhite;
			fromCell.hasPiece = true;
			fromCell.innerHTML = toCell.innerHTML;
			toCell.isWhite = tempisWhite;
			toCell.pieceName = temppieceName;
			toCell.hasPiece = temphasPiece;
			toCell.innerHTML = tempinnerHTML;
		}
		else{
			toCell.hasMoved = true; //pretty sure this never needs to be reset to false EVER
			if((toCell.pieceName == 'p')&&((toCell.id < n)||(toCell.id >= n*(n-1)))){ //promote pawn
			//	toCell.king = true;
		}
			newTurn();
		}
	}
}



function checkcheck(isWhite){
	table.checkingcheck = true;
	resetCheck();
	resetOptions();
	for(let i = 0; i < n*n; i++){
		cell = document.getElementById(i);
		if((cell.hasPiece)&&(cell.isWhite != isWhite)){
			if(cell.pieceName != 'p'){
				showOptions(cell);
			}
			else{ //PAWN
				if(cell.isWhite){
					diagOptions(cell, "br", false);
					diagOptions(cell, "bl", false);
					}
				else{
					diagOptions(cell, "tl", false);
					diagOptions(cell, "tr", false);
				}
			}
		}
	}
	for(let i = 0; i < n*n; i++){
		cell = document.getElementById(i);
		cell.check = cell.option;
		if ((cell.isWhite == isWhite)&&cell.check&&(cell.pieceName == 'k')){
			table.inCheck = true;
			console.log("king's in check!");
		}
	}
	resetOptions();
	table.checkingcheck = false;
}






/**
* pre: chess() must have been run
* post: Resets options, calls resetOPtions, resets the fromCell, toggles whose turn it is
*/

function newTurn() {
	table.from = null;
	resetOptions();
	resetCheck();
	table.whiteTurn = !table.whiteTurn;
	checkcheck(table.whiteTurn);
	table.whiteTurn ? document.getElementById("body").style.backgroundColor = "darkgray" : document.getElementById("body").style.backgroundColor ="black";
}

/**
* pre: chess() must have been run
* post: goes through each cell and undoes everything that showOptions could have done to each cell
*/

function resetOptions(){
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			cell = document.getElementById(i*n+j);
			cell.option = false;
			((i*n+j)%2 != i%2) ? cell.style.backgroundColor="grey" : cell.style.backgroundColor="white";
		}
	}
	table.shown = false;
}


function resetCheck(){
	table.inCheck = false;
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			cell = document.getElementById(i*n+j);
			cell.check = false;
		}
	}
}


function showCheck(){
	checkcheck(table.whiteTurn);
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			cell = document.getElementById(i*n+j);
			if(cell.check){
				cell.style.backgroundColor="red";
			}
		}
	}
}


/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html");
}
