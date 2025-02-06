const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modèle Client
const clientSchema = new Schema({
  Nom: { type: String, required: true },
  Prenom: { type: String, required: true },
  Date_Naissance: { type: Date, required: true },
  Genre: { type: String },
  Ville: { type: String },
  Code_Postal: { type: String },
  Sub: { type: String },
  Pays: { type: String },
  Adresse: { type: String },
  Email: { type: String, required: true, unique: true },
  Telephone: { type: String },
  Frequence_Achat: { type: String },
  Mode_Paiement_Favori: { type: String },
  Preferences_Communication: { type: String },
  Retours: { type: Number, default: 0 }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

// Modèle Verre
const verreSchema = new Schema({
  Type: { type: String },
  Indice_Refraction: { type: Number },
  Traitements: { type: String },
  Teinte: { type: String },
  Compatibilite: { type: String },
  Prix: { type: Number },
  Stock: { type: Number },
  Categorie_Protection: { type: String },
  Securite: { type: String },
  Solaire: { type: Boolean }
}, { timestamps: true });

const Verre = mongoose.model('Verre', verreSchema);

const montureSchema = new Schema({
  Marque: { type: String, required: true },
  Modele: { type: String, required: true },
  Type: { type: String, required: true },
  Forme: { type: String },
  Materiau: { type: String },
  Couleur: { type: String },
  Taille: { type: String },
  img: { type: String },
  Prix: { type: Number },
  Style: { type: String },
  Stock: { type: Number },
  selected: [{ type: String }], // Ex: ['tendance', 'optician', 'best_sales']
  Verre_ID: { type: String, ref: 'Verre' }, // Association avec un verre

  // Nouveaux champs en fonction des colonnes que tu as envoyées
  Indice_Refraction: { type: Number }, // Indice de réfraction du verre
  Traitements: { type: String }, // Traitements spécifiques (anti-reflet, etc.)
  Teinte: { type: String }, // Teinte des verres
  Compatibilite: { type: String }, // Compatibilité (ex : visière, lunettes de soleil, etc.)
  Categorie_Protection: { type: String }, // Catégorie de protection (ex : UV, anti-lumière bleue, etc.)
  Securite: { type: String }, // Sécurité des verres (ex : antichoc, etc.)
  Solaire: { type: Boolean }, // Si la monture est solaire (oui/non)
  Modele_Monture: { type: String }, // Modèle de la monture
}, { timestamps: true });

const Monture = mongoose.model('Monture', montureSchema);

// Modèle Commande
const commandeSchema = new Schema({
  Client_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  Verre_ID: { type: String, ref: 'Verre', required: true },
  Monture_ID: { type: String, ref: 'Monture', required: false },
  Date_Commande: { type: Date, required: true },
  Statut: { type: String, required: true }, // Ex: 'En cours', 'Livrée'
  Montant_Total: { type: Number, required: true },
  Methode_Paiement: { type: String },
  Adresse_Livraison: { type: String },
  Canal: { type: String } // Ex: 'En ligne', 'Magasin'
}, { timestamps: true });

const Commande = mongoose.model('Commande', commandeSchema);

const prescriptionSchema = new Schema({
  Client_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

  // Correction de la prescripton pour l'œil droit (OD) et l'œil gauche (OG)
  Sphere_OD: { type: Number }, // Sphère œil droit
  Sphere_OG: { type: Number }, // Sphère œil gauche
  Cylindre_OD: { type: Number }, // Cylindre œil droit
  Cylindre_OG: { type: Number }, // Cylindre œil gauche
  Axe_OD: { type: Number }, // Axe œil droit
  Axe_OG: { type: Number }, // Axe œil gauche
  Addition: { type: Number }, // Addition pour presbytes
  PD: { type: Number }, // Distance pupillaire

  // Ajout des champs qui n'étaient pas explicitement mentionnés :
  Pathologies: { type: String }, // Pathologies associées à la prescription
  Type_Verre: { type: String }, // Type de verre prescrit (ex : simple vision, progressif, etc.)
  Restrictions: { type: String }, // Restrictions sur les verres (ex : pas de verres de soleil, etc.)

  // Champs additionnels que tu pourrais envisager
  Date_Prescription: { type: Date }, // Date à laquelle la prescription a été établie
  Validite_Prescription: { type: Date }, // Date de validité de la prescription
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Modèle Panier (Basket)
const basketSchema = new Schema({
  Client_ID: { 
    type: mongoose.Schema.Types.ObjectId , 
    ref: 'Client', 
    required: true 
  },
  Monture_ID: {
    type: mongoose.Schema.Types.String,
    ref: 'Monture',
    required: true
  },
  Quantity: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
}, { timestamps: true });  // Enregistre les timestamps de création et de mise à jour automatiquement

const Basket = mongoose.model('Basket', basketSchema);


module.exports = {
  Basket,
  Client,
  Commande,
  Monture,
  Verre,
  Prescription
};
