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
    #[Assert\NotBlank(message: "Le nom est obligatoire.")]
    #[Assert\Length(
        max: 255,
        maxMessage: "Le nom ne peut pas être au-dessus de 255 caractères."
    )]
    private ?string $nom = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(
        max: 255,
        maxMessage: "La description ne peut pas être au-dessus de caractères."
    )]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le prix est obligatoire.")]
    #[Assert\Regex(
        pattern: "/^\d+(\.\d{1,2})?$/",
        message: "Le prix doit être un nombre avec 2 chiffres maximales après la virgule."
    )]
    private ?string $prix = null;


    #[ORM\Column(type: "datetime")]
    #[Assert\NotBlank(message: "La date est obligatoire.")]
    #[Assert\Type("\DateTimeInterface", message: "Renseignez une date valide.")]
    private ?\DateTimeInterface $dateDeCreation = null;


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
        return $this->date_de_creation;
    }

    public function setDateDeCreation(string $date_de_creation): static
    {
        $this->date_de_creation = $date_de_creation;
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
