import { React, useEffect, useState } from "react";
// import { fetchProduits } from "../api";
// import { fetchCategories } from '../api';


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


    // état pour la modification 
    const [produitEnCours, setProduitEnCours] = useState(null);


    // Au chargement de la page on va charger les produits (GET)
    useEffect(() => {
        // Fetch produits
        fetch('http://127.0.0.1:8000/api/produits')
          .then((res) => res.json())
          .then((data) => setProduits(data))
    }, []);

    // Fonction d'ajout des produits
    const ajoutProduit = (event) => {
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
        fetch('http://127.0.0.1:8000/api/produits',{
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

    // Fonction de modification de produit
    const modifierClick = (produit) => {
        setProduitEnCours(produit);
      };

    const modifierProduit = (e) => {
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/api/produits/${produitEnCours.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produitEnCours),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error("Erreur lors de la mise à jour.");
              }
            })
            .then((data) => {
              // Mettre à jour la liste des produits
              setProduits((prevProduits) =>
                prevProduits.map((p) => (p.id === data.id ? data : p))
              );
              setProduitEnCours(null); // Réinitialiser le formulaire
            })
            .catch((err) => console.error(err));
    }


        return (
            <div>
              <h1>Liste des Produits</h1>
              <form onSubmit={ajoutProduit}>
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
                {/* <div>
                    <label>Catégorie</label>
                    <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)} required>
                    <option value="">Sélectionner une catégorie</option>
                    {categorieId.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                            {categorie.nom}
                        </option>
                    ))}
                    </select>
                </div> */}
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
                        <td>
                            <button onClick={() => modifierClick(produit)}>Modifier</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {produitEnCours && (
                    <form onSubmit={modifierProduit}>
                        <h2>Modifier le produit</h2>
                        <input type="text" value={produitEnCours.nom} onChange={(e) => setProduitEnCours({ ...produitEnCours, nom: e.target.value })} placeholder="Nom"/>
                        <input type="text" value={produitEnCours.description} onChange={(e) => setProduitEnCours({ ...produitEnCours, description: e.target.value,})} placeholder="Description"/>
                        <input type="number" value={produitEnCours.prix} onChange={(e) => setProduitEnCours({ ...produitEnCours, prix: parseFloat(e.target.value),})}placeholder="Prix"/>
                        <button type="submit">Modifier</button>
                        <button onClick={() => setProduitEnCours(null)}>Annuler</button>

                    </form>
                )}
            </div>
          );

    }

export default ProduitsListe;