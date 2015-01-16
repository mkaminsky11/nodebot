var nick = require("./nick.js").nick;
var request = require("request");

exports.init = function(arr, user, text, callback){
	try{
		var out = text.replace(nick + " movie","").replace(nick + ", movie", "").trim();
		out = out.toLowerCase().split(" ").join("+");
		
		request('http://www.omdbapi.com/?t=' + out, function (error, response, body) {
			try{
			  if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				if(!!json.Title){
					//title is there
					var title = json.Title;
					var year = json.Year;
					var plot = json.Plot;
					var rate = json.imdbRating;
					
					var to_print = title + " was released in " + year + ", and recieved a rating of " + rate + " on IMDB. Plot: " + plot;
					callback(to_print, false);
				}
				else{
					
				}
			  }
			  else{
				  callback("Movie not found", false);
				}
			} catch(e){
				callback("Movie not found", false);
			}	
		});
	}
	catch(e){
		callback("Movie not found", false);
	}
};
