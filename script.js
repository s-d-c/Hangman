var HANGMAN = {
	//create a list of words to pick from
	wordList: ["human", "photograph", "laptop", "magazine", "bookshelf","longhorn","change","market", "infinite","emperor","folly","inherent","lamp","table","backpack"],

	//a variable to keep track of the letters that have been called for a game
	calledLetters: [],

	//a function called getString to randomly selct a string from an array of strings
	getString: function(stringArr) {
		var index = Math.floor((Math.random()) * stringArr.length);
		return stringArr[index];
	},

	//a function to display the spaces hiding the letters of the answer
	displayBlanks: function(wordArray){
		var wordBox = $('.word');
		wordArray.forEach(function(index){
			wordBox.append('<span class=letter>' + index +'</span>');
		});
	}

	

};

$(document).ready(function(){
	//call getString to get the answer word
	var answer = HANGMAN.getString(HANGMAN.wordList);
	console.log(answer);
	var test = 'kjlkjlkjljkljkii';
	var answerArr = test.split("");
	console.log(answerArr);

	var blanksArr =  answerArr.map(function() {
		return "_";
	});
	console.log(blanksArr);

	HANGMAN.displayBlanks(blanksArr);

	

	
});

