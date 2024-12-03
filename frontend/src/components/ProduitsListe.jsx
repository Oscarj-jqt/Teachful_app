import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajouterProduit, modifierProduit, supprimerProduit } from "../redux/reducers/produitsReducer";
// Composant qui gère l'affichage et les opération CRUD des produits
function ProduitsListe() {

    const dispatch = useDispatch();
    // Récupération des produits depuis Redux
    const produits = useSelector((state) => state.produits.produits);
    

    // initialisation des attributs
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    // float et ca commence à 0
    const [prix, setPrix] = useState(0);
    const [categorieId, setCategorieId] = useState('');
    // état pour la modification (PUT)
    const [produitEnCours, setProduitEnCours] = useState(null);


    // Au chargement de la page on va charger les produits (GET)
    useEffect(() => {
        // Fetch produits
        fetch("http://127.0.0.1:8000/api/produits")
          .then((res) => res.json())
          .then((data) => {
            data.forEach((produit) => {
              dispatch(ajouterProduit(produit));
            });
          })
          .catch((err) => console.error("Erreur dans la récupération des données", err));
      }, [dispatch]);

    // Fonction d'ajout des produits
    const handleAjouterProduit = (event) => {
        // fonctionnalité js 
        event.preventDefault();

        const nouveauProduit = { nom, description, prix, categorie_relation_id: categorieId };

        // Envoie de la requête API pour ajouter avec Redux
        fetch('http://127.0.0.1:8000/api/produits',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(nouveauProduit),
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch(ajouterProduit(data));
          setNom("");
          setDescription("");
          setPrix(0);
          setCategorieId("");
        })
        .catch((err) => console.error(err));
    };

    // Fonction de modification de produit

    const handleModifierProduit = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:8000/api/produits/${produitEnCours.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produitEnCours),
          })
            .then((res) => res.json())
            .then((data) => {
              dispatch(modifierProduit(data));
              setProduitEnCours(null);
          })
          .catch((err) => console.error(err));
    }


    // Fonction de suppression d'un produit (DELETE)
    const handleSupprimerProduit = (id) => {
        fetch(`http://127.0.0.1:8000/api/produits/${id}`, {
            method: 'DELETE',
        })
        .then((res) => {
          if (res.ok) {
            dispatch(supprimerProduit(id));
          } else {
            throw new Error("Erreur lors de la suppression.");
          }
        })
        .catch((err) => console.error(err));
    };
    
        return (
            <div>
                <h1>Liste des Produits</h1>
                <form onSubmit={handleAjouterProduit}>
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
                    <input
                        type="number"
                        value={prix}
                        onChange={(e) => {
                            // Récupérer la valeur saisie
                            const valeur = parseFloat(e.target.value);
                            // On empêche la saisie de valeur négative
                            if (valeur >= 0) {
                                setPrix(valeur);
                            }
                        }}
                        required
                    />
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
                      {/* <th>Catégorie</th> */}
                      <th>Modifier/Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produits.map((produit) => (
                      <tr key={produit.id}>
                        <td>{produit.nom}</td>
                        <td>{produit.description}</td>
                        <td>{produit.prix}</td>
                        <td>
                        <button onClick={() => setProduitEnCours(produit)}>Modifier</button>
                            <button onClick={() => handleSupprimerProduit(produit.id)}>Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                  {produitEnCours && (
                    <form onSubmit={handleModifierProduit}>
                        <h2>Modifier le produit</h2>
                        {/* Champ pour modifier le nom du produit  */}
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