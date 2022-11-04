import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import MyProvider from '../context/myProvider';

describe('Check if Recipes is working properly', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  // it('a', async () => {
  //   const { history } = renderWithRouter(
  //     <MyProvider>
  //       <App />
  //     </MyProvider>,
  //   );

  //   const login = screen.getByRole('textbox', {
  //     name: /email:/i,
  //   });
  //   const password = screen.getByLabelText(/senha:/i);
  //   const btn = screen.getByRole('button', { name: /login/i });

  //   userEvent.type(login, 'teste@teste.com');
  //   userEvent.type(password, '123456');
  //   userEvent.click(btn);

  //   console.log(history);
  //   // history.push('/meals');
  // });

  it('aa', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>,
    );

    act(() => {
      history.push('/drinks');
    });
    const searchBtn = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchBtn);
    userEvent.click(screen.getByText(/name:/i));
    const searchInput = screen.getByRole('textbox', {
      name: /pesquisar:/i,
    });
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'big mac');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
