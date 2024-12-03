import { createSlice } from '@reduxjs/toolkit';

// État initial de notre slice
const initialState = {
  produits: [],
};

// Création du slice
const produitsSlice = createSlice({
    // Le nom du slice
  name: 'produits', 
  initialState,
  reducers: {
    // Action pour ajouter un produit
    ajouterProduit: (state, action) => {
      state.produits.push(action.payload);
    },
    // Action pour supprimer un produit
    supprimerProduit: (state, action) => {
      state.produits = state.produits.filter(produit => produit.id !== action.payload);
    },
    // Action pour modifier un produit
    modifierProduit: (state, action) => {
      const index = state.produits.findIndex(produit => produit.id === action.payload.id);
      if (index !== -1) {
        state.produits[index] = action.payload;
      }
    },
  },
});

// Export des actions générées par createSlice
export const { ajouterProduit, supprimerProduit, modifierProduit } = produitsSlice.actions;

// Export du reducer
export default produitsSlice.reducer;
