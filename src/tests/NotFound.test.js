import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

test('Verifica se a página Not Found apresenta os elementos corretamente', () => {
  renderWithRouter(<NotFound />);
  screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
