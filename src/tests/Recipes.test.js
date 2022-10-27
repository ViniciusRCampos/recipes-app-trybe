import React from 'react';
// import { act } from 'react-dom/test-utils';
// import { render } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../components/Recipes';

// const arr = ['All', 'Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
describe('Check if Recipes is working properly', () => {
  it('a', async () => {
    // setTimeout(() => {
    renderWithRouter(<Recipes />, { initialEntries: '/drinks' });

    // act(() => {
    //   history.push('/drinks');
    // });
    // console.log(history);
    // const test = screen.getByRole('button', {
    //   name: /ordinary drink/i,
    // });
    // expect(test).toBeInTheDocument();
    // arr.forEach((e) => {
    //   const btns = screen.getByRole('button', {
    //     name: e,
    //   });
    //   expect(btns).toBeInTheDocument();
    // });ß
    // }, 2000);
  });
});
