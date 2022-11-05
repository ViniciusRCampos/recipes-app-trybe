import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [arrFavorites, setArrFavorites] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    console.log(local);
    setArrFavorites(local);
    setFavoriteRecipes(local);
  }, []);

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
            <img
              src={ e.image }
              alt="imagem receita"
              data-testid={ `${i}-horizontal-image` }
              width="300px"
            />
            <p data-testid={ `${i}-horizontal-top-text` }>{ e.category }</p>
            <p data-testid={ `${i}-horizontal-name` }>{ e.name }</p>

            <button
              type="button"
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ () => {
                copy(`http://localhost:3000/${e.type}s/${e.id}`);
                setCopied(true);
              } }
            >
              compartilhar
            </button>
            {/* { copied && (<p>Link copied!</p>) } */}
            <button type="button" data-testid={ `${i}-horizontal-favorite-btn` }>
              favoritar
            </button>
          </div>
        ))
      }
    </>
  );
}

export default FavoriteRecipes;
