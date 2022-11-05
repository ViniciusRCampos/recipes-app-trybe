import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Check if FavoriteRecipes is working properly', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  const recipe = [{
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  }];

  window.localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
  it('verify renderization', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorite-recipes');
    });

    const title = screen.getByRole('heading', {
      name: /Favorite Recipes/i,
    });
    const mealsButton = screen.getByRole('button', {
      name: /meals/i,
    });

    const drinksButton = screen.getByRole('button', {
      name: /drinks/i,
    });
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    expect(title).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();

    const recipeDrink = screen.getByTestId('0-horizontal-image');
    expect(recipeDrink).toBeInTheDocument();

    const shareBtn = screen.getByRole('button', {
      name: /compartilhar/i,
    });
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByRole('button', {
      name: /favoritar/i,
    });
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(drinksButton);

    const imageRecipe = screen.getByTestId('0-horizontal-image');

    expect(imageRecipe).toBeInTheDocument();

    userEvent.click(allButton);
    const typeRecipe = screen.getByText(/GG/i);
    expect(typeRecipe).toBeInTheDocument();
    userEvent.click(mealsButton);
    expect(imageRecipe).not.toBeInTheDocument();

    userEvent.click(allButton);
    userEvent.click(favoriteBtn);

    expect(imageRecipe).not.toBeInTheDocument();
  });
});
