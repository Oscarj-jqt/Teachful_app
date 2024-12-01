import { React, useEffect, useState } from "react";

function CategoriesListe() {

    // initialisation de l'état d'affichage (tableau categories)
    const [categories, setCategories] = useState([]);

    // état pour les attributs
    const [nom, setNom] = useState("");

    // État pour la catégorie en cours de modification
    const [categorieEnCours, setCategorieEnCours] = useState(null);

    // chargement de la liste dès le lancement de l'app
    useEffect(() => {
    // récupération des données des catégories
    fetch('http://127.0.0.1:8000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Erreur dans la récupération des données', err));
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
            // on réinitialise l'état de l'input
            setNom("");
        })
        .catch((err) => console.error(err));

    };

    // Fonction de modification d'une catégorie
    const modifierCategorie = (e) => {
        e.preventDefault();

        const changeCategorie = {
            nom: categorieEnCours.nom,
        };


        fetch(`http://127.0.0.1:8000/api/categories/${categorieEnCours.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(changeCategorie),
        })
        .then((res) => res.json())
        .then((data) => {
            // màj de la liste après la modification
            setCategories((prevCategories) =>
                prevCategories.map((categorie) =>
                    categorie.id === data.id ? data : categorie
                )
            );
            setCategorieEnCours(null);
        })
        .catch((err) => console.error(err));
    };

    // Fonction pour préparer la modification d'une catégorie
    const modifierClick = (categorie) => {
        setCategorieEnCours(categorie);
    };

    // Fonction pour supprimer une catégorie
    const supprimerCategorie = (id) => {
        // Appel de la méthode delete pour la suppression
        fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                // La liste se met à jour après une suppression réussie
                setCategories(categories.filter((categorie) => categorie.id !== id));
            } else {
                console.error("Erreur de suppression de la catégorie");
            }
        })
        .catch((err) => console.error("Erreur dans la tentative de suppression de la catégorie :", err));
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
                    <li key={categorie.id}>{categorie.nom}
                    <button onClick={() => modifierClick(categorie)}>Modifier</button>
                    </li>
                ))}
            </ul>

            {/* Formulaire pour modifier une catégorie */}
            {categorieEnCours && (
                <form onSubmit={modifierCategorie}>
                    <h2>Modifier la catégorie</h2>
                    <input type="text" value={categorieEnCours.nom} onChange={(e) =>
                        // Mise à jour de l'état de la catégorie en cours (modification du nom)
                            setCategorieEnCours({...categorieEnCours,nom: e.target.value,})
                    }   
                    required/>
                    <button type="submit">Modifier</button>
                    <button onClick={() => setCategorieEnCours(null)}>Annuler</button>
                </form>
            )}

            {/* Liste des catégories avec un bouton de suppression et de modification */}
            <ul>
                {categories.map((categorie) => (
                    <li key={categorie.id}>
                        {categorie.nom}
                        <button onClick={() => modifierClick(categorie)}>Modifier</button>
                        <button onClick={() => supprimerCategorie(categorie.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesListe;
