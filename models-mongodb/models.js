const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma de la collection Clients
const clientSchema = new Schema({
  Nom: { type: String, required: true },
  Prenom: { type: String, required: true },
  Date_Naissance: { type: Date, required: true },
  Genre: { type: String },
  Ville: { type: String },
  Code_Postal: { type: String },
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

// Définir le schéma de la collection Commandes
const commandeSchema = new Schema({
  Client_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  Verre_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Verre', required: true },
  Monture_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Monture', required: true },
  Date_Commande: { type: Date, required: true },
  Statut: { type: String, required: true },
  Montant_Total: { type: Number, required: true },
  Methode_Paiement: { type: String },
  Adresse_Livraison: { type: String },
  Canal: { type: String }
}, { timestamps: true });

const Commande = mongoose.model('Commande', commandeSchema);

// Définir le schéma de la collection Produits_Montures
const montureSchema = new Schema({
  Marque: { type: String },
  Modele: { type: String },
  Type: { type: String },
  Forme: { type: String },
  Materiau: { type: String },
  Couleur: { type: String },
  Taille: { type: String },
  Prix: { type: Number },
  Style: { type: String },
  Stock: { type: Number }
}, { timestamps: true });

const Monture = mongoose.model('Monture', montureSchema);

// Définir le schéma de la collection Produits_Verres
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

// Définir le schéma de la collection Prescriptions
const prescriptionSchema = new Schema({
  Client_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  Sphere_OD: { type: Number },
  Sphere_OG: { type: Number },
  Cylindre_OD: { type: Number },
  Cylindre_OG: { type: Number },
  Axe_OD: { type: Number },
  Axe_OG: { type: Number },
  Addition: { type: Number },
  PD: { type: Number },
  Pathologies: { type: String },
  Type_Verre: { type: String },
  Restrictions: { type: String }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = {
  Client,
  Commande,
  Monture,
  Verre,
  Prescription
};
