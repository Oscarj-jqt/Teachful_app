// Fichier de consommation d'API

// On récupère tout les produits
const api_url = 'http://127.0.0.1:8000 ';

export const fetchProduits = async () => {
  const response = await fetch(`${api_url}/api/produits`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }
  return await response.json();
    };


// Maintenant les catégories
export const fetchCategories = async () => {
  const response = await fetch(`${api_url}/api/categories`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des catégories');
  }
  return await response.json();
  };
