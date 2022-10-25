import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Checks footer component', () => {
  it('check if footer render correctly', () => {
    render(<Footer />);
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
