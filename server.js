// app dependencies
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      path = require('path'),
      morgan = require('morgan');

// app configuration
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

// route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port);

console.log('server fired up on port ' + port);

exports = module.exports = app; 
