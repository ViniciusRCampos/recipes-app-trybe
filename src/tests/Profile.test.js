import React from 'react';
import { screen } from '@testing-library/react';
// import { useHistory } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Profile tests', () => {
  it('Espera o email na tela', () => {
    window.localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    renderWithRouter(<Profile />);
    const title = screen.getByRole('heading', { name: /profile/i });
    expect(title).toHaveTextContent(/profile/i);

    const email = screen.getByTestId('profile-email');
    expect(email).toHaveTextContent('teste@teste.com');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);

    expect(window.localStorage.getItem('user')).not.toBeInTheDocument();
  });
  it('Pagina renderiza sem email, testa favoritos', () => {
    const { history } = renderWithRouter(<Profile />);
    const title = screen.getByRole('heading', { name: /profile/i });
    expect(title).toHaveTextContent(/profile/i);

    const email = screen.getByTestId('profile-email');
    expect(email).toHaveTextContent('');

    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipes).toBeInTheDocument();
    userEvent.click(favoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('testing done-recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipes = screen.getByTestId('profile-done-btn');
    expect(doneRecipes).toBeInTheDocument();
    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
