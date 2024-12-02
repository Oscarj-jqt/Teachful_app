import { React, useEffect, useState } from "react";
import { api_url } from '../api.js';

// Composant qui gère l'affichage et les opération CRUD des produits
function ProduitsListe() {
    // initialisation de l'état (tableau produit)
    const [produits, setProduits] = useState([]);

    // initialisation des attributs
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    // float
    const [prix, setPrix] = useState();
    const [categorieId, setCategorieId] = useState('');

    // Au chargement de la page on va charger les produits (GET)
    useEffect(() => {
        // Fetch produits
        fetch(`${api_url}/api/produits`)
          .then((res) => res.json())
          .then((data) => setProduits(data))
    }, []);

    // Fonction d'ajout des produits
    const handleAddProduct = (event) => {
        // fonctionnalité js 
        event.preventDefault();

        const nouveauProduit = {
            // les attributs de l'entité
            nom,
            description,
            prix, 
            categorie_relation_id: categorieId,
        };

    // Envoie de la requête API pour ajouter
    fetch(`${api_url}/api/produits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouveauProduit),
      })
      .then((res) => res.json())
      .then((data) => {
        // appel du setteur pour ajouter le nouveau produit
        // méthode .. React
        setProduits((prevProduits) => [...prevProduits, data]);
        setNom('');
        setDescription('');
        setPrix();
        setCategorieId('');
      })
      .catch((err) => console.error(err));
    };


        return (
            <div>
              <h1>Liste des Produits</h1>
              <form onSubmit={handleAddProduct}>
                <div>
                    <label>Nom</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div>
                    <label>Prix</label>
                    <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                </div>
                <div>
                    <label>Catégorie</label>
                    <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)} required>
                    <option value="">Sélectionner une catégorie</option>
                    {categorieId.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                            {categorie.nom}
                        </option>
                    ))}
                    </select>
                </div>
                    <button type="submit">Ajouter le produit</button>
                </form>


                <h2>Les Produits</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Prix</th>
                      <th>Catégorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produits.map((produit) => (
                      <tr key={produit.id}>
                        <td>{produit.nom}</td>
                        <td>{produit.description}</td>
                        <td>{produit.prix}</td>
                        <td>{produit.categorie.nom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          );

    }

export default ProduitsListe;