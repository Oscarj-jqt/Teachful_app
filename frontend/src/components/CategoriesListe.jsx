import { React, useEffect, useState } from "react";
// hook redux pour la gestion des données
import { useDispatch, useSelector } from "react-redux";
import { ajouterCategorie, modifierCategorie, supprimerCategorie } from "../redux/reducers/categoriesReducer";

function CategoriesListe() {

    const dispatch = useDispatch();
    // useSelector pour récupérer les catégories depuis l'état global de Redux (pas useState)
    const categories = useSelector((state) => state.categories.categories);

    // état pour les attributs
    const [nom, setNom] = useState("");
    // État pour la catégorie en cours de modification
    const [categorieEnCours, setCategorieEnCours] = useState(null);

    // chargement de la liste dès le lancement de l'app
    useEffect(() => {
    // récupération des données des catégories
    fetch('http://127.0.0.1:8000/api/categories')
        .then((res) => res.json())
        .then((data) => {
            // Envoi de l'action Redux pour stocker les catégories dans le store
            data.forEach(categorie => dispatch(ajouterCategorie(categorie)));
        })
        .catch((err) => console.error('Erreur dans la récupération des données', err));
    }, [dispatch]);

    // Fonction d'ajout d'une nouvelle catégorie
    const ajoutCategorie = (e) => {
        e.preventDefault();
    
        const nouvelleCategorie = { nom: nom };

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
            // Action avec Redux
            dispatch(ajouterCategorie(data));
            setNom("");
        })
        .catch((err) => console.error(err));

    };

    // Fonction de modification d'une catégorie
    const handleModifierCategorie = (e) => {
        e.preventDefault();

        const changeCategorie = { nom: categorieEnCours.nom };


        fetch(`http://127.0.0.1:8000/api/categories/${categorieEnCours.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changeCategorie),
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch(modifierCategorie(data)); // Envoi de l'action Redux
            setCategorieEnCours(null);
        })
        .catch((err) => console.error(err));
    };

    // Fonction pour préparer la modification d'une catégorie
    const handleModifierClick = (categorie) => {
        setCategorieEnCours(categorie);
    };

    // Fonction pour supprimer une catégorie
    const handleSupprimerCategorie = (id) => {
        // Appel de la méthode delete pour la suppression
        fetch(`http://127.0.0.1:8000/api/categories/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    // Appel action redux pour supprimer la catégorie
                    dispatch(supprimerCategorie(id));
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
                    <button onClick={() => handleModifierClick(categorie)}>Modifier</button>
                    </li>
                ))}
            </ul>

            {/* Formulaire pour modifier une catégorie */}
            {categorieEnCours && (
                <form onSubmit={handleModifierCategorie}>
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
                        <button onClick={() => handleModifierClick(categorie)}>Modifier</button>
                        <button onClick={() => handleSupprimerCategorie(categorie.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesListe;
