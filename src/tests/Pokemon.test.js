import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonList from '../data';

test('Verifica se é renderizado corretamente um card com as informações do pokemon', () => {
  renderWithRouter(<Pokemon
    pokemonList={ pokemonList }
  />);
  pokemonList.forEach((pokemon) => {

  });
});

test('', () => {});

test('', () => {});

test('', () => {});
