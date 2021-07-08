import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import TokePage from './components/pages/TokenPage';
import TokenContext from './components/context/TokenContext';
import SearchPage from './components/pages/SearchPage';

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <Router>
        <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/" component={TokePage} />
        </Switch>
      </Router>
    </TokenContext.Provider>
  );
}
