import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [arrRecipes, setArrRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
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
    setArrRecipes(local);
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
          onClick={ () => {
            setArrRecipes(doneRecipes);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            setArrRecipes(arrRecipes.filter((e) => e.type === 'meal'));
          } }
        >
          Meal
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setArrRecipes(arrRecipes.filter((e) => e.type === 'drink'));
          } }
        >
          Drinks
        </button>
      </div>
      {
        arrRecipes?.map((e, i) => (
          <div key={ i }>
            <Link to={ `${e.type}s/${e.id}` }>
              <img
                src={ e.image }
                alt="imagem receita"
                data-testid={ `${i}-horizontal-image` }
                width="300px"
              />
              <p data-testid={ `${i}-horizontal-top-text` }>{ e.category }</p>
              <p data-testid={ `${i}-horizontal-name` }>{ e.name }</p>
            </Link>

            <p data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</p>
            { e.tags.map((el, ind) => (

              <p
                data-testid={ `${i}-${el}-horizontal-tag` }
                key={ ind }
              >
                { el }
              </p>
            )) }

            {
              e.type === 'drink' && (
                <p data-testid={ `${i}-horizontal-top-text` }>{e.alcoholicOrNot}</p>
              )
            }

            { e.type === 'meal' && (
              <p data-testid={ `${i}-horizontal-top-text` }>
                { `${e.nationality} - ${e.category}` }
              </p>
            )}
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
          </div>
        ))
      }
    </>

  );
}

export default DoneRecipes;
