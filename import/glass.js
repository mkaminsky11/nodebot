exports.init = function(arr, user, text, callback){
	var out = require("./ascii.js").glass;
	callback(out, true);
};