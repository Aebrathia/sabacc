import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { useStore } from './store/StoreContext';
import GamePage from './components/GamePage';

const App = () => {
    const { username, game, url, error } = useStore();
    return (
        <div className="App">
            {username && <p>Username: {username}</p>}
            {game && <p>Game: {game}</p>}
            {url && <p>Url: {url}</p>}
            {error && <p>Error: {error}</p>}
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/game/:game" component={GamePage} />
            </Switch>
        </div>
    );
};

export default App;
