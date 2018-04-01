# Memory Game Project

## Table of Contents

* [Description](#description)
* [Instructions](#instructions)
* [How to Play](#how-to-play)
	* [Rating](#rating)
	* [Timer](#timer)
	* [Moves](#moves)
* [Resources](#resources)
* [Contributing](#contributing)

## Description
This Memory Game is built as a project for the Udacity Front End Developer Nanodegree Program. It is written in HTML, CSS and javaScript. 

## Instructions

This game can played on any device but a browser is required. You can reach the page from [this GitHub Page](https://delczegemma.github.io/fend-project-memory-game/)

## How to Play
This game is an online version of a basic, single player memory card game. Every card of the deck has its pair with the same symbol of it. The user can see two of them at once, then the cards are flipping back. in order to win the game, the player has to remember, which symbol was on the card, and has to find it's pair.

### Rating
The play wins the game in every occasion, when find every pair of card. However it can be done with different efficiency. The game is counting the moves the player has made.  Checking of two cards (a possible matching) counts as one move. There is a 3star score, that a player can reach. After 18 steps taken the player loses one star. After 30 moves taken the player can earn only one star. The stars could be earned are displayed in the page. At the end of the game, the player receives the information about the number stars she/he earned.

### Timer
When the user begins the game (clicks the first card to flip) a timer starts counting on the page. If the user wins or restart the game the timer stops. At the end of the game the user receives the information about the amount of time it took to complete the task.

### Moves
The number of moves the user has made is displayed on the page while playing.

## Resources
- The static frame of this game is given in a [Udacity repository](https://github.com/udacity/fend-project-memory-game).
- To the shuffle the cards in random order a function was given to the project from [stackowerflow](http://stackoverflow.com/a/2450976).
- To coding the timer I got the idea from [Daniel Hug](https://jsfiddle.net/Daniel_Hug/pvk6p/).

## Contributing

This repository is an Udacity Project. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
