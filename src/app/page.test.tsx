import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../store/favoritesSlice';

// Mock de next/image para evitar errores en las pruebas
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock de fetch para simular respuestas de la API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      }
    ]),
  })
) as jest.Mock;

describe('Home Page', () => {
  const renderWithRedux = (component: React.ReactNode) => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });
    
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    renderWithRedux(<Home />);
    expect(screen.getByText(/Cargando personajes/i)).toBeInTheDocument();
  });

  test('fetches and displays characters', async () => {
    renderWithRedux(<Home />);
    
    // Esperar a que los personajes se carguen
    const rickCharacter = await screen.findByText('Rick Sanchez');
    expect(rickCharacter).toBeInTheDocument();
    
    const mortyCharacter = await screen.findByText('Morty Smith');
    expect(mortyCharacter).toBeInTheDocument();
  });

  test('displays status indicators', async () => {
    renderWithRedux(<Home />);
    
    // Verificar que se muestran los indicadores de estado
    const liveStatus = await screen.findByText('VIVO');
    expect(liveStatus).toBeInTheDocument();
    
    const deadStatus = screen.getByText('MUERTO');
    expect(deadStatus).toBeInTheDocument();
  });
});