function run(){

}

/**
* Post: Takes player to corresponding game html.
* Uses gameIndex to track which game to go to.
*/
function goToGame(){
  htmlName = "game"+gameIndex+"/game"+gameIndex+".html";
  window.location.replace(htmlName);
}
