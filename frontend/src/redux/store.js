// Fichier pour stocker les états globaux
import { configureStore } from '@reduxjs/toolkit';
import produitsReducer from './reducers/produitsReducer';

const store = configureStore({
  reducer: {
    // On associe le reducer à produits, l'état global des produits
    produits: produitsReducer,
  },
});

export default store;
