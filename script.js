var HANGMAN = {
	//create a list of words to pick from
	//wordList: ["human", "photograph", "laptop", "magazine", "bookshelf","longhorn","change","market", "infinite","emperor","folly","inherent","lamp","table","backpack"],
	
	calledLetters: [],

	wrongGuesses: 0,

	answer: "",

	answerArr: [],

	displayArr: [],

	searchWord: function(){
		$.ajax({
			method   : 'GET',
			url		 : 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=40000&minDictionaryCount=20&maxDictionaryCount=-1&minLength=5&maxLength=16&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
			success  : function(response){
					
					
					HANGMAN.answer = response.word.toUpperCase();
					
					HANGMAN.answerArr = HANGMAN.answer.split("");

					console.log(HANGMAN.answerArr);
					HANGMAN.displayArr = HANGMAN.answerArr.map(function() {
						return "_";
					});
					
					HANGMAN.displayBlanks(HANGMAN.displayArr);
			}
		})
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

		if(this.win(display, answer)){
			alert('you win');
		}
		//update displayArr ***THIS WORKS, BUT SEEMS PROBLEMATIC CODE-WISE
		this.displayArr = display;
		
		var guessed = $('.guesses').find('p').eq(1);

		var response = $('.guesses').find('p').eq(0);

		//feedback to user for right or wrong guesses
		if (howMany === 0){
			this.wrongGuesses += 1;
			if(this.lose(this.wrongGuesses)){
				alert('you lose');
			}else {
			response.text('There are no ' + insert + 's.  Try again.');
			}
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
	},

	//behavior for a win
	onWin: function(){

	},

	//behavior for a loss
	onLose: function(){

	}

};

$(document).ready(function(){

	HANGMAN.searchWord();
	
	//initiate blank array to track letters guessed
	HANGMAN.calledLetters = [];

	HANGMAN.wrongGuesses = 0;

	var letterInput = $('#letterInput');
	
	//focus on input field
	letterInput.find('input').focus();

	//create eventlistener for letter submit
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
		HANGMAN.alterDisplay(letter, HANGMAN.displayArr, HANGMAN.answerArr);
		}
		//clear input and focus on
		$('input:text').val('');
		this.focus();
	});


});

