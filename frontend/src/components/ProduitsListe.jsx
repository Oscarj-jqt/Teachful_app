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
            nom,
            description,
            prix, 
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
        setPrix('');
        setCategorieId('');
      })
      .catch((err) => console.error(err));
    };


        return (
            <div>
              <h1>Liste des Produits</h1>



              
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produits.map((produit) => (
                      <tr key={produit.id}>
                        <td>{produit.nom}</td>
                        <td>{produit.description}</td>
                        <td>{produit.prix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          );

    }

export default ProduitsListe;