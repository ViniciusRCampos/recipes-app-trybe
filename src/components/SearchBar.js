import React, { useContext } from 'react';
import MyContext from '../context/myContext';

export default function SearchBar() {
  const { handleRadio, handleSearch, search, clickSearch } = useContext(MyContext);

  return (
    <section>

      <label htmlFor="search">
        Pesquisar:
        <input
          data-testid="search-input"
          type="text"
          value={ search }
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
            value="ingredient"
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
            value="name"
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
            value="letter"
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
