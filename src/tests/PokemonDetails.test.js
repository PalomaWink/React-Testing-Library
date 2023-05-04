import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se as informações detalhadas do pokemon são mostradas na tela', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  screen.getByRole('heading', { name: 'Pikachu Details' });
  screen.getByRole('heading', { name: /summary/i });
  screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
});

test('Verifica se existe uma seção com os mapas, contendo a localização do pokemon', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  screen.getByRole('heading', { name: /game locations of pikachu/i });
  screen.getByText(/kanto viridian forest/i);
  screen.getByText(/kanto power plant/i);

  const imgViridian = screen.getAllByRole('img', { name: /pikachu location/i });

  expect(imgViridian[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgViridian[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Verifica se o usuário consegue favoritar um pokemon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  screen.getByLabelText(/pokémon favoritado\?/i);
  const checkbox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(checkbox);
  const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(img.src).toBe('http://localhost/star-icon.svg');
  expect(img.alt).toBe('Pikachu is marked as favorite');
});
