var request = require("request");

exports.init = function(arr, user, text, callback){
	request("http://coinabul.com/api.php", function(error, response, body){
		if(!error && response.statusCode === 200){
			var btc = JSON.parse(body).BTC.USD;
			callback("Value in USD: $" + btc, false);
		}
	});
};