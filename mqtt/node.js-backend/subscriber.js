var mqtt = require('mqtt')
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var options =
{
    clientId : "mqttjs01",
    username : "zwfxzaip",
    password : "8rQqi99icKka",
    port : 10174,
    clean : true
};

var client = mqtt.connect("mqtt://m24.cloudmqtt.com", options)

mongoose.connect('mongodb://localhost:27017/valuedb')

var SchemaTypes = mongoose.Schema.Types;

var tempSchema = new mongoose.Schema({
  temp : SchemaTypes.Double,
  time : String
});

var humidSchema = new mongoose.Schema({
    humid : SchemaTypes.Double,
    time : String
});

var presSchema = new mongoose.Schema({
    press : SchemaTypes.Double,
    time : String
});

var tempData = mongoose.model('tempData', tempSchema);
var humidData = mongoose.model('humidData', humidSchema);
var presData = mongoose.model('presData', presSchema);

client.on("connect", function()
{	
    console.log("connected")
});

client.subscribe("python/temp");
client.subscribe("python/humid");
client.subscribe("python/press");

client.on('message', function(topic, message, packet)
{
    var date = new Date() + "";
    if(topic == "python/temp")
    {
        var tem = tempData({temp : parseFloat(message), time : date}).save(function(err)
        {
            if(err) throw err
            console.log("Temperature saved")
        })
    }
    else if(topic == "python/humid")
    {
        var hum = humidData({humid : parseFloat(message), time : date}).save(function(err)
        {
            if(err) throw err
            console.log("Humidity saved")
        })
    }
    else if(topic == "python/press")
    {
        var pre = presData({press : parseFloat(message), time : date}).save(function(err)
        {
            if(err) throw err
            console.log("Pressure saved")
        })
    }
})
