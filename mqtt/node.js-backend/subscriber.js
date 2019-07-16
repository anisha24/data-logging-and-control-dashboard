var mqtt = require('mqtt');
var mongoose = require('mongoose');
var redis = require('redis');
require('mongoose-double')(mongoose);

var redisClient = redis.createClient();
redisClient.on('connect', function () {
    console.log('Redis server connected...');
})

var options =
{
    clientId: "mqttjs01",
    username: "zwfxzaip",
    password: "8rQqi99icKka",
    port: 10174,
    clean: true
};

var client = mqtt.connect("mqtt://m24.cloudmqtt.com", options)

// mongoose.connect('mongodb://localhost:27017/edge-net-dashboard', { useNewUrlParser: true, useCreateIndex: true }).then(function () {
//     console.log("Connected to MongoDB");
// })

// var SchemaTypes = mongoose.Schema.Types;

// var nodeDataSchema = new mongoose.Schema({
//     nodeID: Number,
//     TEMPERATURE: SchemaTypes.Double,
//     HUMIDITY: SchemaTypes.Double,
//     PRESSURE: SchemaTypes.Double,
//     time: Date
// });

// var nodeData = mongoose.model('nodeData', nodeDataSchema);

client.on("connect", function () {
    console.log("Connected to CloudMQTT")
});

client.subscribe("nodeData");

client.on('message', function (topic, message, packet) {
    redisClient.lpush('inNodeData', message, function (err, reply) {
        if (err) {
            console.log(err);
        }
    })

    // var collData = message.toString().split(',');
    // var collName = collData[0];
    // var nodeData = mongoose.model('nodeData', collName, nodeDataSchema)
    // var colNum = parseInt(collData[0])
    // var insTemp = parseFloat(collData[1])
    // var insHum = parseFloat(collData[2])
    // var insPres = parseFloat(collData[3])
    // var insDate = new Date(collData[4])

    // var ins = nodeData({
    //     nodeID: colNum,
    //     TEMPERATURE: insTemp,
    //     HUMIDITY: insHum,
    //     PRESSURE: insPres,
    //     time: insDate
    // }).save(function(err) {
    //     if(err) {
    //         throw err
    //     } 
    // })
})


