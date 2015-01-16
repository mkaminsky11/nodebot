var nick = require("./nick.js").nick;

var dec = ["(っ◔◡◔)っ ♥ _ ♥","▂▃▄▅▆▇█▓▒░_░▒▓█▇▆▅▄▃▂","˜”*°•.˜”*°• _ •°*”˜.•°*”˜","( ͡° ͜ʖ﻿ ͡°) _ ( ͡° ͜ʖ﻿ ͡°)"];

exports.init = function(arr, user, text, callback){
	var person = text.replace(nick + " decorate","").replace(nick + ", decorate", "").trim();
	var out = pick(dec).replace("_", person);
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