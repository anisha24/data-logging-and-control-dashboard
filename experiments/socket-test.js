const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(cors({ origin: '*' }));
app.use(bodyParser);

const server = app.listen(3006, () => {
    console.log('Started in 3006');
});

var clientStore = {};

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    socket.emit('initConnect', `${socket.id}`);
    socket.on('storeID', function (data) {
        var ClientInfo = new Object();
        ClientInfo.clientUname = data.clientUname;
        ClientInfo.clientID = socket.id;
        clientStore.push(ClientInfo);
    })
    //callData();
    sendData(socket);

    socket.on('unameID', function(data) {
        //unam = data1.uname;
        console.log(data)
    })

    socket.on('disconnect', (socket) => {
        console.log(`connection id: ${socket.id} disconnected`);
    })

    socket.on('reconnect', (socket) => {
        console.log('reconnected');
        console.log(`with id: ${socket.id}`);
    })
    
})


var sendList = [];

// function callData() {
    
//     var nodeData = mongoose.model('nodeData','1', nodeDataSchema);
//     nodeData.findOne({}).sort({time: -1}).exec( function (err, docs) {
//         console.log(JSON.stringify(docs));
//         sendList.push(JSON.stringify(docs))
//     });
//     console.log(sendList);
// }

function sendData(socket) {

    var nodeData = mongoose.model('nodeData','1', nodeDataSchema);
    nodeData.findOne({}).sort({time: -1}).exec( function (err, docs) {
        //console.log(JSON.stringify(docs));
        sendList.push(JSON.stringify(docs))
    });
    //console.log(sendList);

    socket.emit('data1', sendList);
    sendList=[];
    setTimeout(() => {
        sendData(socket);
    }, 5000);


}