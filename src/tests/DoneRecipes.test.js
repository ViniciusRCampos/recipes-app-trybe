import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Check if DoneRecipes is working properly', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  it('verify renderization', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/done-recipes');
    });

    const title = screen.getByRole('heading', {
      name: /done recipes/i,
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

    const test = window.localStorage.getItem('doneRecipes');
    console.log(test);
    expect(title).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();

    window.localStorage.clear();

    const recipes = screen.getByTestId('0-horizontal-name');
    expect(recipes).toHaveTextContent('Corba');

    const favoriteBtn = screen.getByRole('img', {
      name: /share icon/i,
    });
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(mealsButton);

    const imageRecipe = screen.getByTestId('0-horizontal-image');

    expect(imageRecipe).toBeInTheDocument();

    userEvent.click(allButton);
    const typeRecipe = screen.getByText(/turkish - side/i);
    expect(typeRecipe).toBeInTheDocument();
    userEvent.click(drinksButton);
    expect(imageRecipe).not.toBeInTheDocument();
  });
});
