var HANGMAN = {
	//create a list of words to pick from
	wordList: ["human", "photograph", "laptop", "magazine", "bookshelf","longhorn","change","market", "infinite","emperor","folly","inherent","lamp","table","backpack"],

	//a variable to keep track of the letters that have been called for a game
	calledLetters: [],

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
		var upper = insert.toUpperCase();
		//track the instances of the letter in answer
		var howMany = 0;
		for(i = 0; i < answer.length; i++){
			if(upper === answer[i]){
				$('.word').find('span').eq(i).text(upper);
				//change.text(upper);
				howMany += 1;
				display[i] = upper;
			};
		};
		displayArr = display;
		console.log(howMany);
		var response = $('.guesses').find('p').eq(1);
		if(howMany === 1) {
			response.text('There is 1 ' + upper + '.');
		}
		else {
			response.text('There are ' + howMany + ' ' + upper + 's.');
		}
		
	}

	

};

$(document).ready(function(){
	//call getString to get the answer word
	var answer = HANGMAN.getString(HANGMAN.wordList);
	console.log(answer);
	
	var answerArr = answer.split("");
	console.log(answerArr);

	var displayArr =  answerArr.map(function() {
		return "_";
	});
	console.log(displayArr);

	HANGMAN.displayBlanks(displayArr);

	HANGMAN.alterDisplay('e', displayArr, answerArr);

	console.log(displayArr);
	console.log(answerArr);

	

	
});

