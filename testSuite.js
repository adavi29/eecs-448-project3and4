function run(){
  test();
  test2();
  ticTacToetestSuite();
}

function ticTacToeTests(){
  ticTacToe();

}

/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("homePage.html");
}
