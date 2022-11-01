import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import { getFirstTwo, getMealsFirst, recipeDrinks, recipeMeals } from '../helpers/Api';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/myContext';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { setFavorite, favoriteStorage, setFavoriteStorage,
    handleFavoriteClick } = useContext(MyContext);
  const route = useHistory();
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [startOrContinue, setStartOrContinue] = useState('');
  const [copied, setCopied] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const type = pathname.includes('meals') ? 'meal' : 'drink';
  const id = pathname.split('/')[2];

  const ingredientMesure = () => {
    const ingMes = [];
    const NUM_INGR_MESU = 20;
    for (let i = 1; i <= NUM_INGR_MESU; i += 1) {
      if (recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== null
          && recipe[`strIngredient${i}`] !== undefined
      ) {
        ingMes.push({
          ing: recipe[`strIngredient${i}`],
          mes: recipe[`strMeasure${i}`] });
      }
    }
    return ingMes;
  };

  useEffect(() => {
    const renderButton = () => {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
        meals: {},
        drinks: {},
      };
      const exist = Object.values(local)
        .find((e) => Object.keys(e).some((el) => el === id));
      if (exist) {
        setStartOrContinue('Continue Recipe');
      } else {
        setStartOrContinue('Start Recipe');
      }
    };
    renderButton();
  }, [id]);

  const onClickStartOrContinue = () => {
    const ingredients = ingredientMesure().map((e) => Object.values(e)[0]);
    const local = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
      meals: {},
      drinks: {},
    };
    const exist = Object.values(local)
      .find((e) => Object.keys(e).some((el) => el === id));
    if (exist) {
      return route.push(`${pathname}/in-progress`);
    }
    if (pathname.includes('/drinks')) {
      const sendRecipe = { [Number(id)]: [...ingredients] };
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...local,
        drinks: { ...local.drinks, ...sendRecipe },
      }));
      return route.push(`${pathname}/in-progress`);
    }
    const sendRecipe = { [Number(id)]: [...ingredients] };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      meals: { ...local.meals, ...sendRecipe },
    }));
    return route.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    const doneRecipesStorage = window.localStorage.getItem('doneRecipes');
    if (JSON.parse(doneRecipesStorage)) {
      setDoneRecipes([JSON.parse(doneRecipesStorage)]);
    } else {
      setDoneRecipes([]);
    }
  }, []);

  useEffect(() => {
    const getRecommended = async () => {
      if (window.location.pathname.includes('meals')) {
        const carousel = await getFirstTwo();
        setRecommended(carousel.drinks.slice(0, +'6'));
      } else {
        const carousel = await getMealsFirst();
        setRecommended(carousel.meals.slice(0, +'6'));
      }
    };
    getRecommended();
  }, []);

  useEffect(() => {
    const result = async () => {
      let recipeData = '';
      if (type === 'meal') {
        recipeData = await recipeMeals(id);
        recipeData[0].strYoutube = recipeData[0].strYoutube.replace('watch?v=', 'embed/');
      } else {
        recipeData = await recipeDrinks(id);
      }
      setRecipe(recipeData[0]);
      setFavorite({
        id,
        type,
        nationality: recipeData[0].strArea || '',
        category: recipeData[0].strCategory,
        alcoholicOrNot: recipeData[0].strAlcoholic || '',
        name: recipeData[0].strMeal || recipeData[0].strDrink,
        image: recipeData[0].strMealThumb || recipeData[0].strDrinkThumb,
      });
    }; result();
    setFavoriteStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [id, type, setFavorite, setFavoriteStorage]);

  useEffect(() => {
    setFavoriteList(favoriteStorage);
  }, [favoriteStorage]);

  return (
    <>
      <h1>Recipe Details</h1>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="Pic Recipe"
          width="300px"
        />
        <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h2>
        <div>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => {
              copy(`http://localhost:3000${window.location.pathname}`);
              setCopied(true);
            } }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          { copied && (<p>Link copied!</p>) }
          <button
            type="button"
            checked={ favoriteList.some((element) => element.id === id) }
            onClick={ handleFavoriteClick }
          >
            <img
              data-testid="favorite-btn"
              src={ !favoriteList.some(
                (element) => element.id === id,
              ) ? whiteHeart : blackHeart }
              alt="Favorite Icon"
            />
          </button>
        </div>
        <p data-testid="recipe-category">
          { type === 'drink'
            ? recipe.strAlcoholic
            : recipe.strCategory }
        </p>
        <div>
          { ingredientMesure().map((show, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${show.ing} - ${show.mes}`}
            </p>
          )) }
        </div>
        <div data-testid="instructions">
          {recipe.strInstructions}
        </div>
        {
          type === 'meal'
          && <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ recipe.strYoutube }
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
      </div>
      <div className="carousel">
        { recommended.map((element, index) => (
          <div
            className="carousel-card"
            data-testid={ `${index}-recommendation-card` }
            key={ element.idDrink || element.idMeal }

          >
            <p data-testid={ `${index}-recommendation-title` }>
              {element.strDrink || element.strMeal}

            </p>
            <img
              src={ element.strDrinkThumb || element.strMealThumb }
              alt={ element.strDrink || element.strMeal }
              width="80px"
            />
          </div>
        ))}
      </div>
      {
        !doneRecipes.some((element) => element.id === Number(id))
        && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-button"
            onClick={ onClickStartOrContinue }
          >
            { startOrContinue }
          </button>
        )
      }
      <Footer />
    </>
  );
}

export default RecipeDetails;
