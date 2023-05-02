import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se o primeiro link possu possui o texto "Home", "About" e "Favorite Pokémon"', () => {
  renderWithRouter(<App />);
  screen.getByRole('link', {
    name: /home/i,
  });
  screen.getByRole('link', {
    name: /about/i,
  });
  screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
});

test('Verifica se a aplicação está redirecionando o "About" para a URL "/about"', () => {
  const { history } = renderWithRouter(<App />);
  const aboutURL = screen.getByRole('link', {
    name: /about/i,
  });
  userEvent.click(aboutURL);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Verifica se a aplicação está redirecionando a "Home" para a URL "/"', () => {
  const { history } = renderWithRouter(<App />);
  const homeURL = screen.getByRole('link', {
    name: /home/i,
  });
  userEvent.click(homeURL);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Verifica se a aplicação está redirecionando a "Pokémon Favoritados" para a URL "/favorites"', () => {
  const { history } = renderWithRouter(<App />);
  const favoritePokemonURL = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  userEvent.click(favoritePokemonURL);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Verifica se a aplicação está redirecionando a "Pokémon Favoritados" para a URL "/favorites"', async () => {
  const { history } = renderWithRouter(<App />);
  const pageNotFound = '/pagina-que-nao-existe';
  history.push(pageNotFound);

  const textNotFound = await screen.findByRole('heading', {
    name: /page requested not found/i,
  });
  expect(textNotFound).toBeInTheDocument();
});
