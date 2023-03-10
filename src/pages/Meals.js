import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import Recipes from '../components/Recipes';

function Meals() {
  const route = useHistory();
  const { recipes } = useContext(MyContext);
  return (
    <div>
      <Header
        title="Meals"
      />
      <Recipes />

      {
        recipes.length === 1 ? route.push(`/meals/${recipes[0].idMeal}`)
          : recipes.map((recipe, id) => (
            <RecipeCards
              onClick={ () => route.push(`/meals/${recipe.idMeal}`) }
              str={ recipe.strMeal }
              strThumb={ recipe.strMealThumb }
              key={ recipe.idMeal }
              onKeyDown={ () => route.push(`/meals/${recipe.idMeal}`) }
              testId={ `${id}-recipe-card` }
              testImg={ `${id}-card-img` }
              testName={ `${id}-card-name` }
            />
          ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
