var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var customers = require('./routes/customers');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, './public')));

//routes
app.use('/customers', customers);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(app.get('port'), function() {
 console.log('server is ready on port: ' + app.get('port'));
});
