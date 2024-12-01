<?php

namespace App\Entity;

use App\Repository\ProduitsRepository;
// Gestion des relations
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitsRepository::class)]
class Produits
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $prix = null;

    #[ORM\Column(length: 255)]
    private ?string $date_de_création = null;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDateDeCreation(): ?string
    {
        return $this->date_de_création;
    }

    public function setDateDeCreation(string $date_de_création): static
    {
        $this->date_de_création = $date_de_création;
        return $this;
    }
    // Relations n à 1 reliée à Categorie : 
    // Chaque produit appartient à une seule catégorie
    #[ORM\ManyToOne(targetEntity: Categories::class, inversedBy: 'produits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Categories $categorieRelation = null;

    // Getter et Setter pour la relation ManyToOne
    public function getCategorieRelation(): ?Categories
    {
        return $this->categorieRelation;
    }

    public function setCategorieRelation(?Categories $categorie): self
    {
        $this->categorieRelation = $categorie;
        return $this;
    }
}
