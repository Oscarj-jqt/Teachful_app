import { React, useEffect, useState } from "react";
import { fetchProduits } from "../api";

function ProduitsListe() {
    const [produits, setProduits] = useState([]);

        // Au chargement de la page on va charger les produits
        useEffect(() => {
            fetchProduits()
            .then((data) => setProduits(data));
        }, []);


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