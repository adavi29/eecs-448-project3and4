const cards = document.querySelectorAll('.memory-card');

/*
*flipCard()
*Not finished yet, but will end up controlling what happens when a card is flipped
*/
function flipCard(){
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard))

/**
* backHome()
* pre: the HTML button exists
* post: Takes the user back to the home page of the arcade
*/
function backHome(){
  window.location.replace("https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html");
}
