import express from 'express';
import socketIO from 'socket.io';
import GamesManager from './GamesManager.js';

const app = express();
const server = app.listen(3000, () => console.log('Listening on 3000'));
const io = socketIO(server);

const games = new GamesManager();

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('join game', ({ username, game: gameName }) => {
        console.log(username, 'has joined the game', gameName);
        const game = games.join(gameName, username);
        const players = games.get(game).getAllPlayers();
        socket.join(game);
        socket.broadcast.to(game).emit('add player', { username });
        socket.emit('join game', { error: null, slug: game, players });
    });
    socket.on('recover game', ({ slug: game, username }) => {
        const data = games.get(game).recover(username);
        socket.emit('recover game', data);
    });
    socket.on('player is ready', ({ slug: game, username }) => {
        games
            .get(game)
            .getPlayer(username)
            .setReady();
        socket.broadcast.to(game).emit('opponent is ready', { username });
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
