'use strict'
//console.log("Hello world!");
/*var sayHi = function(name){
	console.log('Hi'+name);
}
sayHi('Prakash');
function callHi(func,name){
	func(name);
}
callHi(sayHi,'Prakash');*/
/*var myArr = [1,2,3,45,65];
//console.log(myArr);
myArr.forEach(function(elem,index){
	console.log(index,'  ',elem);
});
var p1 = {
	name:'Prakash',
	title:'Mr.',
	city:'Chennai',
	get_name: function(){
		return this.title+this.name;
	}
};*/

//console.log(p1.get_name());
function Person(name,title,city){
	this.name = name;
	this.title = title;
	this.city = city;
	this.get_name = function(){
		return this.title+this.name;
	}
}
//----------To use test.js we have to export this function Person------------//
exports.Person = Person
var p1 = new Person('John','Mr.','Chennai');
var p2 = new Person('Prakash','Mr.','Chennai');
/*console.log(p1.get_name());
console.log(p2.get_name());
*/

//Read file module is fs
var fs = require('fs');
//Synchronize or blocking IO (here we have to handle error using try,catch blockmanually)
var data = fs.readFileSync('./tmp.txt','utf8');
//console.log(data);
//Asyncronize or NOn Blocking IO(here no need to handle error;that err parameter handle the error)
//Once file reading done,then the callback function will execute
fs.readFile('./tmp.txt','utf8',function(err,data){
//console.log(data);
}
);
//console.log('COming next line');
//API call in nodejs
//instaedof data we are using event emitter object..here res is an event emitter object..whenever it's getting data from api it's going to trigger the data event and gives the chunk of the data in the call back
//The end event is used to know the API response is done
var http = require('http');
var url = "http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json";
http.get(url,function(res){
var body = '';

res.on('data',function(chunk){
body+=chunk;
});
res.on('end',function(){
body = body.replace(/\\/g,'');
//convert JSON response to Javascript object
var quote = JSON.parse(body);
console.log(quote);
});
});

//most of the functions in node js non blocking

