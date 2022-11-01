function setLocalStorage(key, token) {
  localStorage.setItem(key, JSON.stringify(token));
}

function getLocalStorage(key) {
  localStorage.getItem(key);
}

if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}
function saveFavoriteRecipe(favorites) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}

function addFavoriteRecipe(recipe) {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  saveFavoriteRecipe([...favorite, recipe]);
}
function removeFavoriteRecipe(recipes) {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  addFavoriteRecipe(recipes.filter((recipe) => recipe.id !== favorite.id));
}

export {
  setLocalStorage,
  getLocalStorage,
  addFavoriteRecipe,
  removeFavoriteRecipe,
};
