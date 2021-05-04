import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Register.css';

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...data } = registerData;
    if (confirmPassword !== data.password) {
      return setMessage('Пароли должны совпадать');
    }

    onRegister(data)
      .catch(err => setMessage(err.message || 'Что-то пошло не так'));
  };

  return (
    <div className="register">
      <Logo title={'CryptoDucks'}/>
      <p className="register__welcome">
        Пожалуйста, зарегистрируйтесь.
      </p>
      <p className="register__error">
        {message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input id="username" name="username" type="text" autoComplete="username" value={registerData.username} required
               onChange={handleChange}/>
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" autoComplete="email" value={registerData.email} required
               onChange={handleChange}/>
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" value={registerData.password}
               required
               onChange={handleChange}/>
        <label htmlFor="confirmPassword">
          Подтвердите пароль:
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
               value={registerData.confirmPassword} onChange={handleChange}/>
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/login" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
