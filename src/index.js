import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App texts={['you can', 'be','awesome']}/>
  </React.StrictMode>,
  document.getElementById('root')
);