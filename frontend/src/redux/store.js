// Fichier pour stocker les états globaux
import { configureStore } from '@reduxjs/toolkit';
import produitsReducer from './produitsReducer';

const store = configureStore({
  reducer: {
    // On associe le reducer aux produits
    produits: produitsReducer,
  },
});

export default store;
