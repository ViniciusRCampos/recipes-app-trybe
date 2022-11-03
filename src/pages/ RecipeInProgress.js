import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import { recipeDrinks, recipeMeals } from '../helpers/Api';

export default function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState({});

  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const id = pathname.split('/')[2];
  let fillDoing = true;

  const local = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
    meals: {},
    drinks: {},
  };

  let doing = [];
  if (local[type][id] !== undefined) {
    doing = local[type][id] || [];
    fillDoing = false;
  }

  const ingredientMesure = () => {
    const ingMes = [];
    const NUM_INGR_MESU = 20;
    for (let i = 1; i <= NUM_INGR_MESU; i += 1) {
      if (recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== null
          && recipe[`strIngredient${i}`] !== undefined
      ) {
        if (fillDoing) {
          doing.push({ check: false });
        }
        ingMes.push(recipe[`strIngredient${i}`]);
      }
    }
    return ingMes;
  };

  const saveCheck = (ingredients) => {
    const sendRecipe = { [Number(id)]: ingredients };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      [type]: { ...local[type], ...sendRecipe },
    }));
  };

  useEffect(() => {
    const result = async () => {
      let recipeData = '';
      if (type === 'meals') {
        recipeData = await recipeMeals(id);
        recipeData[0].strYoutube = recipeData[0].strYoutube.replace('watch?v=', 'embed/');
      } else {
        recipeData = await recipeDrinks(id);
      }
      setRecipe(recipeData[0]);
    };
    result();
  }, []);

  const handleCheck = (eventE, index) => {
    eventE.nativeEvent.path[1]
      .className = eventE.nativeEvent.path[1].className === ''
        ? 'checkedIngredint' : '';

    doing[index].check = !doing[index].check;

    saveCheck(doing);
  };
  /*
  const putClass = (index) => {
    if (doing[index].check === undefined) {
      return '';
    }
    return 'checkedIngredint';
  };

  const putCheck = (index) => {
    if (doing[index].check === undefined) {
      return false;
    }
    return doing[index].check;
  };
  */
  return (
    <>
      <Header title="Recipe in progress" />
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="Pic"
      />
      <h3 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h3>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p data-testid="recipe-category">
        { type === 'drinks'
          ? recipe.strAlcoholic
          : recipe.strCategory }
      </p>
      {
        ingredientMesure().map((ingredient, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `CheckIngredient-${index}` }
            className={ doing[index].check ? 'checkedIngredint' : '' }
            onChange={ (event) => handleCheck(event, index) }
          >
            <input
              type="checkbox"
              id={ `CheckIngredient-${index}` }
              name={ `CheckIngredient-${index}` }
              defaultChecked={ doing[index].check || false }
            />
            <span>{ ingredient }</span>
          </label>
        ))
      }
      <p data-testid="instructions">{ recipe.strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">Finish</button>
    </>
  );
}
