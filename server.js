var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var dt = new Date().toString();

var todo = [{
	id: 1,
	description: 'Doctor Appointment',
	Completed: false
},
{
	id: 2,
	description: 'Pay Bills',
	Completed: false
},
{
	id: 3,
	description: 'Laundry tasks',
	Completed: true
},
{
	id: 4,
	description: 'Home Work',
	Completed: true
}
];

var middlewr = require('./middleware.js');

//app.use(middlewr.logger);

app.get('/', middlewr.logger, function(req, res) {
	res.send('To do API');
});

app.get('/todo/:id', function(req, res) {
	var input = parseInt(req.params.id, 10);
	var matchedvalue ;
	//var input = parseInt(inp, 10);
	console.log('Values for Params '+ input);
	todo.forEach(function (todo) {
		if (input === todo.id) {
			matchedvalue = todo;
		}
	});
	//console.log('Match' , typeof matchedvalue);
	if (typeof matchedvalue === 'undefined'){
			//console.log('Match' , typeof matchedvalue);
	
			res.status(404).send();
		} else {
			res.json(matchedvalue);
		}
});

app.get('/todo', function(req, res) {
	//res.json('TO DO, ', todo);
	res.json(todo);
});

//console.log(__dirname);
app.listen(PORT, function() {
	console.log('Express Listening on PORT' , PORT);
});