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

	//a function that creates blank spaces on the screen to place correct letter guesses
	

}

$(document).ready(function(){
	//call getString to get the answer word
	var answer = HANGMAN.getString(HANGMAN.wordList);
	console.log(answer);

	var answerArr = answer.split("");
	console.log(answerArr);

	var blanksArr =  answerArr.map(function() {
		return "_";
	});
	console.log(blanksArr);

	var practice = function(spaces) {
		var list = $('#blanks');
		spaces.forEach(function(i){
			list.append('<li>' + i + '<li>');
		});
		console.log(list);
	};

	practice(blanksArr);

});

