const cards = document.querySelectorAll('.memory-card');

function flipCard(){
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard))





function backHome(){
  window.location.replace("https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html");
}
