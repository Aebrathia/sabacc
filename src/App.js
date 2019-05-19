import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            game: null,
            url: null,
            error: null
        };
    }

    componentDidMount() {
        this.socket = io('localhost:3000');
        this.socket.on('join game', ({ error, url }) => {
            if (error) {
                return this.setState({ error, username: null, game: null });
            }

            this.setState({ url });
        });
    }

    joinGame = ({ username, game }) => {
        this.socket.emit('join game', { username, game });
        this.setState({ username, game });
    };

    handleSubmit = e => {
        e.preventDefault();
        // Convert formData to object
        const { username, game } = Object.fromEntries(new FormData(e.target));
        this.joinGame({ username, game });
    };

    render() {
        const { username, game, url, error } = this.state;
        return (
            <div className="App">
                {username && <p>Username: {username}</p>}
                {game && <p>Game: {game}</p>}
                {url && <p>Url: {url}</p>}
                {error && <p>Error: {error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" />
                    <label htmlFor="game">Game</label>
                    <input id="game" name="game" type="text" />
                    <button type="submit">Join or create a game</button>
                </form>
            </div>
        );
    }
}

export default App;
