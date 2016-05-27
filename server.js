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

});

app.get('/todo/:id', function(req, res) {
	var input = parseInt(req.params.id, 10);

	db.todo.findById(input).then (function (todo) {

		if(!!todo) {
			console.log('to do found', todo.toJSON());
			res.json(todo);
		} else {
			console.log('No to do');
			res.status(500).send();
		}

	});

});

// Delete API
app.delete('/todo/:id', function(req, res) {
	var input = parseInt(req.params.id, 10);
	var matchedvalue = _.findWhere(todo, {
		id: input
	});
db.todo.destroy({where: {
      Id: input
    }
  }).then (function (deletedRows) {

if (deletedRows === 0) {
		res.status(404).json({
			"error": "No to do ID "
		});
	} else {
		res.status(204).send();
		// to Delete
		//todo = _.without(todo, matchedvalue);
	}
}, function () {
		res.status(500).send();


  });

});

// Update API
app.put('/todo/:id', function(req, res) {
	var body = req.body;
	var input = parseInt(req.params.id, 10);
	var validAttribute = {};
	// to remove unwanted fields if added through post
	body = _.pick(req.body, 'status', 'description');
	if (body.hasOwnProperty('status')) {
		validAttribute.status = body.status;
	} 
	if (body.hasOwnProperty('description')) {
		validAttribute.description = body.description;
	} 
	db.todo.findById(input).then( function(todo){
		if (todo) {
			todo.update(validAttribute);
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	}). then (function(todo) {
		//res.json(todo.toJSON());
	}, function (e){
		res.status(400).json(e);
	});

});

// Query Params
app.get('/todo', function(req, res) {

	var queryParams = req.query;

	var where = {};
console.log('Query' , queryParams);

	if (queryParams.hasOwnProperty('status') && queryParams.status === 'true') {
		where.status = true ;
	} else if (queryParams.hasOwnProperty('status') && queryParams.status === 'false') {
		where.status = false ;
}
if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
where.description = {$like: '%' + queryParams.q +'%'};

}
console.log('WHERE' , where);
	db.todo.findAll({where: where}) . then (function(todo) {
		res.json(todo);
	}, function(e)  {
		res.status(500).send();
	});


 });

db.sequelize.sync().then(function() {
app.listen(PORT, function() {
	console.log('Server Listening on PORT', PORT);
});
});