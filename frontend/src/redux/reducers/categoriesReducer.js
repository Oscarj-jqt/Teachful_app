import { createSlice } from '@reduxjs/toolkit';

// État initial de notre slice
const initialState = {
  categories: [],
};

// Création du slice
const categoriesSlice = createSlice({
    // Le nom du slice
  name: 'categories', 
  initialState,
  reducers: {
    // Action pour ajouter un categorie
    ajouterCategorie: (state, action) => {
      state.categories.push(action.payload);
    },
    // Action pour supprimer un categorie
    supprimerCategorie: (state, action) => {
      state.categories = state.categories.filter(categorie => categorie.id !== action.payload);
    },
    // Action pour modifier un categorie
    modifierCategorie: (state, action) => {
      const index = state.categories.findIndex(categorie => categorie.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
  },
});

// Export des actions générées par createSlice
export const { ajouterCategorie, supprimerCategorie, modifierCategorie } = categoriesSlice.actions;

// Export du reducer
export default categoriesSlice.reducer;
