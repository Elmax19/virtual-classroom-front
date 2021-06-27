const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser);

const server = app.listen(3000,() => {
  console.log('Started in 3000');
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
  console.log(`new connection id: ${socket.id}`);
  sendData(socket);
})

function sendData(socket){
    socket.emit('data1', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
  console.log(`data has been changed`);
  setTimeout(() => {
    sendData(socket);
  }, 2000);
}
