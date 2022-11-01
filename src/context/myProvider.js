import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import myContext from './myContext';
import { setLocalStorage } from '../helpers/localStorage';
import { getCat, getCategories, getMealsFirst, getFirstTwo,
  drinkFilters, mealFilters } from '../helpers/Api';

function MyProvider({ children }) {
  const route = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [initialMeal, setInitialMeal] = useState([]);
  const [initialDrink, setInitialDrink] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [getDrinkCat, setGetDrinkCat] = useState([]);
  const [buttonFilter, setButtonFilter] = useState([]);
  const [clickedFilter, setClickedFilter] = useState('');
  const [inProgressRecipes, setInProgressRecipes] = useState({
    drinks: {
      // 15997: '',
      // 17203: '', // criei as chaves fixas para testar a lógica de renderizar o botão. se existir uma key compatível com o id da receita nesse obj, deve-se renderizar o botão de continue recipe e não start recipe
      // 17222: '',
    },
    meals: {
      // 52802: '',
      // 52804: '',
      // 52977: '',
      // 53026: '',
    },
  });
  // começo da logica da 34 - LocalStorage FavoriteRecipes

  // const [favorite, setFavorite] = useState([]);
  // const [favoriteList, setFavoriteList] = useState([]);

  // const handleFavoriteClick = ({ target }) => {
  //   target.checked ? addFavoriteRecipe(favorite) : removeFavoriteRecipe(favorite);
  //   const updateFavorite = getLocalStorage('favoriteRecipes');
  //   setFavoriteList(JSON.parse(updateFavorite));
  // };

  const handleClickCat = useMemo(() => async (event) => {
    if (clickedFilter === event) {
      setButtonFilter(initialDrink);
    } else {
      setClickedFilter(event);
      const drinkFilter = await drinkFilters(event);
      setButtonFilter(drinkFilter.drinks.splice(0, +'12'));
    }
  }, [clickedFilter, initialDrink]);

  const handleClickCategory = useMemo(() => async (event) => {
    if (clickedFilter === event) {
      setButtonFilter(initialMeal);
    } else {
      setClickedFilter(event);
      const get = await mealFilters(event);
      setButtonFilter(get.meals.splice(0, +'12'));
    }
  }, [clickedFilter, initialMeal]);

  useEffect(() => {
    const request = async () => {
      if (window.location.pathname.includes('/meals')) {
        const get = await getMealsFirst();
        const getCatego = await getCategories();
        setInitialMeal(get.meals.slice(0, +'12'));
        setGetCategory(getCatego.meals.slice(0, +'5'));
      } else if (window.location.pathname.includes('/drinks')) {
        const get = await getFirstTwo();
        const getC = await getCat();
        setInitialDrink(get.drinks.slice(0, +'12'));
        setGetDrinkCat(getC.drinks.slice(0, +'5'));
      }
    };
    if (radio === 'letter' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    // selectEndPoint(); // remover radio e search
    request();
  }, [radio, inputSearch.length]);

  // const handleSearch = ({ target: { value } }) => {
  //   setSearch(value);
  // };

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
    setLocalStorage('user', {
      email: login.email,
    });
    route.push('/meals');
  }, [login.email, route]);

  const context = useMemo(
    () => ({
      route,
      login,
      radio,
      recipes,
      initialMeal,
      initialDrink,
      getDrinkCat,
      getCategory,
      buttonFilter,
      clickedFilter,
      inputSearch,
      setInputSearch,
      setButtonFilter,
      handleLogin,
      handleLoginButton,
      handleRadio,
      handleClickCategory,
      handleClickCat,
      setRecipes,
      inProgressRecipes,
      setInProgressRecipes,
    }),
    [
      login,
      route,
      getCategory,
      getDrinkCat,
      inputSearch,
      radio,
      recipes,
      initialMeal,
      initialDrink,
      buttonFilter,
      clickedFilter,
      handleClickCategory,
      handleClickCat,
      handleLoginButton,
      inProgressRecipes,
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
