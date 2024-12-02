import { React, useEffect, useState } from "react";
import { fetchCategories } from "../api";

function CategoriesListe() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
  }, []);

  return (
    <div>
      <h1>Liste des Catégories</h1>
        <ul>
          {categories.map((categorie) => (
            <li key={categorie.id}>{categorie.nom}</li>
          ))}
        </ul>
    </div>
  );
}

export default CategoriesListe;
