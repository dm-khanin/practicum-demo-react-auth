import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Login.css';

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setMessage('');

    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      return;
    }

    onLogin(loginData)
      .catch(err => setMessage(err.message || 'Что-то пошло не так'));
  };

  return (
    <div onSubmit={handleSubmit} className="login">
      <Logo title={'CryptoDucks'}/>
      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию.
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
      </p>
      <p className="login__error">
        {message}
      </p>
      <form className="login__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input id="username" required name="username" type="text" autoComplete="login" value={loginData.username}
               onChange={handleChange}/>
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" required name="password" type="password" autoComplete="current-password"
               value={loginData.password} onChange={handleChange}/>
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;
