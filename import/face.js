var cool = require("cool-ascii-faces");

exports.init = function(arr, user, text, callback){
	var out = cool();
	callback(out, true);
};
