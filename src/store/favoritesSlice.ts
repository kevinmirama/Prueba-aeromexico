// src/store/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character { // Ensure this matches the Character interface in page.tsx
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  // No need for isFavorite here, as the presence in the state indicates favorite status
}

interface FavoritesState {
  favoriteCharacters: Character[];
}

const initialState: FavoritesState = {
  favoriteCharacters: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const index = state.favoriteCharacters.findIndex((fav) => fav.id === character.id);
      if (index >= 0) {
        // Character is already a favorite, remove it
        state.favoriteCharacters.splice(index, 1);
      } else {
        // Character is not a favorite, add it
        state.favoriteCharacters.push(character);
      }
    },
    // Optional: Add a reducer to set initial favorites if needed, e.g., from local storage or API
    setFavorites: (state, action: PayloadAction<Character[]>) => {
      state.favoriteCharacters = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;