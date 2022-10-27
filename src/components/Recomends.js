import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const recomendMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const recomendDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

async function recomends(id, recomend, setFunc) {
  const response = await fetch(`${recomend}${id}`);
  const data = await response.json();
  console.log('Data API: ', data);

  setFunc(data);
}

export default function Recomends(props) {
  const { id, type } = props;
  const [mealRecomend, setMealRecomend] = useState();
  const [drinkRecomend, setDrinkRecomend] = useState();

  useEffect(() => {
    if (type === 'meals') {
      recomends(id, recomendDrink, setDrinkRecomend);
    } else {
      recomends(id, recomendMeal, setMealRecomend);
    }
  }, []);

  console.log('Meals Recomend: ', mealRecomend);
  console.log('Drink Recomend: ', drinkRecomend);

  return (
    <div>Recomends...</div>
  );
}

Recomends.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
