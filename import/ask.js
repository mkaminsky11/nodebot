//interacts with the Wolframe Alpha API
//that's pretty cool, right?

var nick = require("./nick.js").nick;
var request = require("request");
var id = "L8Q62E-X5HRY9VWVT"; //API key / user id
var parseString = require('xml2js').parseString;


exports.init = function(arr, user, text, callback){
	try{
		
		var ask = encodeURIComponent(text.replace(nick + " ask","").replace(nick + ", ask", "").trim());
				
		request("http://api.wolframalpha.com/v2/query?input=" + ask + "&appid=" + id, function (error, response, body) {
			try{
			  if (!error && response.statusCode == 200) {
				  
				var xml = body;
				
				parseString(xml, function (err, result) { //this takes a while, but whatever
					try{
				    	console.log(result.queryresult.pod[1].subpod);
				    	var title = result.queryresult.pod[1].$.title;
				    	var res = (result.queryresult.pod[1].subpod[0].plaintext + "").split("\n").join("...");
				    	
				    	var out = title + ":" + res;
				    	callback(out, false);
				    }
				    catch(e){
					 	callback("There was an error", false); 
					 	console.log(e);  
					}
				});
					 
			  }
			  else{
				  callback("There was an error", false);
				  console.log(e);
				}
			} catch(e){
				callback("There was an error", false);
				console.log(e);
			}	
		});
	}
	catch(e){
		callback("There was an error", false); //can't have too many error messages, can you?
		console.log(e);
	}
};


//might use this to replaced xml2js to just split the XML
var multiSplit = function(str,delimeters){
    var result = [str];
    if (typeof(delimeters) == 'string')
        delimeters = [delimeters];
    while(delimeters.length>0){
        for(var i = 0;i<result.length;i++){
            var tempSplit = result[i].split(delimeters[0]);
            result = result.slice(0,i).concat(tempSplit).concat(result.slice(i+1));
        }
        delimeters.shift();
    }
    return result;
}