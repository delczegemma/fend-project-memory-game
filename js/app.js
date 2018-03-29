/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 const playGround = document.querySelector('.deck');
 const cards = playGround.querySelectorAll(".card");
 let clicknum = 0;
 let matched = 0;
 let prev = null;
 let modal = document.getElementById('myModal');


// Main function
 function memoryGame(e){
 	if(!(e.target.classList.contains("show") || e.target.parentNode.classList.contains("show"))){
 		clicknum++;
 		turn(e.target);
 		if (clicknum === 2){
 			if(e.target.innerHTML === prev.innerHTML){
 				e.target.classList.add("match");
 				prev.classList.add("match");
 				matched = matched + 2;
 				if(matched === cards.length){
 					winMessage();
 				}
 			}else{
 				setTimeout(function() {
    				turn(prev);
    				turn(e.target);
  				}, 900);
 			}
 			clicknum = 0;
 		}else{
 			prev = e.target;
 		}
 	}
 }

function turn(o){
	o.classList.toggle('open');
	o.classList.toggle('show');
}

// Modal events
 function winMessage(){
 	modal.style.display = "block";
 }

 function closeModal(){
 	modal.style.display = "none";
 }

// Event Listeners

playGround.addEventListener('click', memoryGame);

//Modal event listeners
document.getElementById('modalClose').addEventListener('click', closeModal);
