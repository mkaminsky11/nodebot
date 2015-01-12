/*
NODEBOT: a bot for ssh-chat	
*/

//LOAD ALL NECESSARY MODULES
var nick = "nodebot";
var comma = nick + ",";
var sshKey = "../../../../root/.ssh/id_rsa";
var chatServer = "chat.shazow.net";
var Connection = require("ssh2");
var conn = new Connection();
var math = require('mathjs');
var weather = require('weather-js');
var upsidedown = require('upsidedown');
var hn = require("hn.js");
var request = require('request');
var global = require('./const.js');
var fs = require('fs');

var trivia = false;
var trivia_index = 0;

//SOME RANDOM VARIABLES
var misc = global.misc;
var times = global.times;
var trivia_q = global.trivia;
var destroy = global.destroy;
var insult_1 = ["is a", "lives in a", "smells like a", "looks like a", "talks like a", "reminds me of a", "types like a"];
var insult_2 = ["smelly","rotten","stupid","ignorant","old","lazy","dim-witted","crazy","paranoid", "immature", "inbred"];
var insult_3 = ["baboon","apple","house","troll","monkey","java programmer","politician","pizza box", "child","dog","cat","watermelon"];
var sing = ["Sweet Caroline...", "There is...a house...in New Orleans....", "The Devil went down to Georgia, he was looking for a soul to steal...","Oh, say can you see, by the dawn's early light...","Gold on the ceiling..."];
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
						else if(command === "cat"){
							write("ʕ•ᴥ•ʔ - meow", prefix, stream);
						}
						else if(command === "about"){
							write("I am nodebot, a ssh bot designed to amuse my creator, 'node'. https://github.com/mkaminsky11/nodebot", prefix, stream);
						}
						else if(command === "bots"){
							write("Currently active bots are nodebot(nodebot help), rpi-chat-bot(rpi-chat-bot: help), and zsh(zsh, help), botnet, elbot (elbot help), ambybot...", prefix, stream);
						}
						else if(command === "thank"){
							write("Please thank shazow for making this chat, Sam for making the zsh bot, and node for making me", prefix, stream);
						}
						else if(command === "help"){
							write("these are valid commands: bots, translate <input language (ISO code)> <output language (ISO)> <text>, news [best|home|newest], decorate <text>, 5:00, flip <something>, weather <place>, math <expression>, destroy <name>, about, thank, help, insult <name>, recommend, sing. There are also some 'hidden' commands.", prefix, stream);
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
							if(out !== "/exit"){
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
							var w = text;
							w  = text.replace("nodebot weather","").replace("nodebot, weather", "").trim();
							
							weather.find({search: w, degreeType: 'F'}, function(err, result) {
								try{
									out = "It is "+ result[0].current.temperature +" degrees F in "+w;
									write(out, prefix, stream);
								}catch(e){
									out = "That's not a place!";
									write(out, prefix, stream);		
								}
							});
						}
						else if(command === "flip" && arr.length >= 3){
							var w = text;
							w  = text.replace("nodebot flip","").replace("nodebot, flip", "").trim();
							
							out = "(╯°□°）╯ " + upsidedown(w);
							write(out, prefix, stream);
						}
						else if(command === "5:00"){
							var date = new Date();
							var current_hour = date.getHours() + 1;
							var done = false;
							//the goal = 5 pm, so 18 (for some reason)
							
							for(var i = 0; i < times.length; i++){
								if(done === false){
									var temp_hour = current_hour + times[i].time;
									if(temp_hour > 24){
										temp_hour = temp_hour - 24;
									}
									if(temp_hour <= 0){
										temp_hour = temp_hour + 24;
									}
									
									if(temp_hour === 18){
										done = true;
										out = "It's 5 o'clock somewhere. Right now, it is quitting time in: " + pick(times[i].cities); 
										write(out, prefix, stream);
									}
								}
							}
						}
						else if(command === "news"){
							var page = "home";
							if(arr.length === 3){
								var temp_page = arr[2];
								if(temp_page === "best" || temp_page === "newest"){
									page = temp_page;
								}
							}
							
							if(page === "home"){
								hn.home(function(err, items) {
									
								    out = "";
								    var temp = [];
								    for(var i = 0; i < items.length/3; i++){
									    temp.push(items[i].title);
								    }
								    out = "From HN: " + temp.join("...");
								    write(out, prefix, stream);								    
								});
							}
							else if(page === "best"){
								hn.best(function(err, items) {
									
								    out = "";
								    var temp = [];
								    for(var i = 0; i < items.length/3; i++){
									    temp.push(items[i].title);
								    }
								    out = "From HN: " + temp.join("...");
								    write(out, prefix, stream);		
								    
								});
							}else{
								hn.newest(function(err, items) {
									
								    out = "";
								    var temp = [];
								    for(var i = 0; i < items.length/3; i++){
									    temp.push(items[i].title);
								    }
								    out = "From HN: " + temp.join("...");
								    write(out, prefix, stream);		
								    
								});
							}
						}
						else if(command === "translate" && arr.length >= 5){
							var input_lang = arr[2].toLowerCase();
							var output_lang = arr[3].toLowerCase();
							var to_translate = arr.slice(4).join(" ");
							
							request('http://api.mymemory.translated.net/get?q='+to_translate+'!&langpair='+input_lang+'|'+output_lang, function (error, response, body) {
								try{
								  if (!error && response.statusCode == 200) {
									out = JSON.parse(body).responseData.translatedText;		
									write(out, prefix, stream);	    
								  }
								  else{
									  write("There was an error with the translation", prefix, stream);
									}
								} catch(e){
									write("There was an error with the translation", prefix, stream);
								}	
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
	passphrase: fs.readFileSync("../pass.txt",{encoding: 'utf-8'}),
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
