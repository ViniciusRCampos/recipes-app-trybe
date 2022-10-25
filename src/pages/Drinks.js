import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';

function Drinks() {
  const route = useHistory();
  const { recipes } = useContext(MyContext);
  console.log(recipes, 'Drinks', recipes.length);
  return (
    <div>
      <Header
        title="Drinks"
      />
      {
        recipes.length === 1 ? route.push(`/drinks/${recipes[0].idDrink}`)
          : recipes.map((recipe, id) => (
            <RecipeCards
              onClick={ () => route.push(`/drinks/${recipe.idDrink}`) }
              str={ recipe.strDrink }
              strThumb={ recipe.strDrinkThumb }
              key={ recipe.idDrink }
              onKeyDown={ () => route.push(`/drinks/${recipe.idDrink}`) }
              testId={ `${id}-recipe-card` }
              testImg={ `${id}-card-img` }
              testName={ `${id}-card-name` }
            />
          ))
      }
    </div>
  );
}

export default Drinks;
