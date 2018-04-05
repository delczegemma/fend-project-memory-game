const CARD_CONTENTS = [
      'fa-paper-plane-o',
      'fa-diamond',
      'fa-anchor',
      'fa-bicycle',
      'fa-bolt',
      'fa-cube',
      'fa-leaf',
      'fa-bomb',
      'fa-paper-plane-o',
      'fa-diamond',
      'fa-anchor',
      'fa-bicycle',
      'fa-bolt',
      'fa-cube',
      'fa-leaf',
      'fa-bomb'
    ];

 const PLAYGROUND = document.querySelector('.deck');
 const CARDS = PLAYGROUND.querySelectorAll('.card');
 const MODAL = document.getElementById('myModal');
 const STAR_LIST = document.querySelectorAll('.stars');
 let clicknum = -1;
 let move = 0;
 let matched = 0;
 let prev = null;
 let sec = 0, min = 0, hour = 0;
 let runTimeout;

 //Arrange the deck in a new order to getting start the game
function init() {
	move = 0;
	clicknum = -1;
	matched = 0;
	prev = null;
	sec = 0; min = 0; hour = 0;
	timeOnBoard();
	displayMove(move);
	shuffle(CARD_CONTENTS);
	for(let i = 0; i < CARDS.length; i++ ) {
		CARDS[i].innerHTML = '<i class="fa ' + CARD_CONTENTS[i] + '"></i>';
	}
}

//Setting everything back to the starting position t obe able starting the game again
function restart() {
	for (const CARD of CARDS) {
		CARD.classList.remove('show', 'open', 'match');
	}
	STAR_LIST[0].innerHTML = '<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>'+
                '<li><i class="fa fa-star"></i></li>';
    STAR_LIST[1].innerHTML = '<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>'+
                '<li><i class="fa fa-star"></i></li>';
	closeModal();
	stopTime();
	setTimeout(init,900);
}
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

//** Movecounters Section **
//Displays the movesteps to the page
function displayMove(num) {
	document.querySelector('.moves').innerText = `${num} `;
}

//Decides, when a star is getting loose and stepping to a lower score phase
function scoreCounter(steps) {
	if (steps === 18 || steps === 30) {
		displayStars();
	}
}

//Remove starts from the page, when it is needed
function displayStars() {
	STAR_LIST[0].removeChild(STAR_LIST[0].firstElementChild);
	STAR_LIST[1].removeChild(STAR_LIST[1].firstElementChild);
}

//** Timer Section **
//Set the timer values. Idea from here: https://jsfiddle.net/Daniel_Hug/pvk6p/
let timer = function() {
	sec++;
	if (sec === 60) {
		sec = 0;
		min++;
	}
	if (min === 60){
		min = 0;
		hour++;
	}
	timeOnBoard();
	runTimeout = setTimeout(timer, 1000);
};

//Format the the text of the time, how it should be displayed
function displayTimer () {
	let time =  (hour ? (hour > 9 ? hour + ":" : "0" + hour + ":") : "") +
	 (min ? (min > 9 ? min : "0" + min) : "00") +
	  ":" + (sec > 9 ? sec : "0" + sec);
	return time;
}

//Displays the timer to the page
function timeOnBoard () {
	const CLOCK = document.querySelector('time');
	let time = displayTimer();
	CLOCK.innerHTML = time;
}

//Stops the timer and sends the final step to be displayed in upcoming modal.
function stopTime () {
	clearTimeout(runTimeout);
	let result = document.querySelector('.time');
	let time = displayTimer();
	result.innerHTML = time;
}

//Starts te timer to being recounted in each second.
function startTime () {
		setTimeout(timer, 1000);
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


//** Main function **
// Sets the happenings, when a card is being clicked.
function memoryGame(e) {
 	if(!(e.target.classList.contains('show') || e.target.parentNode.classList.contains('show')) && (e.target.classList.contains('card'))) {
 		if (clicknum === -1) {
			clicknum = 0;
			startTime();
		}
		if(clicknum == 2){
            return;
        }
		turn(e.target);
		clicknum++;
		if (clicknum === 2 ){
			checkIfMatch(e.target);
			setTimeout(function(){
				clicknum = 0;
			},1000);
		} else {
 			prev = e.target;
 		}
 	}
 }

//Compare the first and second clicked card. Decied what is going to happening if they mach,
//if all matched or not match.
function checkIfMatch(clickedCard) {
	move++;
 	if(clickedCard.innerHTML === prev.innerHTML) {
 		clickedCard.classList.add('match');
 		prev.classList.add('match');
 		matched = matched + 2;
 		if(matched === CARDS.length){
 			winMessage();
 		}
 	} else {
 		setTimeout(function() {
   			turn(prev);
			turn(clickedCard);
  		}, 900);
 	}
 	displayMove(move);
	scoreCounter(move);
}

//Flips the card back and forward.
function turn(o) {
	o.classList.toggle('open');
	o.classList.toggle('show');
}

// ** Modal events **
//shows the winmessage modal.
 function winMessage() {
 	stopTime();
 	MODAL.style.display = 'block';
 }

//Close the winmessage modal.
 function closeModal() {
 	MODAL.style.display = 'none';
 }

// Event Listeners

PLAYGROUND.addEventListener('click', memoryGame);
document.querySelector('.restart').addEventListener('click',restart,false);
document.querySelector('.again').addEventListener('click',restart,false);

//Modal event listeners
document.getElementById('modalClose').addEventListener('click', closeModal);

window.addEventListener('load',init, false);