var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
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
// Add API 
app.post('/', function(req, res) {
	var body = req.body;
	// to remove unwanted fields if added through post
	body = _.pick(req.body, 'status', 'description');
	
	db.todo.create(body).then(function(todo) {
				if(todo) {
					res.json(todo.toJSON());
				} else {
					res.status(400).json('ERROR');
				}
				
			});

	// //console.log('body ' , body);
	// if (!_.isBoolean(body.status) || !_.isString(body.description)) {
	// 	console.log('In IF');
	// 	return res.status(400).send();
	// }
	// body.id = todoNextID;
	// todoNextID++;
	// todo.push(body);
	// res.json(body);

});

app.get('/todo/:id', function(req, res) {
	var input = parseInt(req.params.id, 10);
	var matchedvalue = _.findWhere(todo, {
		id: input
	});
	console.log('Match', matchedvalue);

	if (typeof matchedvalue === 'undefined') {
		res.status(404).send();
	} else {
		res.json(matchedvalue);
	}
});
// Delete API
app.delete('/todo/:id', function(req, res) {
	var input = parseInt(req.params.id, 10);
	var matchedvalue = _.findWhere(todo, {
		id: input
	});
	if (!matchedvalue) {
		res.status(404).json({
			"error": "No to do ID "
		});
	} else {
		// to Delete
		todo = _.without(todo, matchedvalue);
		res.json(matchedvalue);
	}
});

// Update API
app.put('/todo/:id', function(req, res) {
	var body = req.body;
	var input = parseInt(req.params.id, 10);
	var validAttribute = {};
	var matchedvalue = _.findWhere(todo, {
		id: input
	});
	// to remove unwanted fields if added through post
	body = _.pick(req.body, 'status', 'description');

	if (!matchedvalue) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('status') && _.isBoolean(body.status)) {
		validAttribute.status = body.status;
	} else if (body.hasOwnProperty('status')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description)) {
		validAttribute.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}
	// UPDATING
	matchedvalue = _.extend(matchedvalue, validAttribute);
	res.json(matchedvalue);
	console.log('Updated Value', matchedvalue);

});

// Query Params
app.get('/todo', function(req, res) {

	console.log('IN GET QUERY');
	var queryParams = req.query;

	var filteredTodos = todo;

	if (queryParams.hasOwnProperty('status') && queryParams.status === 'true') {
		filteredTodos = _.where(filteredTodos, {
			status: true
		})
	} else if (queryParams.hasOwnProperty('status') && queryParams.status === 'false') {
		filteredTodos = _.where(filteredTodos, {
			status: false
		})
	}
	console.log('TO DO VALUE', filteredTodos);

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		//	console.log('IN IF Q P') ;
		filteredTodos = _.filter(filteredTodos, function(num) {
			//	console.log('in Query', num);
			return num.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}
	res.json(filteredTodos);

});

db.sequelize.sync().then(function() {
app.listen(PORT, function() {
	console.log('Server Listening on PORT', PORT);
});
});