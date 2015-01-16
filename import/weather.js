var nick = require("./nick.js").nick;
var weather = require('weather-js');

exports.init = function(arr, user, text, callback){
	var out = text.replace(nick + " weather","").replace(nick + ", weather", "").trim();
	
	weather.find({search: out, degreeType: 'F'}, function(err, result) {
		try{
			callback("It is "+ result[0].current.temperature +" degrees F in " + out, false);
		}catch(e){
			callback("That's not a place!", false);	
		}
	});
};