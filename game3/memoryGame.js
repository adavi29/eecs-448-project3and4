const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let firstCard, secondCard;
let lockBoard=false;
let numCorrect=0;

cards.forEach(card => card.addEventListener('click', flipCard));
shuffleCards();

/*
*Not finished yet, but will end up controlling what happens when a card is flipped
*/
function flipCard(){
  if(lockBoard){
    return;
  }
  if(this === firstCard){
    return;
  }
  this.classList.add('flip');
  if(!hasFlippedCard){
    hasFlippedCard=true;
    firstCard=this;
    return;
  }
  secondCard=this;

  checkForMatch();
}

function checkForMatch(){
  if(firstCard.dataset.framework == secondCard.dataset.framework){
    disableCards();
    numCorrect++;
    if(numCorrect==6){
      document.getElementById('youWin').innerText = "You Win!";
    }
    return;
  }
  unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard=true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();}, 1200);
}

function resetBoard(){
  hasFlippedCard=false;
  lockBoard=false;
  firstCard,secondCard=null;
}

function shuffleCards(){
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
}

function clearBoard(){
  document.getElementById('youWin').innerText = "";
  hasFlippedCard=false;
  firstCard, secondCard=null;
  lockBoard=false;
  numCorrect=0;
  cards.forEach((card) => {
    if(card.classList.contains('flip')){
      card.classList.remove('flip');
      card.addEventListener('click', flipCard)
    }
  });
  setTimeout(shuffleCards, 1000);
}
/**
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("../homePage.html");
}
