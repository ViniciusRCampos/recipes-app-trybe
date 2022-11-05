import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import SearchBar from '../components/SearchBar';

describe('If component Login works properly', () => {
  it('Check login functions', async () => {
    renderWithRouter(<App />);
    const login = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const password = screen.getByLabelText(/senha:/i);
    const btn = screen.getByRole('button', { name: /login/i });

    expect(btn).toBeDisabled();
    userEvent.type(login, 'teste@teste.com');
    userEvent.type(password, '1234567');
    expect(await password.value).toHaveLength(7);
    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    const localStorageLogin = window.localStorage.getItem('user');
    const localStorageProgress = window.localStorage.getItem('inProgressRecipes');

    expect(JSON.parse(localStorageLogin).email).toBe('teste@teste.com');
    expect(JSON.parse(localStorageProgress)).toEqual({ meals: {}, drinks: {},
    });
  });
});

describe('If component Header works properly', () => {
  it('check functionalities from header', async () => {
    renderWithRouter(<Header />);
    const btn = screen.getByRole('img', {
      name: /search icon/i,
    });
    const input = screen.getByTestId('search-top-btn');
    userEvent.click(btn);
    expect(input).toBeVisible();
    fireEvent.keyDown(input, { keyCode: 13 });
    expect(input).not.toContain();
  });
  it('searchBar', async () => {
    renderWithRouter(<SearchBar />);
    const teste = screen.getByRole('textbox', {
      name: /pesquisar:/i,
    });
    expect(teste).toBeInTheDocument();
  });
});
