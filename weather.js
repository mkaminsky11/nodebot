//let it snow, let it snow, let it snow
//weather module for nodebot
var nick = "nodebot";
var weather = require('weather-js');
exports.info = function(text, callback){
	var w = text;
	w  = text.replace(nick + " weather","").replace(nick + ", weather", "").trim();
	
	weather.find({search: w, degreeType: 'F'}, function(err, result) {
		try{
			callback("It is "+ result[0].current.temperature +" degrees F in "+w);
		}catch(e){
			callback("That's not a place!");	
		}
	});	
};
