import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import myContext from './myContext';
import { setLocalStorage } from '../helpers/localStorage';

function MyProvider({ children }) {
  const route = useHistory();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (event) => {
    setLogin((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginButton = useCallback(() => {
    setLocalStorage({
      email: login.email,
    });
    route.push('/meals');
  }, [login.email, route]);

  const context = useMemo(
    () => ({
      route,
      login,
      handleLogin,
      handleLoginButton,
    }),
    [login, route, handleLoginButton],
  );

  return (
    <myContext.Provider value={ context }>
      {children}
    </myContext.Provider>
  );
}
export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
