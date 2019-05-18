import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      party: '',
    }
  }

  componentDidMount() {
    this.socket = io('localhost:3000');
    this.socket.on('ID', (id) => console.log(id))
    this.socket.on('join party', ({ username, party }) => {
      this.setState({ username, party });
    });
  }

  joinParty = (data) => {
    this.socket.emit('join party', data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Convert formData to object
    const data = Object.fromEntries(new FormData(e.target));
    this.joinParty(data);
  }

  render() {
    const { username, party } = this.state;
    return (
      <div className="App">
        {username && (<p>Username: {username}</p>)}
        {party && (<p>Party: {party}</p>)}
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
