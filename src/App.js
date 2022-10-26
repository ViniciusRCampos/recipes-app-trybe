import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MyProvider from './context/myProvider';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/meals" render={ () => <Meals /> } />
          <Route exact path="/meals/:id" render={ () => <RecipeDetails /> } />
          <Route exact path="/drinks" render={ () => <Drinks /> } />
          <Route exact path="/drinks/:id" render={ () => <RecipeDetails /> } />
          <Route exact path="/profile" render={ () => <Profile /> } />
          <Route exact path="/done-recipes" render={ () => <DoneRecipes /> } />
          <Route exact path="/favorite-recipes" render={ () => <Favorites /> } />
        </Switch>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
