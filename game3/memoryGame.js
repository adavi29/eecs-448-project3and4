const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let hasFlippedSecondCard=false;
let firstCard, secondCard, thirdCard;
let lockBoard=false;
let numCorrect=0;

cards.forEach(card => card.addEventListener('click', flipCard));
shuffleCards();

/**
*Post: assigns clicked on cards to firstCard, secondCard, and thirdCard based on how many cards have already been flipped.
*Also checks that the card hasn't been clicked before.
*Once all three cards have been assigned, it calls function to check for a match
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

/**
*Pre: Three cards have been chosen
*Post: Determines whether the three cards are matches.
*Disables cards if they match and unlfips them if they don't.
*Also tracks how many are correct to alert the user when they win.
*/
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

/**
*Pre: The three cards chosen all match
*Post: Removes event listeners on the three cards and resets board
*/
function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  thirdCard.removeEventListener('click', flipCard);
  resetBoard();
}

/**
*Pre: The three cards chosen do not match
*Post: Locks board, unflips the three cards, and resets board.
*/
function unflipCards(){
  lockBoard=true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    thirdCard.classList.remove('flip');
    resetBoard();}, 1200);
}

/**
*Pre: Cards have either been disabled or unflipped
*Post: Resets the following variables: hasFlippedCard, hasFlippedSecondCard, lockBoard, firstCard, secondCard, and thirdCard.
*/
function resetBoard(){
  hasFlippedCard=false;
  hasFlippedSecondCard=false;
  lockBoard=false;
  firstCard,secondCard,thirdCard=null;
}

/**
*Pre: card variable has been declared
*Post: shuffles the order id's for all cards to shuffle them
*/
function shuffleCards(){
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
}

/**
*Pre: User clicks new game.
*Post: Resets all variables, unflips all cards, resets card event listeners, and shuffles cards after 1000 ms.
*/
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
* Pre: the HTML button exists
* Post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("../homePage.html");
}

/**
*Post: Runs all tests.
*/
function runMemoryTests(){
  document.getElementById("card1").click()
  let test1 = "Test 1: hasFlippedCard is true and hasFlippedSecondCard is false when one card is clicked: "
  if(hasFlippedCard==true && hasFlippedSecondCard==false){
    document.getElementById("test1").innerText = test1 + "PASSED";
  } else {
    document.getElementById("test1").innerText = test1 + "FAILED";
  }
}
