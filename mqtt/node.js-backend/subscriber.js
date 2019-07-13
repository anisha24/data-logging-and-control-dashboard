var mqtt = require('mqtt')
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var options =
{
    clientId: "mqttjs01",
    username: "zwfxzaip",
    password: "8rQqi99icKka",
    port: 10174,
    clean: true
};

var client = mqtt.connect("mqtt://m24.cloudmqtt.com", options)

mongoose.connect('mongodb://localhost:27017/valuedb', { useNewUrlParser: true })

var SchemaTypes = mongoose.Schema.Types;

var nodeDataSchema = new mongoose.Schema({
    nodeID: Number,
    TEMPERATURE: SchemaTypes.Double,
    HUMIDITY: SchemaTypes.Double,
    PRESSURE: SchemaTypes.Double,
    time: Date
});

var nodeData = mongoose.model('nodeData', nodeDataSchema);

var queue = [];

client.on("connect", function () {
    console.log("connected")
});

client.subscribe("nodeData");

client.on('message', function (topic, message, packet) {

    var collData = message.toString().split(',');
    var collName = collData[0];
    var nodeData = mongoose.model('nodeData', collName, nodeDataSchema)
    var colNum = parseInt(collData[0])
    var insTemp = parseFloat(collData[1])
    var insHum = parseFloat(collData[2])
    var insPres = parseFloat(collData[3])
    var insDate = new Date(collData[4])

    var ins = nodeData({
        nodeID: colNum,
        TEMPERATURE: insTemp,
        HUMIDITY: insHum,
        PRESSURE: insPres,
        time: insDate
    }).save(function(err) {
        if(err) {
            throw err
        } else {
            if(colNum === 1) console.log("Success 1!!!!")
            else console.log("Success 2!!!!")
        }
    })
})


