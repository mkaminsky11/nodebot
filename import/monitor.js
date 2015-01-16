var fs = require('fs');

exports.check = function(data, callback){
	if(data[0] === "*"){
		var joined = data;
		joined = joined.replace("*","").trim().split(" ");
		var joined_person = joined[0];
		try{
			if(joined[1].replace(".", "") === "joined"){
				callback("/whois " + joined_person, "");
			}
		}catch(e){};
	}
	else if(data[0] === "-" && data[1] === ">"){
		var whois = data;
		whois = whois.replace("->","").trim();
		
		var d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		var store = whois;
		whois = whois + " @ " + d + "\n";
		try{
			if(store.trim() !== "Welcome to chat.shazow.net, enter /help for more."){
				console.log("logging!");
				//fs.appendFile('log.txt', whois, function (err) {});
				//to perpend
				var the_data = fs.readFileSync("log.txt"); //read existing contents into data
				var fd = fs.openSync("log.txt", 'w+');
				var buffer = new Buffer(whois);
				fs.writeSync(fd, buffer, 0, buffer.length); //write new data
				fs.writeSync(fd, the_data, 0, the_data.length); //append old data
				fs.close(fd);
			}
		}catch(e){}
	}
	
};