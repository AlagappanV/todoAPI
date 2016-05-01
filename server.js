var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var PORT = process.env.PORT || 3000;
var dt = new Date().toString();
var todoNextID = 1;
var todo = [];
var middlewr = require('./middleware.js');

app.use(bodyParser.json());

//app.use(middlewr.logger);

app.get('/', middlewr.logger, function(req, res) {
	res.send('To do API');
});

app.post('/', function (req, res) {
	var body = req.body;
	body = _.pick(req.body, 'status', 'description');
	console.log('body ' , body);
	if(!_.isBoolean(body.status) || !_.isString(body.description)) {
	console.log('In IF');
	return res.status(400).send();
	}
	body.id = todoNextID;
	todoNextID++;	
	todo.push(body);
	res.json(body);

});

app.get('/todo/:id', function(req, res) {
	var input = parseInt(req.params.id, 10);
	var matchedvalue = _.findWhere(todo, {id: input});
	console.log('Match' , matchedvalue);

	if (typeof matchedvalue === 'undefined'){	
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
	console.log('Server Listening on PORT' , PORT);
});