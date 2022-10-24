import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Verifica se login funciona', () => {
  it('Farewell, front-end', async () => {
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
