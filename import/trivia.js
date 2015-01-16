var array = [{
	q: "Function to determine the length of a string in Golang",
	a: "len"
},{
	q: "Company that produces Go and Dart",
	a: "Google"
},{
	q: "Programming language produced by Mozilla",
	a: "Rust"
},{
	q: "This is written in what language?",
	a: "Node.js"
},{
	q: "Ssh-chat is written in what language?",
	a: "Go"
},{
	q: "What is the programming term for a list of items?",
	a: "Array"
},{
	q: "This is used to represent a tab in a string",
	a: "\\t"
},{
	q: "This language is named after the first computer programmer",
	a: "Ada"
},{
	q: "An alternative to Objective-C",
	a: "Swift"
},{
	q: "This signals the main method in a java file",
	a: "public static void main(String[] args)"
},{
	q: "The opposite of blocking (Node.js is this)",
	a: "asyncronous"
},{
	q: "What is most popular version of Windows?",
	a: "Windows 7"
},{
	q: "What is the most popular programming language?",
	a: "C"
}];

exports.init = function(arr, user, text, callback){
	var out = "Trivia is currently down for maintenance";
	callback(out, false);
};

function pick(myArray){
	var rand = myArray[Math.floor(Math.random() * myArray.length)];
	return rand;
}