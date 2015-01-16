var array = ["Sweet Caroline...", "There is...a house...in New Orleans....", "The Devil went down to Georgia, he was looking for a soul to steal...","Oh, say can you see, by the dawn's early light...","Gold on the ceiling..."];

exports.init = function(arr, user, text, callback){
	var out = pick(array);
	callback(out, false);
};

function pick(myArray){
	var rand = myArray[Math.floor(Math.random() * myArray.length)];
	return rand;
}