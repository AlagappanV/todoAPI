//use module.exports
var dt = new Date().toString();

var middleware =  {
	requireAuthentication: function (req, res, next) {
		console.log('PRIVATE');
		next();
	},
	logger: function (req, res, next) {
		console.log(req.method+ '  '+req.originalUrl+' ', dt);
		next();
	}
};
module.exports = middleware;
