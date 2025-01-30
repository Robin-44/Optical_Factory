const mongoose = require('mongoose');
const { Client, Commande, Monture, Verre, Prescription } = require('../models-mongodb/models');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://Sullivan:SullivanSextius@cluster0.9anvx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Fonction pour insérer les données
async function insertData() {
  try {
    // Effacer les collections existantes (optionnel)
    await Client.deleteMany({});
    await Commande.deleteMany({});
    await Monture.deleteMany({});
    await Verre.deleteMany({});
    await Prescription.deleteMany({});

    // Étape 1: Insérer des clients
    const clients = await Client.insertMany([
      {
        Nom: 'Doe',
        Prenom: 'John',
        Date_Naissance: new Date('1990-01-01'),
        Genre: 'Homme',
        Ville: 'Paris',
        Code_Postal: '75001',
        Pays: 'France',
        Adresse: '123 Rue Exemple',
        Email: 'john.doe@example.com',
        Telephone: '+33 123456789',
        Frequence_Achat: 'Mensuelle',
        Mode_Paiement_Favori: 'Carte bancaire',
        Preferences_Communication: 'Email',
        Retours: 0
      },
      {
        Nom: 'Sullivan',
        Prenom: 'Sextius',
        Date_Naissance: new Date('1985-03-21'),
        Genre: 'Homme',
        Ville: 'Lyon',
        Code_Postal: '69001',
        Pays: 'France',
        Adresse: '45 Avenue Victor Hugo',
        Email: 'sullivan.sextius@gmail.com',
        Telephone: '+33 987654321',
        Frequence_Achat: 'Annuelle',
        Mode_Paiement_Favori: 'Virement bancaire',
        Preferences_Communication: 'SMS',
        Retours: 1
      }
    ]);
    console.log('Clients insérés avec succès');

    // Étape 2: Insérer des montures
    const montures = await Monture.insertMany([
      {
        Marque: 'Ray-Ban',
        Modele: 'RB1234',
        Type: 'Optique',
        Forme: 'Ronde',
        Materiau: 'Acier inoxydable',
        Couleur: 'Noir',
        Taille: 'Medium',
        Prix: 80.00,
        Style: 'Classique',
        Stock: 100
      },
      {
        Marque: 'Oakley',
        Modele: 'OAK5678',
        Type: 'Solaire',
        Forme: 'Carrée',
        Materiau: 'Plastique',
        Couleur: 'Gris',
        Taille: 'Large',
        Prix: 120.00,
        Style: 'Sportif',
        Stock: 50
      }
    ]);
    console.log('Montures insérées avec succès');

    // Étape 3: Insérer des verres
    const verres = await Verre.insertMany([
      {
        Type: 'Unifocal',
        Indice_Refraction: 1.5,
        Traitements: 'Anti-reflet, Anti-rayures',
        Teinte: 'Gris',
        Compatibilite: 'Lunettes de soleil',
        Prix: 50.00,
        Stock: 200,
        Categorie_Protection: 'UV',
        Securite: 'Verre résistant',
        Solaire: false
      },
      {
        Type: 'Progressif',
        Indice_Refraction: 1.6,
        Traitements: 'Anti-reflet, UV',
        Teinte: 'Brun',
        Compatibilite: 'Lunettes de vue',
        Prix: 150.00,
        Stock: 150,
        Categorie_Protection: 'Anti-lumière bleue',
        Securite: 'Verre renforcé',
        Solaire: false
      }
    ]);
    console.log('Verres insérés avec succès');

    // Étape 4: Insérer des prescriptions
    const prescriptions = await Prescription.insertMany([
      {
        Client_ID: clients[0]._id, // Associe à l'utilisateur John
        Sphere_OD: -2.00,
        Sphere_OG: -2.00,
        Cylindre_OD: -1.00,
        Cylindre_OG: -1.00,
        Axe_OD: 90,
        Axe_OG: 90,
        Addition: 0.75,
        PD: 62.5,
        Pathologies: 'Myopie',
        Type_Verre: 'Unifocal',
        Restrictions: 'Aucune'
      },
      {
        Client_ID: clients[1]._id, // Associe à l'utilisateur Sullivan
        Sphere_OD: -1.50,
        Sphere_OG: -1.50,
        Cylindre_OD: -0.50,
        Cylindre_OG: -0.50,
        Axe_OD: 85,
        Axe_OG: 85,
        Addition: 0.75,
        PD: 63.0,
        Pathologies: 'Presbytie',
        Type_Verre: 'Progressif',
        Restrictions: 'Aucune'
      }
    ]);
    console.log('Prescriptions insérées avec succès');

    // Étape 5: Insérer des commandes
    const commandes = await Commande.insertMany([
      {
        Client_ID: clients[0]._id, // Associe à l'utilisateur John
        Verre_ID: verres[0]._id, // Associe au Verre Unifocal
        Monture_ID: montures[0]._id, // Associe à la Monture Ray-Ban
        Date_Commande: new Date(),
        Statut: 'Livré',
        Montant_Total: 100.00,
        Methode_Paiement: 'Carte bancaire',
        Adresse_Livraison: '123 Rue Livraison, Paris',
        Canal: 'En ligne'
      },
      {
        Client_ID: clients[1]._id, // Associe à l'utilisateur Sullivan
        Verre_ID: verres[1]._id, // Associe au Verre Progressif
        Monture_ID: montures[1]._id, // Associe à la Monture Oakley
        Date_Commande: new Date(),
        Statut: 'En cours',
        Montant_Total: 170.00,
        Methode_Paiement: 'Virement bancaire',
        Adresse_Livraison: '45 Avenue Livraison, Lyon',
        Canal: 'Magasin'
      }
    ]);
    console.log('Commandes insérées avec succès');

  } catch (error) {
    console.error('Erreur lors de l\'insertion des données:', error);
  } finally {
    mongoose.connection.close(); // Fermer la connexion
  }
}

// Lancer l'insertion des données
insertData();
