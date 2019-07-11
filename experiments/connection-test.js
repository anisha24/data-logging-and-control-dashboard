var express = require('express')
var app = express();
var mongoose = require('mongoose')
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/nodeDataDB');

var Schema = mongoose.Schema;

var nodeDataSchema = new mongoose.Schema({
    TEMPERATURE: String,
    HUMIDITY: String,
    PRESSURE: String,
    TIME: Date
}, { collection: '1' });

var nodeData = mongoose.model('nodeData', nodeDataSchema);

app.get('/get', function (req, res, next) {
    nodeData.find({}, function (err, log) {
        if (err) {
            console.log("Error")
        }
        else {
            for (i = 0; i < log.length; i++) {
                res.send(JSON.stringify(log[i]))
            }
        }
    })
})

var server = app.listen(9999, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
