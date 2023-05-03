import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemonList from '../data';

const favorites = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('Verifica se a página contém um texto "Encountered Pokémon"', () => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ favorites }
  />);
  screen.getByRole('heading', {
    name: /encountered pokémon/i,
  });
});

test('Verifica se é exibido o botão "Próximo Pokémon" e ao clicar nele, os próximos pokemons são exibidos na sequencia', () => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ favorites }
  />);
  const button = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  pokemonList.forEach((pokemon) => {
    screen.getByText(pokemon.name);
    userEvent.click(button, 'Próximo Pokémon');
  });
  screen.getByText(/pikachu/i);
});

test('Verifica se é mostrado apenas um pokemon por vez', () => {
  
});

test('', () => {});

test('', () => {});
