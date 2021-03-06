gameIndex=1;
/**
* Post: Changes slide picture to next game's picture.
* Uses gameIndex to track which game's picture to display.
* Increments gameIndex by one and accounts for index going out of bounds.
*/
function nextGame(){
  gameIndex++;
  if(gameIndex==7){
    gameIndex=1;
  }
  document.getElementById("gamePic").src= "homePage/game"+gameIndex+".jpg";
}
/**
* Post: Changes slide picture to previos game's picture.
* Uses gameIndex to track which game's picture to display.
* Decrements gameIndex by one and accounts for index going out of bounds.
*/
function previousGame(){
  gameIndex--;
  if(gameIndex==0){
    gameIndex=6;
  }
  document.getElementById("gamePic").src= "homePage/game"+gameIndex+".jpg";

}
/**
* Post: Takes player to corresponding game html.
* Uses gameIndex to track which game to go to.
*/
function goToGame(){
  htmlName = "game"+gameIndex+"/game"+gameIndex+".html";
  window.location.replace(htmlName);
}
