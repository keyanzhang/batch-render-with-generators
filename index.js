var path = require('path');
var express = require('express');

var app = express();

var PORT = JSON.parse(process.env.PORT || 5000);

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:' + PORT);
});
