/**
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
			document.getElementById("body").style.backgroundColor = "darkRed";
			checkers()};
		}

/**
* pre: board must exist with cells, click must have happened on a cell
* post: decides what to do with click depending on what's within the cell,
* 		whose turn it is, and if a piece has been clicked or jumped before
* param cell the cell that was clicked
* param n size of the board
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
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: shows any cells that the piece can move or jump to, marks them as options or jump, and
* prepares the board for the next jump or move.
* param cell the cell that was clicked
*/


function showOptions(cell){
	table.shown = true;
	table.from = cell;

	let can = {bl:false, br:false, tl:false, tr:false};
	let alg = {bl:-1+n, br:1+n, tl:-1-n, tr:1-n};
	let far = {bl:false, br:false, tl:false, tr:false};
	let dub = {bl:-2+2*n, br:2+2*n, tl:-2-2*n, tr:2-2*n};


	if(cell.isRed||cell.king){
		can.bl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) + parseInt(n) < n*n));
		can.br = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) + parseInt(n) < n*n));
	}
	if(!(cell.isRed)||cell.king){
		can.tl = ((parseInt(cell.id)%n != 0)&&(parseInt(cell.id) - n >= 0));
		can.tr = ((parseInt(cell.id)%n != (n-1))&&(parseInt(cell.id) - n >= 0));
	}
	for(let direction in can){
		if(can[direction]){
			nearCell = document.getElementById(parseInt(cell.id)+parseInt(alg[direction]));
			if(nearCell.hasPiece){
				if(nearCell.isRed!=cell.isRed){
					if(cell.isRed||cell.king){
						far.bl = ((parseInt(nearCell.id)%n != 0)&&(parseInt(nearCell.id) + parseInt(n) < n*n));
						far.br = ((parseInt(nearCell.id)%n != (n-1))&&(parseInt(nearCell.id) + parseInt(n) < n*n));
					}
					if(!(cell.isRed)||cell.king){
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

/**
* pre: board must exist with cells, click must have happened on a cell that had a piece in it
* post: Gives the toCell the properties of the fromCell and then resets the fromCell
* param fromCell the cell you're moving piece from
* param toCell the cell you're moving it to
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
* pre: board must exist with cells, click must have happened on a cell that had a piece in it, piece must be between from and to
* post: Gives the toCell the properties of the fromCell and then resets the fromCell and the cell between them
* param fromCell the cell you're moving piece from
* param toCell the cell you're moving it to
*/

function jump(fromCell, toCell){
	if(toCell.option){

		midCell = document.getElementById(parseInt(fromCell.id)+parseInt(parseInt(toCell.id-fromCell.id)/2))

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
* pre: checkers() must have been run
* post: Resets options, calls resetOPtions, resets the fromCell, toggles whose turn it is
*/

function newTurn() {
	table.from = null;
	resetOptions();
	table.hasJumped = false;
	table.redTurn = !table.redTurn;
	table.redTurn ? document.getElementById("body").style.backgroundColor = "darkRed" : document.getElementById("body").style.backgroundColor ="black";
}

/**
* pre: checkers() must have been run
* post: goes through each cell and undoes everything that showOptions could have done to each cell
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
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("../homePage.html");
}

function testReset(){
	for(let l = (n-1); l >= 0; l--){
		table.deleteRow(l);
	}
	document.getElementById("body").style.backgroundColor = "darkRed";

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
			}

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



}

function corporealize(){
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			cell = table.rows[i].cells[j];
			if(cell.hasPiece){
				(cell.isRed) ? cell.innerHTML = "&#128308" : cell.innerHTML =  "&#9899";
			}
		}
	}
}

/**
*Pre: Test button was clicked
*Post: Runs all tests
*/
function test(){
	testReset();
	test = document.getElementById("test");
	test.style.fontSize = "10px";
	let u = 0;
	let p = [];
	for(m = 0; m < 20; m++){
		p[m] = document.createElement('p');
		p[m].style.fontSize = "10px";
	}

	p[u].innerHTML += "Testing piece placement: ";
	let testCell = document.getElementById(1);
	testCell.hasPiece = true;
	testCell.isRed = true;
	corporealize();
	(testCell.hasPiece&&testCell.isRed) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;

	p[u].innerHTML += "Testing showing piece move options: ";
	testCell.onmousedown();
	(document.getElementById(8).option&&document.getElementById(10).option) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;

	p[u].innerHTML += "Testing showing piece jump options: ";
	document.getElementById(10).hasPiece = true;
	document.getElementById(10).isRed = false;
	corporealize();
	testCell.onmousedown();
	(document.getElementById(8).option&&document.getElementById(19).option) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;

	p[u].innerHTML += "Testing that jump() moves jumper and removes jumpee: ";
	testCell = document.getElementById(19);
	testCell.onmousedown();
	(testCell.hasPiece&&testCell.isRed&&!document.getElementById(10).hasPiece&&!document.getElementById(1).hasPiece) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;

	p[u].innerHTML += "Testing that move() moves piece to a cell and removes it from previous cell: ";
	newTurn();
	table.redTurn = true;
	testCell = document.getElementById(19);
	testCell.onmousedown();
	document.getElementById(26).onmousedown();
	(document.getElementById(26).hasPiece&&!document.getElementById(19).hasPiece) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;


	p[u].innerHTML += "Testing that pieces become kings when they reach the opposite end: ";
	newTurn();
	testReset();

	table.redTurn = true;
	testCell = document.getElementById(51);
	testCell.hasPiece = true;
	testCell.isRed = true;
	testCell.onmousedown();
	document.getElementById(60).onmousedown();
	(document.getElementById(60).king) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;

	p[u].innerHTML += "Testing multijumping: ";
	table.redTurn = true;
	testCell = document.getElementById(51);

	document.getElementById(53).isRed = false;
	document.getElementById(53).hasPiece = true;
	document.getElementById(37).isRed = false;
	document.getElementById(37).hasPiece = true;
	corporealize();
	testCell.onmousedown();
	document.getElementById(60).onmousedown();
	document.getElementById(46).onmousedown();
	document.getElementById(28).onmousedown();
	(!document.getElementById(53).hasPiece&&!document.getElementById(37).hasPiece&&document.getElementById(28).hasPiece&&document.getElementById(28).king) ? p[u].innerHTML += "Passed\n" : p[u].innerHTML += "Failed\n";
	test.appendChild(p[u]);
	u++;


}
