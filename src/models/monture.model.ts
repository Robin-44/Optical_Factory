export interface Monture {
  _id?: string; // ID optionnel (peut être généré par la base de données)
  Marque: string; // Marque de la monture (ex: Persol)
  Modele: string; // Modèle de la monture
  Type: string; // Type de monture (Cerclee, etc.)
  Forme: string; // Forme de la monture (Aviateur, etc.)
  Materiau: string; // Matériau de fabrication (Plastique, Métal, etc.)
  Couleur: string; // Couleur de la monture
  Taille: string; // Taille de la monture (ex: 57-18-141)
  img: string; // URL ou chemin de l'image associée
  Prix: number; // Prix de la monture
  Style: string; // Style (ex: Business)
  Stock: number; // Nombre d'articles en stock
  selected?: string[]; // Tags ou catégories sélectionnées (ex: ["tendance"])
  Verre_ID?: string; // ID du verre associé (référence)
  Indice_Refraction?: number; // Indice de réfraction du verre
  Traitements?: string; // Traitement appliqué aux verres (ex: Anti-reflet)
  Teinte?: string; // Teinte des verres (ex: Grise)
  Compatibilite?: string; // Compatibilité des verres (ex: Lunettes de soleil)
  Categorie_Protection?: string; // Catégorie de protection UV
  Securite?: string; // Sécurité (ex: Antichoc)
  Solaire: boolean; // Indique si la monture est solaire ou non
  Modele_Monture: string; // Modèle complet avec la marque
  createdAt?: string; // Date de création (optionnel)
  updatedAt?: string; // Date de mise à jour (optionnel)
  test: string; // Champ supplémentaire (peut être précisé)
}
