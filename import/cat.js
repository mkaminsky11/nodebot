exports.init = function(arr, user, text, callback){
	var out = require("./ascii.js").cat;
	callback(out, true);
};