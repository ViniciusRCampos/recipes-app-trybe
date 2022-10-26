import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';

const arr = ['All', 'Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
describe('Check if Recipes is working properly', () => {
  it('a', async () => {
    renderWithRouter(<SearchBar />);
    setTimeout(() => {
      const test = screen.getByRole('button', {
        name: /ordinary drink/i,
      });
      expect(test).toBeInTheDocument();
      arr.forEach((e) => {
        const btns = screen.getByRole('button', {
          name: e,
        });
        expect(btns).toBeInTheDocument();
      });
    });
  }, 2000);
});
