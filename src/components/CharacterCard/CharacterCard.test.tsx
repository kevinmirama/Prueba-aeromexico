import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterCard from './CharacterCard';

// Mock de next/image para evitar errores en las pruebas
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    isFavorite: false,
  };

  const mockOnToggleFavorite = jest.fn();
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders character name correctly', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onToggleFavorite={mockOnToggleFavorite}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  test('displays LIVE status for alive characters', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onToggleFavorite={mockOnToggleFavorite}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  test('displays MUERTO status for dead characters', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    render(
      <CharacterCard
        character={deadCharacter}
        onToggleFavorite={mockOnToggleFavorite}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('MUERTO')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onToggleFavorite={mockOnToggleFavorite}
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText(mockCharacter.name).closest('div')!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('calls onToggleFavorite when like button is clicked', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onToggleFavorite={mockOnToggleFavorite}
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText('Like ☆'));
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('displays favorite status correctly', () => {
    const favoriteCharacter = { ...mockCharacter, isFavorite: true };
    render(
      <CharacterCard
        character={favoriteCharacter}
        onToggleFavorite={mockOnToggleFavorite}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Like ★')).toBeInTheDocument();
  });
}); 