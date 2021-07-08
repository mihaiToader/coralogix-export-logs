import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  const onClick = () => {
    console.log(ipcRenderer.sendSync('save-file', 'ping'));
  };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <button type="button" onClick={onClick}>
          <span role="img" aria-label="books">
            📚
          </span>
          Weee
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
