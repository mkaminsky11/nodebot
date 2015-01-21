//prints a cat face
var cats = require("cat-ascii-faces"); //a whole module just for cat faces? seriously?

exports.init = function(arr, user, text, callback){
	var out = cats() + " -meow";
	callback(out, true);
};
