var cats = require("cat-ascii-faces");

exports.init = function(arr, user, text, callback){
	var out = cats() + " -meow";
	callback(out, true);
};
