gameIndex=1;

function nextGame(){
  gameIndex++;
  if(gameIndex==3){
    gameIndex=1;
  }
  document.getElementById("gamePic").src= "game"+gameIndex+".jpg";
}

function previousGame(){
  gameIndex--;
  if(gameIndex==0){
    gameIndex=2;
  }
  document.getElementById("gamePic").src= "game"+gameIndex+".jpg";

}

function goToGame(){
  htmlName = "game"+gameIndex+".html";
  window.location.replace(htmlName);
}
