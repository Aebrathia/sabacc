import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './StoreContext';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from './reducers/index';
import * as actions from './actions/index';

ReactDOM.render(
    <StoreProvider actions={actions} reducers={reducers}>
        <Router>
            <App />
        </Router>
    </StoreProvider>,
    document.getElementById('root')
);
