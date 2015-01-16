var nick = require("./nick.js").nick;
var math = require("mathjs");

exports.init = function(arr, user, text, callback){
	var out = text.replace(nick + " math","").replace(nick + ", math", "");
	try{
		callback(math.eval(out) + "", false);
	}catch(e){
		callback("There was a math error",false);
	}
};