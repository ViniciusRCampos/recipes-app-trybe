import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/myContext';
import Header from '../components/Header';
import { recipeDrinks, recipeMeals } from '../helpers/Api';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const route = useHistory();
  const [recipe, setRecipe] = useState({});
  const [enable, setEnable] = useState(true);
  // const [doneRecipe, setDoneRecipe] = useState({});

  const { favorite, setFavorite, favoriteStorage, setFavoriteStorage,
    handleFavoriteClick } = useContext(MyContext);
  const [copied, setCopied] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const id = pathname.split('/')[2];
  let fillDoing = true;

  const local = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
    meals: {}, drinks: {},
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
      setFavorite({
        id,
        type: type.replace('s', ''),
        nationality: recipeData[0].strArea || '',
        category: recipeData[0].strCategory,
        alcoholicOrNot: recipeData[0].strAlcoholic || '',
        name: recipeData[0].strMeal || recipeData[0].strDrink,
        image: recipeData[0].strMealThumb || recipeData[0].strDrinkThumb,
      });
    };
    result();
    setFavoriteStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const handleCheck = (eventE, index) => {
    eventE.nativeEvent.path[1]
      .className = eventE.nativeEvent.path[1].className === ''
        ? 'checkedIngredint' : '';

    doing[index].check = !doing[index].check;

    saveCheck(doing);
    setEnable(!doing.every((ing) => ing.check === true));
  };

  useEffect(() => {
    setFavoriteList(favoriteStorage);
  }, [favoriteStorage]);

  const putTags = () => {
    if (recipe.strTags === null) {
      return [];
    }
    return recipe.strTags.split(',') || [];
  };

  const handleDone = () => {
    const doneRecipesStorage = localStorage.getItem('doneRecipes') || [];
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipesStorage, {
        ...favorite,
        tags: putTags(),
        doneDate: new Date().toJSON(),
      }]),
    );
    route.push('/done-recipes');
  };

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
      <div>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            copy(`http://localhost:3000/${type}/${id}`);
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
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ enable }
        onClick={ handleDone }
      >
        Finish
      </button>
    </>
  );
}
