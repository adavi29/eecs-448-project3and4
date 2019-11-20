const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let hasFlippedSecondCard=false;
let firstCard, secondCard, thirdCard;
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
  if(!hasFlippedSecondCard){
    if(this === firstCard){
      return;
    }
    hasFlippedSecondCard=true;
    secondCard=this;
    return;
  }
  thirdCard=this;

  checkForMatch();
}

function checkForMatch(){
  if(firstCard.dataset.framework == secondCard.dataset.framework && firstCard.dataset.framework == thirdCard.dataset.framework && thirdCard.dataset.framework == secondCard.dataset.framework){
    disableCards();
    numCorrect++;
    if(numCorrect==4){
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
    thirdCard.classList.remove('flip');
    resetBoard();}, 1200);
}

function resetBoard(){
  hasFlippedCard=false;
  hasFlippedSecondCard=false;
  lockBoard=false;
  firstCard,secondCard,thirdCard=null;
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
  hasFlippedSecondCard=false;
  firstCard, secondCard,thirdCard=null;
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

function runMemoryTests(){
  //test 1 on click card turns
  document.getElementById("card1").click()
  let test1 = "Test 1: hasFlippedCard is true when a card is clicked: "
  if(hasFlippedCard==true){
    document.getElementById("test1").innerText = test1 + "PASSED";
  } else {
    document.getElementById("test1").innerText = test1 + "FAILED";
  }
}
