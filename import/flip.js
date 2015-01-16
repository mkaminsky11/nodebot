var nick = require("./nick.js").nick;
var upsidedown = require("upsidedown");

exports.init = function(arr, user, text, callback){
	var out = text.replace(nick + " flip","").replace(nick + ", flip", "").trim();
	out = "(╯°□°）╯ " + upsidedown(out);
	if(out[0] !== "/"){
		callback(out, false);
	}
	else{
		callback(out.split("/").join(""), false);
	}
};