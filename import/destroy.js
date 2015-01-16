var nick = require("./nick.js").nick;

var array = ["a large wooden fish","a massive laser","Linux users","node","a huge robot piloted by shazow","a quantum-leaping katana","a divide by zero error", "stepping on a Lego brick","a falling coconut", "an avalanche","bad sushi","one of Google's internet balloons,"];

exports.init = function(arr, user, text, callback){
	var person = text.replace(nick + " destroy","").replace(nick + ", destroy", "").trim();
	var out = person + " was destroyed by " + pick(array);
	out = out.trim();
	if(out[0] !== "/"){
		callback(out, true);
	}
	else{
		callback(out.split("/").join(""), true);
	}
};

function pick(myArray){
	var rand = myArray[Math.floor(Math.random() * myArray.length)];
	return rand;
}