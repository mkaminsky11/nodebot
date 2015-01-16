var array = ["Learn node.js. Seriously. Learn it", "Read dilbert", "Go to commitstrip.com","Learn to ski", "Have some clam chowder","Don't ask a bot for recommendations","Write an ssh bot","get a job, bum","I don't know. Make more money, I guess?","Move to Maine","Dual-boot your computer","don't eat that slice of pizza. Drop it. Seriously, go to the gym instead."];

exports.init = function(arr, user, text, callback){
	var out = pick(array);
	callback(out, false);
};

function pick(myArray){
	var rand = myArray[Math.floor(Math.random() * myArray.length)];
	return rand;
}