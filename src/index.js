import React from 'react';
import ReactDOM from 'react-dom';
import State from './context/State';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <State>
      <Router>
        <App />
      </Router>
    </State>
  </React.StrictMode>,
  document.getElementById('root')
);
