//const redisSMQ = require('rsmq');
var mqtt = require('mqtt');
const redis = require('redis')

var redisClient = redis.createClient();
redisClient.on('connect', function () {
    console.log('Redis server connected...');
})

var publisher = redis.createClient();



var options =
{
    //clientId: "mqttjs01",
    port: 1883,
    clean: true
};

var client = mqtt.connect("mqtt://127.0.0.1", options)

// const rsmq = new redisSMQ({
//     host: "127.0.0.1",
//     port: 6379,
//     ns: "rsmq"
// });


// rsmq.createQueue({ qname: 'sample-queue' }, (err, resp) => {
//     if (resp === 1) console.log('queue created');
// });

client.on("connect", function () {
    console.log("Connected to MQTT Broker")
});

client.subscribe("nodeData");

client.on('message', function (topic, message, packet) {

    // rsmq.sendMessage({
    //     qname: 'sample-queue',
    //     message: 'Data Added',
    // }, function (err, resp) {
    //     if (resp) console.log('Message sent. ID:', resp);
    // });

    publisher.publish('newData', 'sent');

    redisClient.lpush('inNodeData', message, function (err, reply) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.toString())
        }
    })

    
})

