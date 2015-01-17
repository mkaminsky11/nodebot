var nick = require("./nick.js").nick;
var request = require("request");

exports.init = function(arr, user, text, callback){
	try{
		var input_lang = arr[2].toLowerCase();
		var output_lang = arr[3].toLowerCase();
		var to_translate = arr.slice(4).join(" ");
		var encoded = encodeURIComponent(to_translate);
		
		console.log('http://api.mymemory.translated.net/get?q='+encoded+'&langpair='+input_lang+'|'+output_lang);
		
		request('http://api.mymemory.translated.net/get?q='+encoded+'&langpair='+input_lang+'|'+output_lang, function (error, response, body) {
			try{
			  if (!error && response.statusCode == 200) {
				var the_text = JSON.parse(body).responseData.translatedText.split("/").join("");
				  
				callback(the_text, false);		 
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