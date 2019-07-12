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
},{collection: 'allNodeData'});

var nodeData = mongoose.model('nodeData', nodeDataSchema);

var queue = [];

client.on("connect", function () {
    console.log("connected")
});

client.subscribe("nodeData");

client.on('message', function (topic, message, packet) {

    queue.push(message.toString());

    // toInsertNID = message.toString().split(',');
    // console.log(toInsertNID[0]);

    // var tem = nodeData({ temp: parseFloat(message), time: date }).save(function (err) {
    //     if (err) throw err
    //     console.log("Temperature saved")
    // })
})


