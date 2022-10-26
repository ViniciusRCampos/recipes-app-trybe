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
  const [radio, setRadio] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [initialMeal, setInitialMeal] = useState([]);
  const [initialDrink, setInitialDrink] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [getDrinkCat, setGetDrinkCat] = useState([]);
  const [buttonFilter, setButtonFilter] = useState([]);
  const [clickedFilter, setClickedFilter] = useState('');

  const selectEndPoint = useCallback(() => {
    if (window.location.pathname.includes('meals')) {
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

  const mealFilters = async (param) => {
    const initial = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`);
    const response = await initial.json();
    console.log('meals', response);
    setButtonFilter(response.meals.splice(0, +'12'));
  };

  const handleClickCat = useMemo(() => (event) => {
    console.log('>>>>>', clickedFilter, 'oi');
    if (clickedFilter === event) {
      console.log('entrei no clicked');
      setClickedFilter('');
      setButtonFilter(initialDrink);
    } else {
      setClickedFilter(event);
      const drinkFilters = async () => { // aqui, verificar a API
        const initial2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${event}`);
        const response = await initial2.json();
        setButtonFilter(response.drinks.splice(0, +'12'));
      };
      drinkFilters();
    }
  }, [clickedFilter, initialDrink]);

  const handleClickCategory = useMemo(() => (event) => {
    mealFilters(event);
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes('/meals')) {
      const getCategories = async () => {
        const initial = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const response = await initial.json();
        setGetCategory(response.meals.slice(0, +'5'));
      };
      getCategories();
    } else if (window.location.pathname.includes('/drinks')) {
      const getCat = async () => {
        const initial = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const response = await initial.json();
        setGetDrinkCat(response.drinks.slice(0, +'5'));
      };
      getCat();
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes('/meals')) {
      const getMealsFirst = async () => {
        const initial = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const response = await initial.json();
        setInitialMeal(response.meals.slice(0, +'12'));
      };
      getMealsFirst();
    } else if (window.location.pathname.includes('/drinks')) {
      const getFirstTwo = async () => {
        const initial = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const response = await initial.json();
        console.log('drinks', response);
        setInitialDrink(response.drinks.slice(0, +'12'));
      };
      getFirstTwo();
    }
  }, []);

  const API = useCallback(
    async () => {
      try {
        const response = await fetch(selectEndPoint());
        const data = await response.json();
        console.log(data);
        if (Object.values(data)[0] !== null) {
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
        } else {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      } catch (error) {
        console.log(error);
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
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

  const handleRadio = ({ target: { value } }) => {
    setRadio(value);
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
      initialMeal,
      initialDrink,
      getDrinkCat,
      getCategory,
      buttonFilter,
      clickedFilter,
      setButtonFilter,
      handleLogin,
      handleLoginButton,
      handleRadio,
      handleSearch,
      clickSearch,
      handleClickCategory,
      handleClickCat,
    }),
    [
      login,
      route,
      getCategory,
      getDrinkCat,
      search,
      radio,
      recipes,
      initialMeal,
      initialDrink,
      buttonFilter,
      clickedFilter,
      handleClickCategory,
      handleClickCat,
      handleLoginButton,
      clickSearch,
    ],
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
