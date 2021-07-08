import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.global.css';
import TokePage from './components/pages/TokenPage';
import SearchPage from './components/pages/SearchPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/" component={TokePage} />
      </Switch>
    </Router>
  );
}
