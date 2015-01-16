exports.init = function(arr, user, text, callback){
	var out = "these are valid commands: source, lazer, owner, sir, btc, bots, translate <input language (ISO code)> <output language (ISO)> <text>, news [best|home|newest], decorate <text>, 5:00, flip <something>, weather <place>, math <expression>, destroy <name>, about, thank, help, insult <name>, recommend, sing. There are also some 'hidden' commands.";
	callback(out, false);
};