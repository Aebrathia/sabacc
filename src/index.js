import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './store/StoreContext';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers, { initialState } from './store/reducers';
import * as actions from './store/actions';

ReactDOM.render(
    <StoreProvider
        actions={actions}
        reducers={reducers}
        initialState={initialState}
    >
        <Router>
            <App />
        </Router>
    </StoreProvider>,
    document.getElementById('root')
);
