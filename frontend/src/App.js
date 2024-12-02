import logo from './logo.svg';
import './App.css';
import './api.js';

import './index.css';


import React, { useEffect, useState } from 'react';

const App = () => {
  const [produits, setProduits] = useState([]);
  const API_URL = 'http://127.0.0.1:8000';
  useEffect(() => {

    fetch(`${API_URL}/api/produits`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Vérifie les données reçues
      setProduits(data);
    })
    .catch(error => console.error('Erreur :', error));
  }, []);

  return (
    <div>
      <h1>Liste des Produits</h1>
      <ul>
        {produits.map(produit => (
          <li key={produit.id}>{produit.nom}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
