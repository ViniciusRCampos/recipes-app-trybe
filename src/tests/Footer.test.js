import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Checks footer component', () => {
  it('check if footer render correctly', () => {
    renderWithRouter(<Footer />);
    const drink = screen.getByRole('img', {
      name: /drink icon/i,
    });
    const food = screen.getByRole('img', {
      name: /meal icon/i,
    });
    expect(drink).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });
});
