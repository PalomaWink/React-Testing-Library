import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
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
  renderWithRouter(<App />);
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
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ favorites }
  />);
  const pokemonElements = screen.getAllByTestId('pokemon-name');
  expect(pokemonElements).toHaveLength(1);
});

test('Verificando se a pokedex tem os botões de filtro', () => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ favorites }
  />);
  const buttonFilter = screen.getAllByTestId('pokemon-type-button');
  pokemonList.forEach((pokemon) => {
    screen.getByRole('button', { name: pokemon.type });
  });
  screen.getByRole('button', { name: /all/i });
  expect(buttonFilter).toHaveLength(7);
});

test('Verifica se a partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ favorites }
  />);
  const buttonFilter = screen.getByRole('button', { name: /fire/i });
  const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

  userEvent.click(buttonFilter);
  screen.getByRole('button', { name: /all/i });
  screen.getByText(/charmander/i);
  userEvent.click(buttonNext);
  screen.getByRole('button', { name: /all/i });
  screen.getByText(/rapidash/i);
  userEvent.click(buttonNext);
  screen.getByRole('button', { name: /all/i });
  screen.getByText(/charmander/i);
});

test('Verificar se a pokedex possui o botão "All" para resetar o filtro', () => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ favorites }
  />);
  const resetFilter = screen.getByRole('button', { name: /all/i });
  const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(buttonNext);
  screen.getByText(/charmander/i);
  userEvent.click(resetFilter);
  screen.getByText(/pikachu/i);
});
