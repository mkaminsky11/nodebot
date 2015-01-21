//NODEBOT: a bot for ssh-chat
//===========================
//to see it in action, use "ssh user@chat.shazow.net", then say something like "nodebot hello"
//created by michael kaminsky (https://github.com/mkaminsky11) aka "node"
//---------------------------

//LOAD ALL NECESSARY MODULES
var nick = "nodebot";
var comma = nick + ",";
var sshKey = "../../../../../root/.ssh/id_rsa"; //location of ssh key
var chatServer = "chat.shazow.net"; //where to connect
var Connection = require("ssh2");
var conn = new Connection();
var fs = require('fs');
var monitor = require("./import/monitor.js"); //this logs things

var to_import = JSON.parse(fs.readFileSync("command.json", "utf8")).data;
var commands = [];

//array of objects with all of the commands
for(var i = 0; i < to_import.length; i++){
	var to_push = {
		name: to_import[i].name,
		obj: require(to_import[i].path)	
	};
	commands.push(to_push);
}

var ready = false;

conn.on("ready", function() {
	conn.shell(function(err, stream) {
		
		if (err) throw err;

		stream.on("end", function() {
			process.exit(0);
		});
		
		//prevents it from reading chat history
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
				
				if(ready){
					monitor.check(data, function(cmd){
						write(cmd, "", stream);
					});
				}

				
				//if it's a regular chat message, and not "* user joined", etc
				if(data[0] !== "*" && data[0] !== "-"){
					var text = "";
					var user = "";
					var prefix = "";
					var out = "";
					
					if(data.indexOf("[PM from ") !== -1){
						//[PM from user] blahblahblah
						//private message
						var temp = data.split("]");
						user = temp[0].trim().replace("[PM from ","");
						text = temp.slice(1).join("]");
						
						text = nick + " " + text.trim();
						prefix = "/msg " + user + " ";
					}
					
					else if(data.indexOf(":") !== -1){
						//regular message
						var temp = data.split(":");
						user = temp[0].trim();
						text = temp.slice(1).join(":");
						//user: blahblahblah
					}
					
					text = text.trim();
					user = user.trim();
					
					var arr = text.split(" ");
					if((arr[0] === nick || arr[0] === (nick + ",")) && arr.length >= 2){
						
						//a nodebot command!
						var command = arr[1];
						
						var found = false;
						for(var i = 0; i < commands.length; i++){
							if(commands[i].name === command && ready){ //if ready...
								found = true;
								commands[i].obj.init(arr, user, text, function(out_out, clear){
									if(out_out.output !== null){
										if(clear === true){
											prefix = "";
										}
										write(out_out, prefix, stream);
									}
								});	
							}
						}
						
						if(found === false){
							write("I'm sorry " + user + ". I'm afraid I can't do that.", prefix, stream);	
						}
					}
					
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

function write(out, prefix, stream){
	if(out !== ""){
		if(ready){
			if(out.indexOf("\n") === -1){
				stream.write(prefix + out + "\r");
			}
			else{
				multi(out, stream); //if more than one line, automatically shunt it to multi()
			}
		}					
	}
}

//prints messages that are multiple lines
//interval added to avoid rate-limiting (about 1 message/second)
function multi(to_write, stream){
	var array = to_write.split("\n");
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
