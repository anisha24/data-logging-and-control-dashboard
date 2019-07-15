var express = require('express');
var router = express.Router();
var app = express();

var http = require('http');
let server = http.Server(app);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
