var nick = require("./nick.js").nick;
var request = require("request");

exports.init = function(arr, user, text, callback){
	try{
		var input_lang = arr[2].toLowerCase();
		var output_lang = arr[3].toLowerCase();
		var to_translate = arr.slice(4).join(" ");
		
		request('http://api.mymemory.translated.net/get?q='+to_translate+'!&langpair='+input_lang+'|'+output_lang, function (error, response, body) {
			try{
			  if (!error && response.statusCode == 200) {
				callback(JSON.parse(body).responseData.translatedText.split("/").join(""), false);		 
			  }
			  else{
				  callback("There was an error with the translation", false);
				}
			} catch(e){
				callback("There was an error with the translation", false);
			}	
		});
	}
	catch(e){
		callback("There was an error with the translation", false);
	}
};