const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

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

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    sendData(socket);
    socket.on('disconnect', (socket) => {
        console.log(`connection id: ${socket.id} disconnected`);
    })
})



function sendData(socket) {
    socket.emit('data1',"Hello");
    setTimeout(() => {
        sendData(socket);
    }, 10000);
}