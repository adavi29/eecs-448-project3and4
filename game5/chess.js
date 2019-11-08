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

			cell.isWhite = (cell.id<2*n);  //assigns initial white
			cell.hasPiece = ((cell.id>(n-2)*n-1)||(cell.id<2*n)); //assigns all

			if((cell.id)%2 != i%2){
				cell.style.backgroundColor="grey";
			}

			if(((cell.id >= n)&&(cell.id < n*2))||((cell.id>=(n-2)*n)&&(cell.id<(n-1)*n))){
				cell.pieceName = 'p';
			}

			else if((cell.id==0)||(cell.id==(n-1))||(cell.id==(n-1)*n)||(cell.id==(n*n-1))){
				cell.pieceName = 'r';
			}

			else if((cell.id==1)||(cell.id==(n-2))||(cell.id==(n-1)*n+1)||(cell.id==(n*n-2))){
				cell.pieceName = 'n';
			}

			else if((cell.id==2)||(cell.id==(n-3))||(cell.id==(n-1)*n+2)||(cell.id==(n*n-3))){
				cell.pieceName = 'b';
			}

			else if((cell.id==4)||(cell.id==(n-1)*n+4)){
				cell.pieceName = 'q';
			}

			else if((cell.id==3)||(cell.id==(n*n-5))){
				cell.pieceName = 'k';
			}

			cell.innerHTML = cell.pieceName; ///temporary


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
					}
				}
				click(this); };
			}
		}



		for(let i = 0; i < n; i++){
			for(let j = 0; j < n; j++){
				cell = table.rows[i].cells[j];
				if(cell.hasPiece){
			//		(cell.isWhite) ? cell.innerHTML = "&#128308" : cell.innerHTML =  "&#9899";
				}
			}
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
		if((cell.option)&&(!cell.hasPiece)){
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
	*/
}

/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: Gives the toCell the properties of the fromCell and then resets the fromCell
* @param fromCell the cell you're moving piece from
* @param toCell the cell you're moving it to
*/


function move(fromCell, toCell){
	/*
	if(toCell.option){
		toCell.isWhite = fromCell.isWhite;
		toCell.king = fromCell.king;
		fromCell.king = false;
		fromCell.isWhite = false;
		fromCell.hasPiece = false;
		toCell.hasPiece = true;
		fromCell.innerHTML = "";
		if((toCell.id < n)||(toCell.id >= n*(n-1))){
			toCell.king = true;
		}
		if(toCell.king){
			(toCell.isWhite) ? toCell.innerHTML = "❤️" : toCell.innerHTML =  "🖤";
		}
		else{
			(toCell.isWhite) ? toCell.innerHTML = "&#128308" : toCell.innerHTML =  "&#9899";
		}
	}
	*/
}

/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it, piece must be between from and to
* post: Gives the toCell the properties of the fromCell and then resets the fromCell and the cell between them
* @param fromCell the cell you're moving piece from
* @param toCell the cell you're moving it to
*/

function jump(fromCell, toCell){
	/*
	if(toCell.option){

		midCell = document.getElementById(parseInt(fromCell.id)+parseInt(parseInt(toCell.id-fromCell.id)/2))

		midCell.hasPiece = false;
		midCell.king = false;
		midCell.innerHTML = "";

		toCell.isWhite = fromCell.isWhite;
		toCell.king = fromCell.king;
		fromCell.king = false;
		fromCell.isWhite = false;
		fromCell.hasPiece = false;
		toCell.hasPiece = true;
		fromCell.innerHTML = "";
		table.hasJumped = true;
		if((toCell.id < n)||(toCell.id >= n*(n-1))){
			toCell.king = true;
		}
		if(toCell.king){
			(toCell.isWhite) ? toCell.innerHTML = "❤️" : toCell.innerHTML =  "🖤";
		}
		else{
			(toCell.isWhite) ? toCell.innerHTML = "&#128308" : toCell.innerHTML =  "&#9899";
		}
		resetOptions();
		showOptions(toCell);
		}
		*/
}

/**
* pre: checkers() must have been run
* post: Resets options, calls resetOPtions, resets the fromCell, toggles whose turn it is
*/

function newTurn() {
	/*
	table.from = null;
	resetOptions();
	table.hasJumped = false;
	table.whiteTurn = !table.whiteTurn;
	table.whiteTurn ? document.getElementById("body").style.backgroundColor = "darkRed" : document.getElementById("body").style.backgroundColor ="black";
	*/
}

/**
* pre: checkers() must have been run
* post: goes through each cell and undoes everything that showOptions could have done to each cell
*/

function resetOptions(){
	/*
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			document.getElementById(i*n+j).option = false;
			document.getElementById(i*n+j).jump = false;
		}
	}
	table.shown = false;
	table.canJump = false;
	*/
}

/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html");
}
