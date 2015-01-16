//flip the logs

var fs = require("fs");

var data = fs.readFileSync("log.txt","utf8").split("\n").reverse().join("\n");
fs.writeFileSync("log.txt",data);