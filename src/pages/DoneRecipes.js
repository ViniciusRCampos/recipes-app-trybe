import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes')) ?? [{
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      doneDate: '21/10/2010',
      tags: ['Soup'],
    }];
    setDoneRecipes(local);
  }, []);

  return (
    <>
      <Header
        title="Done Recipes"
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meal
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {
        doneRecipes?.map((e, i) => (
          <div key={ i }>
            <img
              src={ e.image }
              alt="imagem receita"
              data-testid={ `${i}-horizontal-image` }
            />
            <p data-testid={ `${i}-horizontal-top-text` }>{ e.category }</p>
            <p data-testid={ `${i}-horizontal-name` }>{ e.name }</p>
            <p data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</p>
            { e.tags.map((el, ind) => (
              <div key={ ind }>
                <p
                  data-testid={ `${ind}-${el}-horizontal-tag` }
                >
                  { el }
                </p>
              </div>
            )) }
            <button
              type="button"
              data-testid={ `${i}-horizontal-share-btn` }
            >
              Compartilhar
            </button>
          </div>
        ))
      }
    </>

  );
}

export default DoneRecipes;
