<?php

namespace App\Entity;

use App\Repository\CategoriesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
class Categories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    // Vérifie si le champ est vide
    #[Assert\NotBlank(message: "Le nom de la catégorie est obligatoire.")]
    #[Assert\Length(
        max: 255,
        maxMessage: "Le nom de la catégorie ne peut pas être au-dessus de 255 caractères."
    )]
    #[Assert\Regex(
        pattern: "/^[a-zA-Z0-9\s\-]+$/",
        message: "Le nom de la catégorie contient des caractères invalides."
    )]
    private ?string $nom = null;

    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    // Relation 1 à n reliée à Produits :
    // Chaque catégorie peut contenir plusieurs produits

    // création d'une collection
    #[ORM\OneToMany(mappedBy: 'categorie', targetEntity: Produits::class)]
    private Collection $produits;

    public function __construct()
    {
        $this->produits = new ArrayCollection();
    }

    // Les getters et setters de Categories

    // Getter pour les produits liés à la catégorie
    public function getProduits(): Collection
    {
        return $this->produits;
    }
}
