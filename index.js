import http from 'http';
import app from './server/app.js';
import config from './server/config/config.js';
import { ExpressPeerServer } from 'peer';
import { Server } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from any origin
  },
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set('port', config.port);
app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    console.log('Server: Join Room');

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

server.listen(config.port, () => {
  console.log(`Running on Port: ${config.port}`);
});
