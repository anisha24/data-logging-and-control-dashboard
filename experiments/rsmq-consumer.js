//const redisSMQ = require("rsmq");
const redis = require('redis')
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

// const rsmq = new redisSMQ({
//     host: "127.0.0.1",
//     port: 6379,
//     ns: "rsmq"
// });

var subscriber = redis.createClient();
subscriber.subscribe('newData');

var redisClient = redis.createClient();
redisClient.on('connect', function () {
    console.log('Redis server connected...');
})

mongoose.connect('mongodb://localhost:27017/edge-net-dashboard', { useNewUrlParser: true, useCreateIndex: true }).then(function () {
    console.log("Connected to MongoDB");
})

var SchemaTypes = mongoose.Schema.Types;

var nodeDataSchema = new mongoose.Schema({
    nodeID:  Number,
    TEMPERATURE:  SchemaTypes.Double,
    HUMIDITY:  SchemaTypes.Double,
    PRESSURE:  SchemaTypes.Double,
    time:  Date
});

var nodeData = mongoose.model('nodeData', nodeDataSchema);


subscriber.on('message', function (channel, message) {

    console.log("Message recieved!")
    if (redisClient.llen('inNodeData') > 0) {

        redisClient.rpop('inNodeData', function (err, reply) {
            if (err) {
                console.log(err);
            } else {
                var collData = reply.toString().split(',');
                var collName = collData[0];
                var nodeData = mongoose.model('nodeData', collName, nodeDataSchema)
                var colNum = parseInt(collData[0])
                var insTemp = parseFloat(collData[1])
                var insHum = parseFloat(collData[2])
                var insPres = parseFloat(collData[3])
                var insDate = Date(collData[4])

                var ins = nodeData({
                    nodeID: colNum,
                    TEMPERATURE: insTemp,
                    HUMIDITY: insHum,
                    PRESSURE: insPres,
                    time: insDate
                }).save(function (err) {
                    if (err) {
                        throw err
                    }
                })
            }
        })
    }
})

//rsmq.on('message', { qname: 'sample-queue' }, function (err, resp) { 
// rsmq.receiveMessage({ qname: 'sample-queue' }, function (err, resp) {

//     if (resp.id) {
//         console.log("Message recieved!")
//         if (redisClient.llen('inNodeData') > 0) {

//             redisClient.rpop('inNodeData', function (err, reply) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('Success!!! Message is: ', reply);
//                 }
//             })
//         }

//         rsmq.deleteMessage({
//             qname: 'sample-queue',
//             id: resp.id,
//         }, (err, resp) => {
//           if (resp === 1) console.log('Message deleted.');
//         });


//     } else {
//         console.log('No message recieved!');
//     }



// });