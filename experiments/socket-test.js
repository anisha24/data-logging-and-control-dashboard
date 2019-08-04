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
    nodeID: Number,
    TEMPERATURE: SchemaTypes.Double,
    HUMIDITY: SchemaTypes.Double,
    PRESSURE: SchemaTypes.Double,
    time: Date
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

var socketRooms = [];

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    socket.emit('initConnect', `${socket.id}`);
    socket.on('storeID', function (data) {
        sepData = data.toString().split(';');
        console.log(sepData, "the sent data")
        console.log(sepData[0])
        if (sepData[0] !== null) {
            socket.join(sepData[0]);
            sepFlag = false;
            for (i = 0; i < socketRooms.length; i++) {
                if (socketRooms[i] == sepData[0]) {
                    console.log("Data present!!!")
                    sepFlag = true;
                    break;
                }
            }
            if (sepFlag == false) {
                console.log("data not present!!!")
                socketRooms.push(sepData[0])
            }
            sepFlag = false;
        }
        console.log(socketRooms);
        console.log(socket.adapter.rooms)
    })

    //callData();
    sendData(socket);

    socket.on('unameID', function (data) {
        //unam = data1.uname;
        console.log(data)
    })

    socket.on('disconnectReq', function (data) {
        socDataReqDis = data.toString().split(';');
        delIndex = socketRooms.indexOf(socDataReqDis[0]);
        console.log(delIndex);
        console.log("Disconnected connection for user \'" + socDataReqDis[0] + "\' with connection ID " + socDataReqDis[1])
        var socketRoomsDup = []
        for (var i = 0; i < socketRooms.length; i++) {
            if (i == delIndex) {
                continue;
            } else {
                socketRoomsDup.push(socketRooms[i])
            }
        }
        socketRooms = socketRoomsDup
        socketRoomsDup = []
        socket.on('disconnect', function (data) {
            console.log("Disconnected!!!")
            console.log(socketRooms)
        })
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

    // while(sendList.length !== 0) {
    //     sendList.pop();
    // }

    var nodeData = mongoose.model('nodeData', '1', nodeDataSchema);
    sendList.push(1)
    nodeData.findOne({}).sort({ time: -1 }).exec(function (err, docs) {
        //console.log(JSON.stringify(docs));
        sendList.push(docs)
    });
    var nodeData = mongoose.model('nodeData', '2', nodeDataSchema);
    nodeData.findOne({}).sort({ time: -1 }).exec(function (err, docs) {
        sendList.push(docs)
    });
    //console.log(sendList);

    socket.emit('data1', sendList);
    while (sendList.length !== 0) {
        sendList.pop();
    }
    setTimeout(() => {
        sendData(socket);
    }, 5000);


}