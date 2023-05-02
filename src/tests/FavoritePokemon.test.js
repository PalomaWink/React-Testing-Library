import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';

test('Verifica se aparece apenas os pokemons favoritados', () => {
  renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[0]] } />);
  screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });

  renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[1]] } />);
  screen.getByRole('img', {
    name: /charmander is marked as favorite/i,
  });
});

test('Verifica se aparece a mensagem "No favorite pokemon found", caso a pessoa não tenha pokemons favoritados', () => {
  renderWithRouter(<FavoritePokemon />);
  screen.getByText(/no favorite pokémon found/i);
});
