var HANGMAN = {
	//Setup varibles
	calledLetters: [],

	wrongGuesses: 0,

	answer: "",

	answerArr: [],

	displayArr: [],

	//Below are twon jQuery variables used to alter text in the referenced elements
	guessed: $('.guesses').find('p').eq(1),

	response: $('.guesses').find('p').eq(0),

	//searchWord gets a random word from an API, stores it and calls displayBlanks to show the spaces on the screen
	searchWord: function(){
		$.ajax({
			method   : 'GET',
			url		 : 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=10000&maxCorpusCount=400000&minDictionaryCount=20&maxDictionaryCount=-1&minLength=5&maxLength=16&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
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
		wordBox.find('span').remove();
		wordArray.forEach(function(index){
			wordBox.append('<span class=letter>' + index +'</span>');
		});
	},

	checkLetter: function(letter) {
		var attachFuncs = [this.attachHead, this.attachMidSection, this.attachLeftArm, this.attachRightArm, this.attachLeftLeg, this.attachRightLeg];

		//track the instances of the letter in answer
		var howMany = 0;
		//display instances in place of blanks and increment howMany
		for(i = 0; i < this.answerArr.length; i++){
			if(letter === this.answerArr[i]){
				$('.word').find('span').eq(i).text(letter);
				howMany += 1;
				this.displayArr[i] = letter;
			};
		};
		//this increments wrongGuesses if there are none of the letter in the answer
		if(howMany === 0){
			this.wrongGuesses += 1;
			attachFuncs[(this.wrongGuesses - 1)].call();
		};
		//tests if the player has won and calls onWin() if so
		if(this.displayArr.toString() === this.answerArr.toString()){
			return this.onWin();
		}
		//tests if the player has lost and calls onLose() if so
		else if(this.wrongGuesses === 6){
			return this.onLose();
		}
		//if there is not a win or lose, the display is altered and the game continues
		else {
			return this.alterDisplay(letter, howMany);
		};
	},

	//alterDisplay creates user feedback and tracks calledLetters
	alterDisplay: function(insert, num) {
		
		//feedback to user for right or wrong guesses
		if (num === 0){
			this.response.text('There are no ' + insert + 's.  Try again.');
			}

		else if(num === 1) {
			this.response.text('Well done!  There is one ' + insert + '.');
		}

		else {
			this.response.text('Way to go!  There are ' + num + ' ' + insert + 's!');
		}
		//add letter to list of guessed letters
		this.guessed.append(' ' + insert + ',');
		//add letter to array
		this.calledLetters.push(insert);
		
	},

	takeDownDeadMan: function(){
		$('.hanging-man #head').hide();
		$('.upper-body').children().hide();
		$('.lower-body').children().hide();
	},

	attachHead: function(){
		$('#head').show();
	},

	attachMidSection: function(){
		$('#mid-section').show();
	},

	attachLeftArm:  function(){
		$('#left-arm').show();
	},

	attachRightArm: function(){
		$('#right-arm').show();
	},

	attachLeftLeg: function(){
		$('#waist').show();
		$('#left-leg').show();
	},

	attachRightLeg: function(){
		$('#right-leg').show();
	},

	//behavior for a win
	onWin: function(){
		$('.modal-header h1').text('YOU WIN!!!');
		$('.modal-body h2').text('Great Job!');
		$('#game-over').addClass('winner').modal('show');
		return this.reset();
	},

	//behavior for a loss
	onLose: function(){
		$('.modal-header h1').text('You Lost :(');
		$('.modal-body h2').text('The Answer is ' + this.answer);
		$('#game-over').addClass('loser').modal('show');
		return this.reset();
	},

	//to reset/start the game
	reset: function(){
		this.takeDownDeadMan();
		this.calledLetters = [];
		this.wrongGuesses = 0;
		this.response.text('You have no guesses yet.');
		this.guessed.text('Letters guessed so far:');
		this.displayArr = [];
		this.searchWord();
	}

};

$(document).ready(function(){
	HANGMAN.takeDownDeadMan();
	HANGMAN.reset();

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
		// call checkLetter if it hasn't been called yet
		HANGMAN.checkLetter(letter);
		}
		//clear input and focus on
		$('input:text').val('');
		this.focus();
	});


});

