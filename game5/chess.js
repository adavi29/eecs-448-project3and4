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

	//		cell.hasPiece = ((cell.id == 0)||(cell.id == n*n-1));


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
			document.getElementById(i).innerHTML = "rnbkqbnrpppppppp".charAt(i);
			document.getElementById(n*n-i-1).innerHTML = "RNBKQBNRPPPPPPPP".charAt(i); //temporary to show difference in colors
			/*
			document.getElementById(i).pieceName = "b".charAt(i);
			document.getElementById(n*n-i-1).pieceName = "b".charAt(i);
			document.getElementById(i).innerHTML = "b".charAt(i);
			document.getElementById(n*n-i-1).innerHTML = "B".charAt(i); //temporary to show difference in colors
*/
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
			enpassantCell.pieceName = 'p'; //possibly a bad idea
			if(cell.isWhite){
				linOptions(enpassantCell, "dn", false);
			}
			else{
				linOptions(enpassantCell, "up", false);
			}
			enpassantCell.pieceName = ''; //could also be a bad idea
			/*
			enpassantCell.option = true;
			enpassantCell.style.backgroundColor="lightBlue";
			*/
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
		if(nearCell.hasPiece){
			if(nearCell.isWhite != table.whiteTurn){ //if the piece in the toCell is the fromCell's opposite color
				nearCell.option = true;
				nearCell.style.backgroundColor="lightBlue";
			}
		}
		else{
			if(cell.pieceName != 'p'){
				nearCell.option = true;
				nearCell.style.backgroundColor="lightBlue";
				if(recurse){
					diagOptions(nearCell, direction, recurse);
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
		if(nearCell.hasPiece){
			if(cell.pieceName != 'p'){
				if(nearCell.isWhite != table.whiteTurn){ //if the piece in the toCell is the fromCell's opposite color
					nearCell.option = true;
					nearCell.style.backgroundColor="lightBlue";
				}
			}
		}
		else{
			nearCell.option = true;
			nearCell.style.backgroundColor="lightBlue";
			if(recurse){
				linOptions(nearCell, direction, recurse);
			}
		}
	}
}

function knightOptions(cell){
	let twoStep =  {up:-2*n, rt:2, dn:2*n, lf:-2};
	let oneStep =  {up:-n, rt:1, dn:n, lf:-1};

	let exists = {up:false, rt:false, dn:false, lf:false};

	exists.up = (parseInt(cell.id) - cardinals.up >= 0);
	exists.rt = (parseInt(cell.id)%n != (n-1));
	exists.dn = (parseInt(cell.id) + parseInt(cardinals.dn) < n*n);
	exists.lf = (parseInt(cell.id)%n != 0);

	for(direction in cardinals){
		if(exists[direction]){
			console.log(direction);
			console.log(parseInt(cell.id)+parseInt(cardinals[direction]));
			nearCell = document.getElementById(parseInt(cell.id)+parseInt(cardinals[direction]));
			if(nearCell.hasPiece){
				if(nearCell.isWhite != table.whiteTurn){ //if the piece in the toCell is the fromCell's opposite color
					nearCell.option = true;
					nearCell.style.backgroundColor="lightBlue";
				}
			}
			else{
				nearCell.option = true;
				nearCell.style.backgroundColor="lightBlue";
				if(recurse){
					linOptions(nearCell, direction, recurse);
				}
			}
		}
	}
}



/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: Gives the toCell the properties of the fromCell and then resets the fromCell
* @param fromCell the cell you're moving piece from
* @param toCell the cell you're moving it to
*/


function move(fromCell, toCell){
	if(toCell.option){
		toCell.hasMoved = true; //pretty sure this never needs to be reset to false EVER
		toCell.isWhite = fromCell.isWhite;
		toCell.pieceName = fromCell.pieceName;
		fromCell.pieceName = '';
		toCell.innerHTML = fromCell.innerHTML; //temporary to show capitalness instead of color
		fromCell.isWhite = false;
		fromCell.hasPiece = false;
		toCell.hasPiece = true;
		fromCell.innerHTML = "";
	//	toCell.innerHTML = toCell.pieceName; //this is the proper code
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
