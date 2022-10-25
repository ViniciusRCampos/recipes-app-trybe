import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const { handleRadio, handleSearch, search, clickSearch } = useContext(MyContext);
  const [show, setShow] = useState(false);

  const path = window.location.pathname;

  return (
    <header>
      <a href="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt={ `imagem de ${profileIcon}` }
        />
      </a>
      {!(path === '/profile'
      || path === '/done-recipes'
      || path === '/favorite-recipes') && (
        <>
          <div
            role="button"
            onKeyDown={ () => setShow(!show) }
            onClick={ () => setShow(!show) }
            tabIndex={ 0 }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </div>
          { show && (
            <SearchBar
              handleRadio={ handleRadio }
              handleSearch={ handleSearch }
              search={ search }
              clickSearch={ clickSearch }
            />
          )}
        </>
      )}
      <h1 data-testid="page-title">{title}</h1>

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
