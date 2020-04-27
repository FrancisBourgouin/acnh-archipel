import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createClient, Provider } from 'urql';
import '../styles/App.scss';
import Archipelago from './Archipelago';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Register from './Register/Main';

const client = createClient({
  url: '/graphql',
});

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    Axios
      .post('/auth/validation')
      .then(res => setUser(res.data))
      .catch(err => setUser({}))
  }, [])

  return (
    <Provider value={client}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register {...{ user, setUser }} />
            </Route>
            <Route exact path="/login">
              <Login {...{ user, setUser }} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/archipelago">
              <Archipelago />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
