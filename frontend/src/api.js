// Fichier de consommation d'API

// On récupère tout les produits
const API_URL = 'http://127.0.0.1:8000 ';

export const fetchProduits = async () => {
    try {
        const response = await fetch(`${API_URL}/produits`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };


// Maintenant les catégories
export const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };
