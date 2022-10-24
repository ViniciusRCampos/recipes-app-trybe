import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';

describe('If component Login works properly', () => {
  it('Check login functions', async () => {
    render(<App />);
    const login = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const password = screen.getByLabelText(/senha:/i);
    const btn = screen.getByRole('button', { name: /login/i });

    expect(btn).toBeDisabled();
    userEvent.type(login, 'teste@teste.com');
    userEvent.type(password, '123456');
    expect(await password.value).toHaveLength(6);
  });
});
describe('If component Header works properly', () => {
  it('check functionalities from header', () => {
    render(<Header />);
    const btn = screen.getByRole('img', {
      name: /search icon/i,
    });
    const input = screen.getByTestId('search-top-btn');
    console.log(btn);
    expect(input).toBeVisible();
    // expect(input).not.toBeVisible();
    // userEvent.clear(btn);
    // expect(input).toBeVisible();
    // userEvent.clear(btn);
    // expect(input).not.toBeVisible();
  });
});
