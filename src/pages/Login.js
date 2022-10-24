import React, { useContext } from 'react';
import '../App.css';
import rockGlass from '../images/rockGlass.svg';
import MyContext from '../context/myContext';

function Login() {
  const { login, handleLogin, handleLoginButton } = useContext(MyContext);
  const MAGIC_NUM = 7;
  const re = /\S+@\S+\.\S+/;

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          value={ login.email }
          onChange={ handleLogin }
          type="email"
          name="email"
          id="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          onChange={ handleLogin }
          type="password"
          name="password"
          data-testid="password-input"
          id="password"
          value={ login.password }
        />
      </label>
      <button
        disabled={ !login.email.match(re) || login.password.length < MAGIC_NUM }
        onClick={ handleLoginButton }
        type="button"
        data-testid="login-submit-btn"
      >
        Login

      </button>
    </div>
  );
}

export default Login;
