import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            party: null,
            url: null,
            error: null
        };
    }

    componentDidMount() {
        this.socket = io('localhost:3000');
        this.socket.on('join party', ({ error, url }) => {
            if (error) {
                return this.setState({ error, username: null, party: null });
            }

            this.setState({ url });
        });
    }

    joinParty = ({ username, party }) => {
        this.socket.emit('join party', { username, party });
        this.setState({ username, party });
    };

    handleSubmit = e => {
        e.preventDefault();
        // Convert formData to object
        const { username, party } = Object.fromEntries(new FormData(e.target));
        this.joinParty({ username, party });
    };

    render() {
        const { username, party, url, error } = this.state;
        return (
            <div className="App">
                {username && <p>Username: {username}</p>}
                {party && <p>Party: {party}</p>}
                {url && <p>Url: {url}</p>}
                {error && <p>Error: {error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" />
                    <label htmlFor="party">Party</label>
                    <input id="party" name="party" type="text" />
                    <button type="submit">Join or create a party</button>
                </form>
            </div>
        );
    }
}

export default App;
