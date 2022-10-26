import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import RecipeCards from './RecipeCards';

function Recipes() {
  const route = useHistory();
  const {
    recipes,
    initialMeal,
    getCategory,
    getDrinkCat,
    initialDrink,
    handleClickCategory,
    buttonFilter,
    setButtonFilter,
    handleClickCat,
  } = useContext(MyContext);
  return (
    <>

      {/* { (window.location.pathname.includes('drinks') && getCategory.length === true)
        && getDrinkCat.map((e, index) => (
          <button
            data-testid={ `${e.strCategory}-category-filter` }
            key={ index }
            value={ e.strCategory }
            type="button"
            onClick={ (event) => handleClickCat(event.target.value) }
          >
            { e.strCategory }
          </button>
        ))} */}

      {window.location.pathname.includes('meals')
        && getCategory.map((e, index) => (
          <button
            data-testid={ `${e.strCategory}-category-filter` }
            key={ index }
            type="button"
            value={ e.strCategory }
            onClick={ (event) => handleClickCategory(event.target.value) }
          >
            { e.strCategory }
          </button>
        ))}
      <button
        type="button"
        onClick={ () => setButtonFilter([]) && handleClickCat([]) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        getDrinkCat.map((e, index) => ( // botao filter dos drinks
          <button
            key={ index }
            data-testid={ `${e.strCategory}-category-filter` }
            type="button"
            value={ e.strCategory }
            onClick={ (event) => {
              handleClickCat(event.target.value);
            } }
          >
            {e.strCategory}
          </button>
        ))
      }
      { buttonFilter.map((recipe, id) => (
        <RecipeCards // mapeamento dos filtros
          onClick={ () => route.push(`/drinks/${recipe.idDrink}`) // ver onClick
          || route.push(`/meals/${recipe.idMeal}`) }
          str={ recipe.strDrink || recipe.strMeal }
          strThumb={ recipe.strDrinkThumb || recipe.strMealThumb }
          key={ recipe.idDrink || recipe.idMeal }
          onKeyDown={ () => route.push(`/drinks/${recipe.idDrink}`)
          || route.push(`/meals/${recipe.idMeal}`) }
          testId={ `${id}-recipe-card` }
          testImg={ `${id}-card-img` }
          testName={ `${id}-card-name` }
        />
      ))}
      { // meals iniciais
        recipes.length < 1
          && (initialMeal.map((recipe, id) => (
            <RecipeCards
              str={ recipe.strMeal }
              onClick={ () => route.push(`/meals/${recipe.idMeal}`) }
              strThumb={ recipe.strMealThumb }
              key={ recipe.idMeal }
              onKeyDown={ () => route.push(`/meals/${recipe.idMeal}`) }
              testId={ `${id}-recipe-card` }
              testImg={ `${id}-card-img` }
              testName={ `${id}-card-name` }
            />)))
      }

      { // drinks iniciais
        recipes.length < 1
        && (initialDrink.map((recipe, id) => (
          <RecipeCards
            str={ recipe.strDrink }
            onClick={ () => route.push(`/drinks/${recipe.idDrink}`) }
            strThumb={ recipe.strDrinkThumb }
            key={ recipe.idDrink }
            onKeyDown={ () => route.push(`/drinks/${recipe.idDrink}`) }
            testId={ `${id}-recipe-card` }
            testImg={ `${id}-card-img` }
            testName={ `${id}-card-name` }
          />)))
      }

    </>
  );
}

export default Recipes;
