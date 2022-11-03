export const drinkFilters = async (event) => { // aqui, verificar a API
  const initial2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${event}`);
  const response = await initial2.json();
  return response;
};

export const getCategories = async () => {
  const initial = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await initial.json();
  return response;
};

export const getCat = async () => {
  const initial = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await initial.json();
  return response;
};

export const getMealsFirst = async () => {
  const initial = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await initial.json();
  return response;
};

export const getFirstTwo = async () => {
  const initial = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await initial.json();
  // console.log('drinks', response);
  return response;
};

export const mealFilters = async (event) => { // aqui, verificar a API
  try {
    const initial2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${event}`);
    const response = await initial2.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const ingredientMealApi = async (search) => { // aqui, verificar a API
  try {
    const initial2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const response = await initial2.json();
    return response.meals;
  } catch (error) {
    console.log('erro ingredientMealApi', error);
  }
};

export const nameMealApi = async (search) => { // aqui, verificar a API
  const initial2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const response = await initial2.json();
  return response;
};

export const letterMealApi = async (search) => { // aqui, verificar a API
  const initial2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
  const response = await initial2.json();
  return response;
};

export const ingredientDrinkApi = async (search) => { // aqui, verificar a API
  const initial2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
  const response = await initial2.json();
  return response;
};

export const nameDrinkApi = async (search) => { // aqui, verificar a API
  const initial2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
  const response = await initial2.json();
  return response;
};

export const letterDrinkApi = async (search) => { // aqui, verificar a API
  const initial2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
  const response = await initial2.json();
  return response;
};

export const recipeMeals = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  const results = [...data.meals];
  return results;
};
export const recipeDrinks = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  console.log(data);
  const results = [...data.drinks];
  // console.log(results, 'drinks API');
  return results;
};

// export const selectEndPoint = async (radio, search) => {
//   const ingreMeal = await ingredientMealApi(search);
//   const nameMeal = await nameMealApi(search);
//   const letterMeal = await letterMealApi(search);

//   const ingreDrink = await ingredientDrinkApi(search);
//   const nameDrink = await nameDrinkApi(search);
//   const letterDrink = await letterDrinkApi(search);
//   console.log('search', search);

//   if (window.location.pathname.includes('meals')) {
//     switch (radio) {
//     case 'ingredient': {
//       return ingreMeal;
//     }
//     case 'name': {
//       return nameMeal;
//     }
//     case 'letter': {
//       return letterMeal;
//     }
//     default:
//       break;
//     }
//     if (window.location.pathname.includes('drinks')) {
//       switch (radio) {
//       case 'ingredient': {
//         return ingreDrink;
//       }
//       case 'name': {
//         return nameDrink;
//       }
//       case 'letter': {
//         return letterDrink;
//       }
//       default:
//         break;
//       }
//     }
//   }
// };

// export const check = (radio, search) => {
//   if (window.location.pathname.includes('meals')) {
//     switch (radio) {
//     case 'ingredient':
//       return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
//     case 'name':
//       return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
//     case 'letter':
//       return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
//     default:
//       break;
//     }
//   }
//   if (window.location.pathname.includes('drinks')) {
//     switch (radio) {
//     case 'ingredient':
//       return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
//     case 'name':
//       return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
//     case 'letter':
//       return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
//     default:
//       break;
//     }
//   }
// };

// export const selectEndPoint = (radio, search) => {
//   if (window.location.pathname.includes('meals')) {
//     switch (radio) {
//     case 'ingredient':
//       return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
//     case 'name':
//       return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
//     case 'letter':
//       return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
//     default:
//       break;
//     }
//   }
//   if (window.location.pathname.includes('drinks')) {
//     switch (radio) {
//     case 'ingredient':
//       return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
//     case 'name':
//       return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
//     case 'letter':
//       return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
//     default:
//       break;
//     }
//   }
// };

// export const API = async (setRecipes) => {
//   try {
//     const response = await fetch(selectEndPoint());
//     const data = await response.json();
//     console.log('data', data);
//     if (Object.values(data)[0] !== null) {
//       if (data.drinks) {
//         if (data.drinks.length > Number('12')) {
//           setRecipes(data.drinks.slice(0, +'12'));
//         } else {
//           setRecipes(data.drinks);
//         }
//       }
//       if (data.meals) {
//         if (data.meals.length > Number('12')) {
//           setRecipes(data.meals.slice(0, +'12'));
//         } else {
//           setRecipes(data.meals);
//         }
//       }
//     } else {
//       global.alert('Sorry, we haven\'t found any recipes for these filters.');
//     }
//   } catch (error) {
//     console.log(error);
//     global.alert('Sorry, we haven\'t found any recipes for these filters.');
//   }
// };
