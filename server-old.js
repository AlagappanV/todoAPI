var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var PORT = process.env.PORT || 3000;
var dt = new Date().toString();
var todoNextID = 1;
var todo = [];

app.use(bodyParser.json());


var middlewr = require('./middleware.js');

//app.use(middlewr.logger);

app.get('/', middlewr.logger, function(req, res) {
	res.send('To do API');
});

app.post('/', function (req, res) {
	var body = req.body;
	console.log('In todo');
	body.id = todoNextID;
	todoNextID++;
	
	//console.log('body ', body);
	todo.push(body);
	console.log('todo Length ', todo.length);

	res.json(body);
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
	res.json(todo);
});

//console.log(__dirname);
app.listen(PORT, function() {
	console.log('Express Listening on PORT' , PORT);
});