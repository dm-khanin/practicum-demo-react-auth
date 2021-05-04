import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    duckAuth
      .getContent(jwt)
      .then(({ username, email }) => {
        setUserInfo({ username, email });
        setIsLoggedIn(true);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/ducks');
    }
  }, [isLoggedIn]);

  const onLogin = (data) => {
    return duckAuth
      .authorize(data)
      .then(({ jwt, user: { username, email } }) => {
        setUserInfo({ username, email });
        setIsLoggedIn(true);
        localStorage.setItem('jwt', jwt);
      });
  };

  const onRegister = (data) => {
    return duckAuth
      .register(data)
      .then(() => {
        history.push('/login');
      });
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/login');
  };

  return (
    <Switch>
      <ProtectedRoute
        path="/ducks"
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        component={Ducks}
      />
      <ProtectedRoute
        path="/my-profile"
        isLoggedIn={isLoggedIn}
        userData={userInfo}
        onLogout={onLogout}
        component={MyProfile}
      />
      <Route path="/login">
        <div className="loginContainer">
          <Login onLogin={onLogin}/>
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register onRegister={onRegister}/>
        </div>
      </Route>
      <Route>
        {isLoggedIn ? <Redirect to="/ducks"/> : <Redirect to="/login"/>}
      </Route>
    </Switch>
  );
}

export default App;
