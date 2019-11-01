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

function click(cell, n){
	console.log("click!", cell.id);
//	if(!table.hasJumped){
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
	//	}
	}
	/*	while(table.canJump){
			jump(table.from, cell);
		}
		newTurn();
	}
	*/
}


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

function move(fromCell, toCell){
	if(toCell.option){
		console.log("moved");
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

function jump(fromCell, toCell){
	if(toCell.option){
		midCell = document.getElementById(parseInt(fromCell.id)+parseInt(toCell.id-fromCell.id)/2)
//		console.log(document.getElementById(parseInt(fromCell.id)+parseInt(toCell.id-fromCell.id)/2));

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

function newTurn() {
	table.from = null;
	resetOptions();
	table.hasJumped = false;
	table.redTurn = !table.redTurn;
	table.redTurn ? document.getElementById("body").style.backgroundColor = "darkRed" : document.getElementById("body").style.backgroundColor ="black";
}

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
