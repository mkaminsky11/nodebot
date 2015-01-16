var nick = require("./nick.js").nick;

exports.init = function(arr, user, text, callback){
	var out = text.replace(nick + " echo","").replace(nick + ", echo", "");
	out = out.trim();
	if(out[0] !== "/"){
		callback(out, false);
	}
	else{
		callback(out.split("/").join(""), false);
	}
};