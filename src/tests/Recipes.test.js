import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../components/Recipes';

const arr = ['All', 'Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
describe('Check if Recipes is working properly', () => {
  it('a', async () => {
    render(<Recipes />);
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
