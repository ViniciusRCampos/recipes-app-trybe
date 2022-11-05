import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { removeFavoriteRecipe } from '../helpers/localStorage';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [arrFavorites, setArrFavorites] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [copied, setCopied] = useState(false);

  console.log(arrFavorites[0]);

  const handleRemoveFavorite = (event) => {
    const index = event.currentTarget.value;
    removeFavoriteRecipe(arrFavorites[index]);
    const local = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    setArrFavorites(local);
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    console.log(local);
    setArrFavorites(local);
    setFavoriteRecipes(local);
  }, []);

  console.log(arrFavorites);
  return (
    <>
      <Header
        title="Favorite Recipes"
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setArrFavorites(favoriteRecipes) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            setArrFavorites(arrFavorites.filter((e) => e.type === 'meal'));
          } }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setArrFavorites(arrFavorites.filter((e) => e.type === 'drink'));
          } }
        >
          Drinks
        </button>
      </div>
      {
        arrFavorites.map((e, i) => (
          <div key={ i }>
            <a href={ `/${e.type}s/${e.id}` }>
              <img
                src={ e.image }
                alt="imagem receita"
                data-testid={ `${i}-horizontal-image` }
                width="150px"
              />
            </a>
            <a href={ `/${e.type}s/${e.id}` }>
              <p data-testid={ `${i}-horizontal-name` }>{ e.name }</p>
            </a>
            <p data-testid={ `${i}-horizontal-top-text` }>{ e.category }</p>

            <p data-testid={ `${i}-horizontal-top-text` }>
              { `${e.nationality || e.alcoholicOrNot} - ${e.category}` }
            </p>

            <button
              type="button"
              onClick={ () => {
                copy(`http://localhost:3000/${e.type}s/${e.id}`);
                setCopied(true);
              } }
            >
              <img
                src={ shareIcon }
                alt="Share Icon"
                data-testid={ `${i}-horizontal-share-btn` }
              />
            </button>
            { copied && (<p>Link copied!</p>) }
            <button
              type="button"
              value={ i }
              onClick={ handleRemoveFavorite }
            >
              <img
                data-testid={ `${i}-horizontal-favorite-btn` }
                src={ blackHeart }
                alt="Favorite Icon"
              />
            </button>
          </div>
        ))
      }
    </>
  );
}

export default FavoriteRecipes;
