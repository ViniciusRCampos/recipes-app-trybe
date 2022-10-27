import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
// import Recomends from '../components/Recomends';

const MEAL = ['strMealThumb', 'strMeal'];
const DRINK = ['strDrinkThumb', 'strDrink'];

// const recomendMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const recomendDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeImg, setRecipeImg] = useState('');
  const [recipeCat, setRecipeCat] = useState('');
  const [recipeInstr, setRecipeInstr] = useState([]);
  const [recipeVideo, setRecipeVideo] = useState([]);
  // const [mealRecomend, setMealRecomend] = useState();
  // const [drinkRecomend, setDrinkRecomend] = useState();
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  async function result() {
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
  }
  /*
  async function recomends(recomend) {
    const response = await fetch(`${recomend}${id}`);
    const data = await response.json();
    console.log('Data API: ', data);
    if (type === 'meals') {
      setMealRecomend(data);
    } else {
      setDrinkRecomend(data);
    }
  }
  */
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
    /* if (type === 'meals') {
      recomends(recomendDrink);
    } else {
      recomends(recomendMeal);
    } */
    result();
  }, []);
  /*
  console.log('Meals Recomend: ', mealRecomend);
  console.log('Drink Recomend: ', drinkRecomend);
  */
  return (
    <>
      <h1>Recipe Details</h1>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeImg }
          alt="Pic Recipe"
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
      <div>
        {/* type === 'meals' ? recomends(recomendMeal) : recomends(recomendDrink) */}
        {/* <Recomends id={ id } type={ type } /> */}
      </div>
      <Footer />
    </>
  );
}

export default RecipeDetails;
