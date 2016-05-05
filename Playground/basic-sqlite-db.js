var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-db.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 250]
		}
	},
	status: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync().then(function() {
			console.log('SYNCED');

	Todo.findById(1).then (function (todo) {
		if(todo){
			console.log('to do found', todo.toJSON());
		} else {
			console.log('No to do');
		}
	});
});

// 			Todo.create({
// 				description: 'Testing job 2',
// 				status: false
// 			}).then(function(todo) {
// 				return Todo.create ({
// 					description: 'Work on Monday',
// 					status: true
// 				});
// 			}).then(function() {
// 				console.log('ID:1 ', Todo.findById(1));
// 					return Todo.findById(1);
				
// 			});
// 			}).then(function (todos) {
// 	if (todos) {
// 		todos.forEach(function (todo) {
// 			console.log(todo.JSON());
// 		});
// 	} else {
// 		console.log('No todo');
// 	}
// });
