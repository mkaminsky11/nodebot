//just a list of some bots
//not really complete, not really useful

exports.init = function(arr, user, text, callback){
	var out = "Currently active bots are nodebot(nodebot help), ambybot (ambybot help), rpi-chat-bot(rpi-chat-bot: help), and zsh(zsh, help), elbot (elbot help), catbot...";
	callback(out, false);
};