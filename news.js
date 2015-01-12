var hn = require("hn.js");

exports.news = function(arr, callback){
	var page = "home";
	var out = "";
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
		    callback(out);							    
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
		    callback(out);		
		    
		});
	}else{
		hn.newest(function(err, items) {
			
		    out = "";
		    var temp = [];
		    for(var i = 0; i < items.length/3; i++){
			    temp.push(items[i].title);
		    }
		    out = "From HN: " + temp.join("...");
		    callback(out);	
		    
		});
	}
};