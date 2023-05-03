import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se é renderizado corretamente um card com as informações do pokemon', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const img = screen.getByRole('img', { name: /pikachu sprite/i });
  screen.getByText('Pikachu');
  screen.getByText('Electric');
  screen.getByText(/average weight: 6\.0 kg/i);

  expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  expect(img.alt).toBe('Pikachu sprite');
});

test('Verifica se o card pokemon indicado na pokédex contém um link de navegação para exibir detalhes deste pokemon.', () => {
  const { history } = renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemon/25');
});

test('Verifica se ao clicar no link de navegação é feito o redirecionamento para a página de detalhes do pokemon', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  screen.getByRole('heading', { name: /summary/i });
  screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  screen.getByRole('heading', { name: /game locations of pikachu/i });
});

test('Verifica se existe um ícone de estrela nos pokemons favoritados', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(checkbox);
  const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(img.src).toBe('http://localhost/star-icon.svg');
  expect(img.alt).toBe('Pikachu is marked as favorite');
});
