import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { useStore } from './store/StoreContext';
import GamePage from './components/GamePage';
import useEvents from './events';

const App = () => {
    const { error } = useStore();
    useEvents();

    return (
        <div className="App">
            {error && <p>Error: {error}</p>}
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/game/:game" component={GamePage} />
            </Switch>
        </div>
    );
};

export default App;
