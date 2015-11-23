var HANGMAN = {
	//create a list of words to pick from
	wordList: ["human", "photograph", "laptop", "magazine", "bookshelf","longhorn","change","market", "infinite","emperor","folly","inherent","lamp","table","backpack"],
	
	calledLetters: [],

	wrongGuesses: 0,
	
	//a function called getString to randomly selct a string from an array of strings
	getString: function(stringArr) {
		var index = Math.floor((Math.random()) * stringArr.length);
		return stringArr[index].toUpperCase();
	},

	//a function to display the spaces hiding the letters of the answer
	displayBlanks: function(wordArray){
		var wordBox = $('.word');
		wordArray.forEach(function(index){
			wordBox.append('<span class=letter>' + index +'</span>');
		});
	},


	//a function that takes in a correctly guessed letter and inserts into the proper
	//spaces of the display
	alterDisplay: function(insert, display, answer) {
		
		//track the instances of the letter in answer
		var howMany = 0;
		//display instances in place of blanks and increment howMany
		for(i = 0; i < answer.length; i++){
			if(insert === answer[i]){
				$('.word').find('span').eq(i).text(insert);
				howMany += 1;
				display[i] = insert;
			};
		};
		//update displayArr ***THIS WORKS, BUT SEEMS PROBLEMATIC CODE-WISE
		displayArr = display;
		
		var guessed = $('.guesses').find('p').eq(1);

		var response = $('.guesses').find('p').eq(0);

		//feedback to user for right or wrong guesses
		if (howMany === 0){
			this.wrongGuesses += 1;
			response.text('There are no ' + insert + 's.  Try again.');
		}

		else if(howMany === 1) {
			response.text('Well done!  There is one ' + insert + '.');
		}

		else {
			response.text('Way to go!  There are ' + howMany + ' ' + insert + 's!');
		}
		//add letter to list of guessed letters
		guessed.append(' ' + insert + ',');
		//add letter to array
		this.calledLetters.push(insert);
		console.log(this.win(display, answer));
		console.log(this.lose(this.wrongGuesses));
	},
	//function to test if the player won
	win: function(display, answer){
		return display.toString() === answer.toString();
	},
	//test if the player lost
	lose: function(num) {
		return num === 6;
	}



	

};

$(document).ready(function(){
	//call getString to get the answer word
	var answer = HANGMAN.getString(HANGMAN.wordList);
	//initiate blank array to track letters guessed
	HANGMAN.calledLetters = [];

	HANGMAN.wrongGuesses = 0;
	
	var answerArr = answer.split("");
	console.log(answerArr);

	var displayArr =  answerArr.map(function() {
		return "_";
	});

	var letterInput = $('#letterInput');
	

	HANGMAN.displayBlanks(displayArr);

	

	letterInput.on('submit', function(e){
		e.preventDefault();

		//get input and capitalize
		var letter = $('input:text').val().toUpperCase();

		//verify that its a letter and not another char
		if(!/^[a-zA-Z]+$/.test(letter)){
			alert('There are only letters in this word.  Enter one.');

		//verify that it has not been called and alert if it has
		} else if(HANGMAN.calledLetters.indexOf(letter) >= 0){
			alert('Try again.  That letter has already been guessed');

		} else {
		// call alterDisplay if it hasn't been called yet
		HANGMAN.alterDisplay(letter, displayArr, answerArr);
		}
		//clear input and focus on
		$('input:text').val('');
		this.focus();
	});
});

