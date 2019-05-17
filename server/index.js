import express from 'express';
import socketIO from 'socket.io';

const app = express();
const server = app.listen(3000, () => console.log('Listening on 3000'));
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.emit('ID', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
