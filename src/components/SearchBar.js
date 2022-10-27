import React, { useContext, useCallback } from 'react';
import MyContext from '../context/myContext';

export default function SearchBar() {
  const { handleRadio, setInputSearch, inputSearch, radio,
    setRecipes } = useContext(MyContext);
  const selectEndPoint = useCallback(() => {
    if (window.location.pathname.includes('meals')) {
      switch (radio) {
      case 'ingredient':
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      case 'name':
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      case 'letter':
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      default:
        break;
      }
    }
    if (window.location.pathname.includes('drinks')) {
      switch (radio) {
      case 'ingredient':
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      case 'name':
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      case 'letter':
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      default:
        break;
      }
    }
  }, [radio, inputSearch]);

  const API = useCallback(
    async () => {
      try {
        const response = await fetch(selectEndPoint());
        const data = await response.json();
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
    [selectEndPoint, setRecipes],
  );

  const clickSearch = useCallback(() => {
    API();
  }, [API]);

  const handleSearch = ({ target: { value } }) => {
    setInputSearch(value);
  };

  return (
    <section>

      <label htmlFor="search">
        Pesquisar:
        <input
          data-testid="search-input"
          type="text"
          value={ inputSearch }
          name="search"
          id="search"
          onChange={ handleSearch }
        />
      </label>
      <div>

        <label htmlFor="ingredient">
          Ingredient:
          <input
            type="radio"
            id="ingredient"
            name="filter"
            defaultValue="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            type="radio"
            id="name"
            name="filter"
            defaultValue="name"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="first_letter">
          First Letter:
          <input
            type="radio"
            id="first_letter"
            name="filter"
            defaultValue="letter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <button type="button" data-testid="exec-search-btn" onClick={ clickSearch }>
          Search
        </button>
      </div>
    </section>

  );
}
