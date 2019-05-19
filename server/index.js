import express from 'express';
import socketIO from 'socket.io';
import GamesManager from './GamesManager.js';

const app = express();
const server = app.listen(3000, () => console.log('Listening on 3000'));
const io = socketIO(server);

const games = new GamesManager();

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('join game', ({ username, game }) => {
        let error;
        let url;
        try {
            url = games.join(username, game);
        } catch (e) {
            error = e;
        }
        socket.emit('join game', { error, url });
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
