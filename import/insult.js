var nick = require("./nick.js").nick;

var i1 = ["is a", "lives in a", "smells like a", "looks like a", "talks like a", "reminds me of a", "types like a"];
var i2 = ["smelly","rotten","stupid","ignorant","old","lazy","dim-witted","crazy","paranoid", "immature", "inbred"];
var i3 = ["baboon","apple","house","troll","monkey","java programmer","politician","pizza box", "child","dog","cat","watermelon"];

exports.init = function(arr, user, text, callback){
	var person = text.replace(nick + " insult","").replace(nick + ", insult", "");
	var out = person + " " + pick(i1) + " " + pick(i2) + " " + pick(i3);
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