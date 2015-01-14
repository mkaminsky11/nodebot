/*
NODEBOT: a bot for ssh-chat	
*/

//LOAD ALL NECESSARY MODULES
var nick = "nodebot";
var comma = nick + ",";
var sshKey = "../../../../../root/.ssh/id_rsa";
var chatServer = "chat.shazow.net";
var Connection = require("ssh2");
var conn = new Connection();
var math = require('mathjs');
var weather = require('./weather.js');
var upsidedown = require('upsidedown');
var hn = require("./news.js");
var request = require('request');
var global = require('./const.js');
var translator = require('./translate.js');
var time = require('./time.js');
var btc = require('./btc.js');
var fs = require('fs');
var ascii = require('./ascii.js');

var trivia = false;
var trivia_index = 0;

//SOME RANDOM VARIABLES
var misc = global.misc;
var trivia_q = global.trivia;
var destroy = global.destroy;
var insult_1 = global.i1;
var insult_2 = global.i2;
var insult_3 = global.i3;
var sing = global.sing;

var recommend = global.rec;
var ready = false;

conn.on("ready", function() {
	conn.shell(function(err, stream) {
		if (err) throw err;

		stream.on("end", function() {
				process.exit(0);
		});
		
		setTimeout(function() {
            		ready = true;
        	}, 1000 * 5);

		stream.on("data", function(data) {
			data = data + "";
			data = data.substring(0, data.length - 2);
			var splitdata = data.split("\u001b[");
			var newdata = [];
			splitdata.forEach(function(v, k) {
				if (k === 0) {
					newdata.push(v);
				} else {
					var newsection = v.split("m");
					newsection.shift();
					newdata.push(newsection.join("m"));
				}
			});
			data = newdata.join("");

			if (data != "[" + nick && data != "\u001b[D\u001b[D\u001b[D\u001b[D\u001b[D\u001b[D\u001b" && data !== "") {
				//ok, good to go...
				
				data = data.trim();
				console.log(data);
				
				if(data[0] === "*"){
					var joined = data;
					joined = joined.replace("*","").trim().split(" ");
					var joined_person = joined[0];
					try{
						if(joined[1].replace(".", "") === "joined"){
							console.log("joined");
							write("/whois " + joined_person, "", stream);
						}
					}catch(e){};
					
				}
				else if(data[0] === "-" && data[1] === ">"){
					var whois = data;
					whois = whois.replace("->","").trim();
					
					var d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
					whois = whois + " @ " + d + "\n";
					try{
						if(whois.trim() !== "Welcome to chat.shazow.net, enter /help for more."){
							fs.appendFile('log.txt', whois, function (err) {
							
							});
						}
					}catch(e){}
				}
				
				if(data[0] !== "*" && data[0] !== "-"){
					
					var text = "";
					var user = "";
					var prefix = "";
					var out = "";
					
					//not join/left or something else
					if(data.indexOf("[PM from ") !== -1){
						
						//private message
						var temp = data.split("]");
						user = temp[0].trim().replace("[PM from ","");
						text = temp.slice(1).join("]");
						
						text = "nodebot " + text.trim();
						prefix = "/msg " + user + " ";
					}
					
					else if(data.indexOf(":") !== -1){
						//regular message
						var temp = data.split(":");
						user = temp[0].trim();
						text = temp.slice(1).join(":");
					}
					
					text = text.trim();
					user = user.trim();
					
					var arr = text.split(" ");
					if((arr[0] === nick || arr[0] === (nick + ",")) && arr.length >= 2){
						//a nodebot command!
						var command = arr[1];
						
						if(command === "hello"){
							write("hello, " + user, prefix, stream);
						}
						else if(command === "lazer"){
							multi(ascii.lazer, stream);
						}
						else if(command === "log"){
							write("logging is at https://codeyourcloud.com/nodebot/log.txt", prefix, stream);
						}
						else if(command === "sir"){
							multi(ascii.sir, stream);
						}
						else if(command === "glass"){
							multi(ascii.glass, stream);
						}
						else if(command === "owner"){
							write("nodebot is made by node, whose ssh key is: de:d2:64:29:e3:3c:00:27:44:11:2c:94:10:52:2e:e9 via SSH-2.0-OpenSSH_5.9p1Debian-5ubuntu1.4", prefix, stream);
						}
						else if(command === "$"){
							write(ascii.money, prefix, stream);
						}
						else if(command === "cat"){
							write("ʕ•ᴥ•ʔ - meow", prefix, stream);
						}
						else if(command === "about"){
							write("I am nodebot, a ssh bot designed to amuse my creator, 'node'. https://github.com/mkaminsky11/nodebot", prefix, stream);
						}
						else if(command === "bots"){
							write("Currently active bots are nodebot(nodebot help), ambybot (ambybot help), rpi-chat-bot(rpi-chat-bot: help), and zsh(zsh, help), elbot (elbot help), catbot...", prefix, stream);
						}
						else if(command === "thank"){
							write("Please thank shazow for making this chat, Sam for making the zsh bot, and node for making me", prefix, stream);
						}
						else if(command === "help"){
							write("these are valid commands: lazer, owner, sir, btc, bots, translate <input language (ISO code)> <output language (ISO)> <text>, news [best|home|newest], decorate <text>, 5:00, flip <something>, weather <place>, math <expression>, destroy <name>, about, thank, help, insult <name>, recommend, sing. There are also some 'hidden' commands.", prefix, stream);
						}
						else if(command === "recommend"){
							write(pick(recommend), prefix, stream);
						}
						else if(command === "sing"){
							write(pick(sing), prefix, stream);
						}
						else if(command === "trivia"){
							//trivia = true;
							//write("Question: " + trivia_q[trivia_index].q, prefix, stream);
							write("Trivia is currently down for maintenance", prefix, stream); //TODO: fix trivia
						}
						else if(command === "insult" && arr.length === 3){
							prefix = "";
							var person = text;
							person = person.replace("nodebot insult","").replace("nodebot, insult", "");
							out = person + " " + pick(insult_1) + " " + pick(insult_2) + " " + pick(insult_3);
							out = out.trim();
							write(out, prefix, stream);
						}
						else if(text === "nodebot make me a sandwich" || text === "nodebot, make me a sandwich"){
							write(user + ", make your own damn sandwich!", prefix, stream);
						}
						else if(text === "nodebot sudo make me a sandwich" || text === "nodebot, sudo make me a sandwich"){
							write("ok.", prefix, stream);
						}
						else if(command === "echo"){
							var echo = text;
							echo = echo.replace("nodebot echo","").replace("nodebot, echo", "");
							
							out = echo.trim();
							if(out[0] !== "/"){
								write(out, prefix, stream);
							}
						}
						else if(command === "decorate"){
							var echo = text;
							echo = echo.replace("nodebot decorate","").replace("nodebot, decorate", "");
							
							out = pick(misc).replace("_",echo.trim());
							if(out[0] !== "/"){
								write(out, prefix, stream);
							}
						}
						else if(command === "math"){
							var m = text;
							m = m.replace("nodebot math","").replace("nodebot, math", "");
							try{
								out = math.eval(m);
								write(out, prefix, stream);
							}catch(e){
							}
						}
						else if(command === "destroy" && arr.length === 3){
							var person = arr[2];
							out = person + " was destroyed by " + pick(destroy);
							write(out, prefix, stream);
							
						}
						else if(command === "weather" && arr.length >= 3 && ready === true){
							weather.info(text, function(out){
								write(out, prefix, stream);
							});
						}
						else if(command === "flip" && arr.length >= 3){
							var w = text;
							w  = text.replace("nodebot flip","").replace("nodebot, flip", "").trim();
							
							out = "(╯°□°）╯ " + upsidedown(w);
							write(out, prefix, stream);
						}
						else if(command === "5:00"){
							time.five(function(out){
								write(out, prefix, stream);
							});
						}
						else if(command === "news"){
							hn.news(arr, function(out){
								write(out, prefix, stream);
							});
						}
						else if(command === "translate" && arr.length >= 5){
							translator.translate(arr, function(out){
								write(out, prefix, stream);
							});
						}
						else if(command === "btc"){
							btc.usd(function(out){
								write(out, prefix, stream);
							});
						}
						else{
							out = "I'm sorry " + user + ". I'm afraid I can't do that.";
							write(out, prefix, stream);
						}
					}
					
					/*if(text.toLowerCase().trim() === trivia_q[trivia_index].a.toLowerCase().trim() && trivia){
						//trivia answer
						out = user + " got it right! The answer is " + trivia_q[trivia_index].a + "!";
						write(out, prefix, steam);
						trivia_index++;
						if(trivia_index === trivia_q.length){
							trivia_index = 0;
							trivia = false;
						}
					}*/
					
				}
			}
		});
	});
});

conn.connect({
	host: chatServer,
	port: 22,
	username: nick,
	privateKey: fs.readFileSync(sshKey),
	passphrase: fs.readFileSync("../../pass.txt",{encoding: 'utf-8'}),
	readyTimeout: 9999
});

function pick(myArray){
	var rand = myArray[Math.floor(Math.random() * myArray.length)];
	return rand;
}

function write(out, prefix, stream){
	if(out !== ""){
		if(ready){
			console.log(prefix + out);
			stream.write(prefix + out + "\r");
		}					
	}
}

function multi(array, stream){
	var max = array.length - 1;
	var index = 0;
	stream.write(array[index] + "\r");
	index++;
	var interval = setInterval(function(){
		if(index <= max && ready){
			stream.write(array[index] + "\r");
			index++;
		}
		else{
			clearInterval(interval);
		}
	}, 1100);
}
