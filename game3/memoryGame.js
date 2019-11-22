const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let hasFlippedSecondCard=false;
let firstCard, secondCard, thirdCard;
let lockBoard=false;
let numCorrect=0;
let testing=false;
let madeToDisable=false;
let madeToUnflip=false;
let madeToReset=false;

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
  if(this === firstCard || this === secondCard){
    return;
  }
  this.classList.add('flip');
  if(!hasFlippedCard){
    hasFlippedCard=true;
    firstCard=this;
    return;
  }
  if(!hasFlippedSecondCard){
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
  if(testing=true){
    madeToDisable=true;
  }
  resetBoard();
}

/**
*Pre: The three cards chosen do not match
*Post: Locks board, unflips the three cards, and resets board.
*/
function unflipCards(){
  if(testing=true){
    madeToUnflip=true;
  }
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
  if(testing){
    madeToReset=true;
  }
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
*Post: Runs first round of tests.
*/
function runMemoryTests(){
  testing=true;
  document.getElementById("test").disabled = true;
  document.getElementById("card1").click();
  let test1 = "Test 1: hasFlippedCard is true and hasFlippedSecondCard is false when one card is clicked: ";
  let test2 = "Test 2: firstCard is not null after one card has been clicked: ";
  let test3 = "Test 3: secondCard and thirdCard are null if same first card is clicked again: ";
  let test4 = "Test 4: firstCard and secondCard are not null after two cards have been clicked: ";
  let test5 = "Test 5: Disable function is called when three of the same card were flipped: ";
  let test6 = "Test 6: Reset function is called from disable function: ";

  if(hasFlippedCard==true && hasFlippedSecondCard==false){
    document.getElementById("test1").innerText = test1 + "PASSED";
  } else {
    document.getElementById("test1").innerText = test1 + "FAILED";
  }
  if(firstCard!=null){
    document.getElementById("test2").innerText = test2 + "PASSED";
  }else {
    document.getElementById("test2").innerText = test2 + "FAILED";
  }

  document.getElementById("card1").click();
  if(firstCard!=null && secondCard==null && thirdCard==null){
    document.getElementById("test3").innerText = test3 + "PASSED";
  }else {
    document.getElementById("test3").innerText = test3 + "FAILED";
  }

  document.getElementById("card2").click();
  if(firstCard!=null && secondCard!=null && thirdCard==null){
    document.getElementById("test4").innerText = test4 + "PASSED";
  }else {
    document.getElementById("test4").innerText = test4 + "FAILED";
  }
  document.getElementById("card3").click();
  if(madeToDisable){
    document.getElementById("test5").innerText = test5 + "PASSED";
  }else {
    document.getElementById("test5").innerText = test5 + "FAILED";
  }
  if(madeToReset){
    document.getElementById("test6").innerText = test6 + "PASSED";
  } else {
    document.getElementById("test6").innerText = test6 + "FAILED";
  }
setTimeout(()=>{runTests2();}, 2000);


}

/**
*Pre: Initial tests are complete.
*Post: Runs second round of tests.
*/
function runTests2(){
  let test7 = "Test 7: Unflip function is called after three unmatching cards were flipped: ";
  let test8 = "Test 8: All cards are unflipped after calling clearBoard: ";
  let test9 = "Test 9: Cards have a different order after calling clearBoard: ";
  let test10 = "Test 10: Three cards can be chosen after calling clearBoard: ";

  document.getElementById("card4").click();
  document.getElementById("card7").click();
  document.getElementById("card8").click();

  if(madeToUnflip){
    document.getElementById("test7").innerText = test7 + "PASSED";
  } else {
    document.getElementById("test7").innerText = test7 + "FAILED";
  }
  madeToUnflip=false;
  madeToDisable=false;
  setTimeout(()=>{
    let cardOrderBefore=[];
    cards.forEach((card) => {
      cardOrderBefore.push(card.style.order);
    });
    clearBoard();
    let cardsUnflipped=true;
    cards.forEach((card) => {
      if(card.classList.contains('flip')){
        cardsUnflipped=false;
      }
    });
    if(cardsUnflipped){
      document.getElementById("test8").innerText = test8 + "PASSED";
    }else {
      document.getElementById("test8").innerText = test8 + "FAILED";
    }
    document.getElementById("card4").click();
    let cardOrderAfter=[];
    cards.forEach((card) => {
      cardOrderAfter.push(card.style.order);
    });
    if(cardOrderBefore != cardOrderAfter){
      document.getElementById("test9").innerText = test9 + "PASSED";
    }else {
      document.getElementById("test9").innerText = test9 + "FAILED";
    }
    setTimeout(()=>{
      document.getElementById("card3").click();
      document.getElementById("card6").click();
      document.getElementById("card9").click();
      if(madeToUnflip || madeToDisable){
        document.getElementById("test10").innerText = test10 + "PASSED";
      } else {
        document.getElementById("test10").innerText = test10 + "FAILED";
      }
    }, 1000);

  }, 2000);


  madeToUnflip=false;
  madeToDisable=false;
  testing=false;
}
