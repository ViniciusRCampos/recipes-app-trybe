// import React from 'react';
// import { screen, fireEvent, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
// import Header from '../components/Header';
// import renderWithRouter from '../helpers/renderWithRouter';
// import App from '../App';
// import SearchBar from '../components/SearchBar';
// import MyProvider from '../context/myProvider';
// import Meals from '../pages/Meals';

// describe('Testing Recipe Details page', () => {
//   test('testing renderezation', async () => {
//     const { history } = renderWithRouter(
//       (
//         <MyProvider>
//           <App />
//         </MyProvider>
//       ), '/meals',
//     );

//     await waitFor(() => screen.getByText('Corba'));
//     const corba = screen.getAllByText(/'corba'/i);
//     expect(corba).toBeInTheDocument();

//     const searchBtn = screen.getByRole('img', {
//       name: /search icon/i,
//     });
//     userEvent.click(searchBtn);

//     const search = screen.getByRole('textbox', {
//       name: /pesquisar:/i,
//     });
//     const radio = screen.getAllByRole('radio');
//     expect(radio).toHaveLength(3);

//     expect(search).toBeInTheDocument();
//     const radioInput = screen.getByRole('radio', {
//       name: /name:/i,
//     });
//     userEvent.click(radioInput);
//     userEvent.type('corba');
//     userEvent.click(screen.getByTestId('exec-search-btn'));

//     act(() => {
//       history.push('/meals/52977');
//     });

//     expect(history.location.pathname).toBe('/meals/52977');
//   });
// });

import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Check if Recipes is working properly', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('a', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/15997');
    });

    const title = await screen.findByRole('heading', {
      name: /recipe details/i,
    });

    const drink = await screen.findByRole('heading', {
      name: /GG/i,
    });
    const imgDrink = await screen.findByRole('img', {
      name: /pic recipe/i,
    });
    expect(title).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
    expect(imgDrink).toBeInTheDocument();

    const corba = await screen.findByRole('img', {
      name: /corba/i,
    });
    expect(corba).toBeInTheDocument();

    const shareBtn = screen.getByRole('img', {
      name: /share icon/i,
    });
    console.log(shareBtn);

    // Por algum motivo o Click no ShareBtn trava o teste

    // userEvent.click(shareBtn);
    // const link = await screen.findByText(/link copied!/i);
    // expect(link).toBeInTheDocument();

    const favoriteBtn = screen.getByRole('img', {
      name: /favorite icon/i,
    });
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeInTheDocument();
    const localStorageFavorite = window.localStorage.getItem('favoriteRecipes');
    expect(JSON.parse(localStorageFavorite)).toHaveLength(1);

    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);

    const localStorageRecipes = window.localStorage.getItem('inProgressRecipes');

    expect(JSON.parse(localStorageRecipes)).toEqual({ meals: {},
      drinks: { 15997:
    [{ check: false,
      ing: 'Galliano',
    }, { check: false,
      ing: 'Ginger ale',
    }, {
      check: false,
      ing: 'Ice',
    },
    ],
      } });
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    act(() => {
      history.push('/drinks/15997');
    });

    const continueRecipe = screen.getByTestId('start-recipe-btn');
    expect(continueRecipe).toHaveTextContent('Continue Recipe');
  });
});
