gameIndex=1;
/**
* nextGame()
* Changes slide picture to next game's picture.
* Uses gameIndex to track which game's picture to display.
* Increments gameIndex by one and accounts for index going out of bounds.
*/
function nextGame(){
  gameIndex++;
  if(gameIndex==5){
    gameIndex=1;
  }
  document.getElementById("gamePic").src= "homePage/game"+gameIndex+".jpg";
}
/**
* previousGame()
* Changes slide picture to previos game's picture.
* Uses gameIndex to track which game's picture to display.
* Decrements gameIndex by one and accounts for index going out of bounds.
*/
function previousGame(){
  gameIndex--;
  if(gameIndex==0){
    gameIndex=4;
  }
  document.getElementById("gamePic").src= "homePage/game"+gameIndex+".jpg";

}
/**
*
* Changes slide picture to next game's picture
* Uses gameIndex to track which game's picture to display
* Increments gameIndex by one and accounts for index going out of bounds
*/
function goToGame(){
  htmlName = "https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/game"+gameIndex+"/game"+gameIndex+".html";
  window.location.replace(htmlName);
}
