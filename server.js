const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);

    socket.on('message', ({ message, userId }) => {
      io.to(roomId).emit('createMessage', message, userId);
    });

    // When User Disconnected
    socket.on('disconnect', (msg) => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    });
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`Running on Port: ${port}`);
});
