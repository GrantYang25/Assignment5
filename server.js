/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Grant
 * Email: yanggra@oregonstate.edu
 */

var path = require('path');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var ehb = require('express-handlebars');
var postInfo = require('./postData');

app.engine('handlebars', ehb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.get('/', function (req, res, next) {
  console.log("== requesting '/'");
  res.status(200).render('postPage', postInfo);
});

app.get('/posts/:n', function (req, res, next) {
  var i = req.params.n;
  console.log("== requesting '/posts/" + i + "'");

  if (i >= 0 && i <= 7) { res.status(200).render('partials/post', postData[i]); }
  else { next(); }
})

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
