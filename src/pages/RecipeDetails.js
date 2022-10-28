import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import { getFirstTwo, getMealsFirst } from '../helpers/Api';

const MEAL = ['strMealThumb', 'strMeal'];
const DRINK = ['strDrinkThumb', 'strDrink'];

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeImg, setRecipeImg] = useState('');
  const [recipeCat, setRecipeCat] = useState('');
  const [recipeInstr, setRecipeInstr] = useState([]);
  const [recipeVideo, setRecipeVideo] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const [recommended, setRecommended] = useState([]);

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
        const teste = await getFirstTwo();
        setRecommended(teste.drinks.slice(0, +'6'));
      } else {
        const teste2 = await getMealsFirst();
        setRecommended(teste2.meals.slice(0, +'6'));
      }
    };
    getRecommended();
  }, []);

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
    const result = async () => {
      let response = '';
      let data = '';
      if (type === 'meals') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await response.json();
        setRecipeImg(data[type][0][MEAL[0]]);
        setRecipeName(data[type][0][MEAL[1]]);
        setRecipeCat(data[type][0].strCategory);
        setRecipeInstr(data[type][0].strInstructions.split('STEP'));
        setRecipeVideo(data[type][0].strYoutube.replace('watch?v=', 'embed/'));
      } else {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await response.json();
        setRecipeImg(data[type][0][DRINK[0]]);
        setRecipeName(data[type][0][DRINK[1]]);
        setRecipeCat(data[type][0].strAlcoholic);
        setRecipeInstr(data[type][0].strInstructions);
      }
      setRecipe(...data[type]);
    }; result();
  }, [id, type]);

  return (
    <>
      <h1>Recipe Details</h1>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeImg }
          alt="Pic Recipe"
          width="300px"
        />
        <h2 data-testid="recipe-title">{ recipeName }</h2>
        <p data-testid="recipe-category">{ recipeCat }</p>
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
          { type === 'meals' ? recipeInstr.map((inst, ind) => (
            <p key={ ind }>{`${inst}`}</p>
          )) : <p>{`${recipeInstr}`}</p> }
        </div>
        {
          type === 'meals'
          && <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ recipeVideo }
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
      </div>

      {
        !doneRecipes.some((element) => element.id === Number(id))
        && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-button"
          >
            Start Recipe
          </button>
        )
      }

      <span>
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
          {/* </div> */}
        </div>
      </span>
      <Footer />
    </>
  );
}

export default RecipeDetails;
