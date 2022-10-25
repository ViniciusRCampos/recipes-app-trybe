import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';

function Meals() {
  const route = useHistory();
  const { recipes } = useContext(MyContext);
  console.log(recipes, 'TAMANHO');
  return (
    <div>
      <Header
        title="Meals"
      />
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

    </div>
  );
}

export default Meals;
