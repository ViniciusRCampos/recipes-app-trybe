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

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
          <Route exact path="/meals/:id" component={ Favorites } />
          {/* <Route exact path="/meals/:id/in-progress" component={ Home } /> */}
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ Favorites } />
          {/* <Route exact path="/drinks/:id/in-progress" component={ Home } /> */}
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
