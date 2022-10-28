import React from 'react';
import { screen } from '@testing-library/react';
// import { useHistory } from 'react-router-dom';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Profile tests', () => {
  it('Espera o email na tela', () => {
    renderWithRouter(<Profile />);
    // const route = useHistory();
    const title = screen.getByRole('heading', { name: /profile/i });
    expect(title).toHaveTextContent(/profile/i);
  });
});
