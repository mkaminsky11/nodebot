var times = [
	{
		time: -6,
		cities: ["The middle of the freaking Pacific Ocean"]
	},{
		time: -5,
		cities: ["The middle of the freaking Pacific Ocean"]
	},{
		time: -4,
		cities: ["Ancorage","Fairbanks"]
	},{
		time: -3,
		cities: ["Whitehorse","San Fransisco","Los Angeles"]
	},{
		time: -2,
		cities: ["Denver","Salt Lake City","Calgary"]
	},{
		time: -1,
		cities: ["Houston","Dallas","Winnipeg"]
	},{
		time: 0,
		cities: ["Boston","Atlanta","New York"]
	},{
		time: 1,
		cities: ["Sucre","La Paz","Halifax"]
	},{
		time: 2,
		cities: ["Nuuk","Buenos Aires"]
	},{
		time: 3,
		cities: ["Brasilia","Rio de Janeiro"]
	},{
		time: 4,
		cities: ["The middle of the Altantic Ocean"]
	},{
		time: 5,
		cities: ["Lisbon","London","Greenwhich"]
	},{
		time: 6,
		cities: ["Berlin","Oslo","Zurich"]
	},{
		time: 7,
		cities: ["Kiev","Helsinki","Cairo"]
	},{
		time: 8,
		cities: ["Moscow","Baghdad","Mecca"]
	},{
		time: 9,
		cities: ["Dubia"]
	},{
		time: 10,
		cities: ["Siberia"]
	},{
		time: 11,
		cities: ["Some formerly Soviet central Asian nations"]
	},{
		time: 12,
		cities: ["Bankok","Vietnam"]
	},{
		time: 13,
		cities: ["Perth","Beijing","Manila"]
	},{
		time: 14,
		cities: ["Tokyo","Yatusk"]
	},{
		time: 15,
		cities: ["Eastern Russia"]
	},{
		time: 16,
		cities: ["Sydney","Melbourne"]
	}
];

exports.five = function(callback){
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
				callback("It's 5 o'clock somewhere. Right now, it is quitting time in: " + pick(times[i].cities)); 
			}
		}
	}	
};

function pick(myArray){
	var rand = myArray[Math.floor(Math.random() * myArray.length)];
	return rand;
}
