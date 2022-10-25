import React, { useState, useMemo, useCallback, useEffect } from 'react';
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

  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('ingredient');
  const [recipes, setRecipes] = useState([]);

  const selectEndPoint = useCallback(() => {
    if (window.location.pathname.includes('meals')) {
      console.log(radio, 'if');
      switch (radio) {
      case 'ingredient':
      { return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      }
      case 'name':
      {
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      }
      case 'letter':
      {
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      }
      default:
        break;
      }
    }
    if (window.location.pathname.includes('drinks')) {
      switch (radio) {
      case 'ingredient':
      {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      }
      case 'name':
      {
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
      }
      case 'letter':
      {
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
      }
      default:
        break;
      }
    }
  }, [radio, search]);

  useEffect(() => {
    if (radio === 'letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [radio, search]);

  const API = useCallback(
    async () => {
      const response = await fetch(selectEndPoint());
      const data = await response.json();
      if (data.drinks) {
        if (data.drinks.length > Number('12')) {
          setRecipes(data.drinks.slice(0, +'12'));
        } else {
          setRecipes(data.drinks);
        }
      }
      if (data.meals) {
        if (data.meals.length > Number('12')) {
          setRecipes(data.meals.slice(0, +'12'));
        } else {
          setRecipes(data.meals);
        }
      }
    },
    [selectEndPoint],
  );

  const clickSearch = useCallback(() => {
    API();
  }, [API]);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleRadio = (event) => {
    setRadio((oldState) => ({ ...oldState, [event.target.name]: event.target.value }));
  };

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
      search,
      radio,
      recipes,
      handleLogin,
      handleLoginButton,
      handleRadio,
      handleSearch,
      clickSearch,
    }),
    [login, route, search, radio, recipes, handleLoginButton, handleRadio, clickSearch],
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
