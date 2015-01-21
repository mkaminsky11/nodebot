//interacts with the Wolframe Alpha API
var nick = require("./nick.js").nick;
var SteamStore = require('steam-store');

var store = new SteamStore({
  country:  'US',
  language: 'en'
});


exports.init = function(arr, user, text, callback){
	try{
		
		
		var ask = text.replace(nick + " steam","").replace(nick + ", steam", "").trim();
		
	}
	catch(e){
		callback("There was an error", false);
		console.log(e);
	}
};
