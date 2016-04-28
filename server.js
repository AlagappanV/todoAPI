var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var dt = new Date().toString();

var middlewr = require('./middleware.js');

app.use(middlewr.logger);

app.get('/', function(req, res) {
	res.send('To do API');
});
//console.log(__dirname);
app.listen(PORT, function() {
	console.log('Express Listening on PORT' , PORT);
});