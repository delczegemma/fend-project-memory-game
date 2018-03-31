/*
 * Create a list that holds all of your cards
 */
const cardContents = [
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

 const playGround = document.querySelector('.deck');
 const cards = playGround.querySelectorAll('.card');
 const modal = document.getElementById('myModal');
 const starList = document.querySelectorAll('.stars');
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
	sec = 0, min = 0, hour = 0;
	timeOnBoard();
	displayMove(move);
	shuffle(cardContents);
	for(let i = 0; i < cards.length; i++ ) {
		cards[i].innerHTML = '<i class="fa ' + cardContents[i] + '"></i>';
	}
}

function restart() {
	for (const card of cards) {
		card.classList.remove('show', 'open', 'match');
	}
	starList[0].innerHTML = '<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>'+
                '<li><i class="fa fa-star"></i></li>';
    starList[1].innerHTML = '<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>'+
                '<li><i class="fa fa-star"></i></li>'
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

//Movecounters

function displayMove(num) {
	document.querySelector('.moves').innerText = num + " ";
}

function scoreCounter(steps) {
	if (steps === 18 || steps === 30) {
		displayStars()
	}
}

function displayStars() {
	console.log(starList[1]);
	starList[0].removeChild(starList[0].firstElementChild);
	starList[1].removeChild(starList[1].firstElementChild);
}

//Timer
//Idea from here: https://jsfiddle.net/Daniel_Hug/pvk6p/
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
	runTimout = setTimeout(timer, 1000);
}

function displayTimer () {
	let time =  (hour ? (hour > 9 ? hour + ":" : "0" + hour + ":") : "") +
	 (min ? (min > 9 ? min : "0" + min) : "00") +
	  ":" + (sec > 9 ? sec : "0" + sec);
	return time;
}

function timeOnBoard () {
	const clock = document.querySelector('time');
	let time = displayTimer();
	clock.innerHTML = time;
}

function stopTime () {
	clearTimeout(runTimout);
	let result = document.querySelector('.time');
	let time = displayTimer();
	result.innerHTML = time;
}

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


// Main function
 function memoryGame(e) {
 	if(!(e.target.classList.contains('show') || e.target.parentNode.classList.contains('show'))) {
 		if (clicknum === -1) {
			clicknum = 0;
			startTime();
		}
 		clicknum++;
 		turn(e.target);
 		if (clicknum === 2) {
 			move++;
 			if(e.target.innerHTML === prev.innerHTML) {
 				e.target.classList.add('match');
 				prev.classList.add('match');
 				matched = matched + 2;
 				if(matched === cards.length){
 					winMessage();
 				}
 			} else {
 				setTimeout(function() {
    				turn(prev);
    				turn(e.target);
  				}, 900);
 			}
 			clicknum = 0;
 			displayMove(move);
 			scoreCounter(move);
 		} else {
 			prev = e.target;
 		}
 	}
 }

function turn(o) {
	o.classList.toggle('open');
	o.classList.toggle('show');
}

// Modal events
 function winMessage() {
 	console.log("itt vagyok");
 	stopTime();
 	modal.style.display = 'block';
 }

 function closeModal() {
 	modal.style.display = 'none';
 }

// Event Listeners

playGround.addEventListener('click', memoryGame, false);
document.querySelector('.restart').addEventListener('click',restart,false);
document.querySelector('.again').addEventListener('click',restart,false);

//Modal event listeners
document.getElementById('modalClose').addEventListener('click', closeModal);

window.addEventListener('load',init, false);
