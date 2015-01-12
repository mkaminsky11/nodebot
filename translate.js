var request = require("request");

exports.translate = function(arr, callback){
	var input_lang = arr[2].toLowerCase();
	var output_lang = arr[3].toLowerCase();
	var to_translate = arr.slice(4).join(" ");
	
	request('http://api.mymemory.translated.net/get?q='+to_translate+'!&langpair='+input_lang+'|'+output_lang, function (error, response, body) {
		try{
		  if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).responseData.translatedText);		 
		  }
		  else{
			  callback("There was an error with the translation");
			}
		} catch(e){
			callback("There was an error with the translation");
		}	
	});
};