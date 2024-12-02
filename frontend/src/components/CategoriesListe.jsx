import { React, useEffect, useState } from "react";


function CategoriesListe() {
    // initialisation de l'état d'affichage (tableau categories)
    const [categories, setCategories] = useState([]);

    // état pour les attributs
    const [nom, setNom] = useState("");

    useEffect(() => {
    // récupération des données des catégories
    fetch('http://127.0.0.1:8000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
    }, []);

    // Fonction d'ajout d'une nouvelle catégorie
    const ajoutCategorie = (e) => {
        e.preventDefault();
    
        const nouvelleCategorie = {
          nom: nom,
        };

    // Envoie de la requête API pour ajouter la catégorie
    fetch("http://127.0.0.1:8000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nouvelleCategorie),

    })
        .then((res) => res.json())
        .then((data) => {
            // Màj de la liste des catégories
            setCategories((prevCategories) => [...prevCategories, data]);
            setNom("");
        })
        .catch((err) => console.error(err));

};

  return (
    <div>
      <h1>Liste des Catégories</h1>

      {/* Formulaire pour ajouter une catégorie */}
      <form onSubmit={ajoutCategorie}>
        <div>
          <label>Nom de la catégorie</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required/>
        </div>
        <button type="submit">Ajouter la catégorie</button>
      </form>

        <ul>
          {categories.map((categorie) => (
            <li key={categorie.id}>{categorie.nom}</li>
          ))}
        </ul>
    </div>
  );
}

export default CategoriesListe;
