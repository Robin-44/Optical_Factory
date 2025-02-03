const mongoose = require('mongoose');
const { Client, Commande, Monture, Verre, Prescription } = require('../models-mongodb/models');

// Connexion à MongoDB
const uri = "mongodb+srv://sullivansextius:T1vcZx08zLzE0pVr@cluster0.hlc6i.mongodb.net/optical-factory?retryWrites=true&w=majority&appName=Cluster0";

  async function insertData() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

    await Client.deleteMany({});
    await Commande.deleteMany({});
    await Prescription.deleteMany({});
    await Monture.deleteMany({});
    await Verre.deleteMany({});
  
    // Étape 1: Insérer les verres
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
  
    // Récupérer les IDs des verres
    const verreUnifocal = verres[0]._id;
    const verreProgressif = verres[1]._id;
  
   // Étape 2: Insérer les montures avec les images associées
const montures = await Monture.insertMany([
    {
      Marque: 'Ray-Ban',
      Modele: 'RB1234',
      Type: 'Optique',
      Forme: 'Ronde',
      Materiau: 'Acier inoxydable',
      Couleur: 'Noir',
      Taille: 'Medium',
      img: 'assets/glasses/sunset-1283872_1280.jpg',
      Prix: 80.00,
      Style: 'Classique',
      Stock: 100,
      selected: ['tendance', 'optician', 'best_sales'],
      Verre_ID: verreUnifocal
    },
    {
      Marque: 'Oakley',
      Modele: 'OAK5678',
      Type: 'Solaire',
      Forme: 'Carrée',
      Materiau: 'Plastique',
      Couleur: 'Gris',
      Taille: 'Large',
      img: 'assets/glasses/redowan-dhrubo-ZEsqOdCngzl-unsplash.jpg',
      Prix: 120.00,
      Style: 'Sportif',
      Stock: 50,
      selected: ['tendance', 'optician', 'best_sales'],
      Verre_ID: verreProgressif
    },
    {
      Marque: 'Gucci',
      Modele: 'GUC2024',
      Type: 'Solaire',
      Forme: 'Aviateur',
      Materiau: 'Métal',
      Couleur: 'Doré',
      Taille: 'Medium',
      img: 'assets/glasses/kiran-ck-ISI94SZHRgA-unsplash.jpg',
      Prix: 199.99,
      Style: 'Luxe',
      Stock: 30,
      selected: ['tendance'],
      Verre_ID: verreProgressif
    },
    {
      Marque: 'Chanel',
      Modele: 'CH123',
      Type: 'Optique',
      Forme: 'Papillon',
      Materiau: 'Acétate',
      Couleur: 'Noir',
      Taille: 'Large',
      img: 'assets/glasses/redowan-dhrubo-OWfBsDDOUIQ-unsplash.jpg',
      Prix: 249.99,
      Style: 'Élégant',
      Stock: 20,
      selected: ['optician'],
      Verre_ID: verreUnifocal
    },
    {
      Marque: 'Dior',
      Modele: 'DIOR001',
      Type: 'Solaire',
      Forme: 'Ronde',
      Materiau: 'Métal',
      Couleur: 'Argent',
      Taille: 'Medium',
      img: 'assets/glasses/anton-be-ODhxNCO8XHY-unsplash.jpg',
      Prix: 179.99,
      Style: 'Fashion',
      Stock: 25,
      selected: ['best_sales'],
      Verre_ID: verreProgressif
    },
    {
      Marque: 'Prada',
      Modele: 'PR2025',
      Type: 'Solaire',
      Forme: 'Carrée',
      Materiau: 'Plastique',
      Couleur: 'Marron',
      Taille: 'Large',
      img: 'assets/glasses/pexels-stephendn-131018.jpg',
      Prix: 159.99,
      Style: 'Chic',
      Stock: 35,
      selected: ['optician'],
      Verre_ID: verreUnifocal
    },
    {
      Marque: 'Versace',
      Modele: 'VS7890',
      Type: 'Solaire',
      Forme: 'Rectangulaire',
      Materiau: 'Acétate',
      Couleur: 'Noir',
      Taille: 'Medium',
      img: 'assets/glasses/bartosz-sujkowski-uxzWfwOlyT8-unsplash.jpg',
      Prix: 229.99,
      Style: 'Luxe',
      Stock: 15,
      selected: ['optician'],
      Verre_ID: verreProgressif
    },
    {
      Marque: 'Hugo Boss',
      Modele: 'HB567',
      Type: 'Optique',
      Forme: 'Carrée',
      Materiau: 'Métal',
      Couleur: 'Gris',
      Taille: 'Large',
      img: 'assets/glasses/eyekeeper-eyekeeper-VtFvDYh7Qvc-unsplash.jpg',
      Prix: 199.99,
      Style: 'Business',
      Stock: 40,
      selected: ['best_sales'],
      Verre_ID: verreUnifocal
    },
    {
      Marque: 'Police',
      Modele: 'POL9876',
      Type: 'Solaire',
      Forme: 'Carrée',
      Materiau: 'Plastique',
      Couleur: 'Bleu',
      Taille: 'Large',
      img: 'assets/glasses/eyekeeper-eyekeeper-cyQtE01nvxw-unsplash.jpg',
      Prix: 149.99,
      Style: 'Audacieux',
      Stock: 45,
      selected: ['best_sales'],
      Verre_ID: verreProgressif
    }
  ]);
  
  console.log('Montures insérées avec succès');
  
  
    // Étape 3: Insérer des clients
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

    const commandes = [];

    const statusOptions = ['En cours', 'Livrée', 'Annulée'];
    const paymentMethods = ['Carte bancaire', 'Virement bancaire', 'Paypal', 'Espèces'];
    const canals = ['En ligne', 'Magasin'];

    // Générer 10 commandes pour chaque client
    clients.forEach(client => {
    for (let i = 0; i < 10; i++) {
        const randomMonture = montures[Math.floor(Math.random() * montures.length)];
        const verreAssocie = randomMonture.Verre_ID; // Associer un verre en fonction de la monture

        commandes.push({
        Client_ID: client._id,
        Verre_ID: verreAssocie,
        Monture_ID: randomMonture._id,
        Date_Commande: new Date(),
        Statut: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        Montant_Total: (randomMonture.Prix + 50).toFixed(2), // Prix de la monture + 50 pour le verre
        Methode_Paiement: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        Adresse_Livraison: `${Math.floor(Math.random() * 100)} Rue Exemple, Ville${Math.floor(Math.random() * 10)}`,
        Canal: canals[Math.floor(Math.random() * canals.length)]
        });
    }
    });

    await Commande.insertMany(commandes);
    console.log('Commandes insérées avec succès');
    // Étape 5: Insérer des prescriptions
    const prescriptions = [];

    const pathologiesOptions = ['Myopie', 'Hypermétropie', 'Astigmatisme', 'Presbytie'];
    const typeVerreOptions = ['Unifocal', 'Progressif'];
    const restrictionsOptions = ['Aucune', 'Port en continu', 'Utilisation de nuit déconseillée'];

    clients.forEach(client => {
    for (let i = 0; i < 10; i++) {
        prescriptions.push({
        Client_ID: client._id,
        Sphere_OD: (Math.random() * -4).toFixed(2), // Valeurs négatives pour la myopie
        Sphere_OG: (Math.random() * -4).toFixed(2),
        Cylindre_OD: (Math.random() * -2).toFixed(2),
        Cylindre_OG: (Math.random() * -2).toFixed(2),
        Axe_OD: Math.floor(Math.random() * 180), // Axe entre 0 et 180°
        Axe_OG: Math.floor(Math.random() * 180),
        Addition: (Math.random() * 3).toFixed(2), // Addition entre 0 et 3
        PD: Math.floor(Math.random() * (70 - 55 + 1)) + 55, // PD entre 55 et 70
        Pathologies: pathologiesOptions[Math.floor(Math.random() * pathologiesOptions.length)],
        Type_Verre: typeVerreOptions[Math.floor(Math.random() * typeVerreOptions.length)],
        Restrictions: restrictionsOptions[Math.floor(Math.random() * restrictionsOptions.length)]
        });
    }
    });

    await Prescription.insertMany(prescriptions);
    console.log('Prescriptions insérées avec succès');

    console.log('Prescriptions insérées avec succès');
  
    mongoose.connection.close();
  }
  


  insertData()