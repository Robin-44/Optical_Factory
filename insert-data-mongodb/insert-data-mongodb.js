const mongoose = require('mongoose');
const { Client, Commande, Monture, Verre, Prescription, Basket} = require('../models-mongodb/models');

// Connexion à MongoDB
const uri = "mongodb+srv://sullivansextius:T1vcZx08zLzE0pVr@cluster0.hlc6i.mongodb.net/optical-factory?retryWrites=true&w=majority&appName=Cluster0";

  async function insertData() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));
    await Prescription.deleteMany({});
    await Monture.deleteMany({});
    await Verre.deleteMany({});
    await Client.deleteMany({});
    await Commande.deleteMany({});
    await Basket.deleteMany({});
    
  
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

    const sigle_monture_selected = ["tendance","best_sales","selection_optician"]
   // Étape 2: Insérer les montures avec les images associées
   const  montures = await Monture.insertMany([
    {
      "Monture_ID": "MON1",
      "Marque": "Persol",
      "Modele": "XV166",
      "Type": "Cerclee",
      "Forme": "Aviateur",
      "Materiau": "Plastique",
      "Couleur": "Ecaille",
      "Taille": "57-18-141",
      "img": "assets/home/products/bartosz-sujkowski-uxzWfwOIyT8-unsplash.jpg",
      "Prix": 116.66,
      "Style": "Business",
      "Stock": 35,
      "selected": sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Persol XV166"
    },
    {
      "Monture_ID": "MON2",
      "Marque": "Ray-Ban",
      "Modele": "MG056",
      "Type": "Cerclee",
      "Forme": "Ronde",
      "Materiau": "Metal",
      "Couleur": "Transparent",
      "Taille": "50-16-143",
      "img": "assets/home/products/bartosz-sujkowski-uxzWfwOIyT8-unsplash.jpg",
      "Prix": 488.54,
      "Style": "Luxe",
      "Stock": 7,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Ray-Ban MG056"
    },{
      "Monture_ID": "MON217",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/sunset-1283872_1280.jpg",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON27",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/sunset-1283872_1280.jpg",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON30",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/sunset-1283872_1280.jpg",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON3",
      "Marque": "Ray-Ban",
      "Modele": "Eg365",
      "Type": "Semi-cerclee",
      "Forme": "Aviateur",
      "Materiau": "Plastique",
      "Couleur": "Dore",
      "Taille": "55-19-134",
      "img": "assets/home/products/eyekeeper-eyekeeper-cyQtEO1nvxw-unsplash.jpg",
      "Prix": 77.53,
      "Style": "Luxe",
      "Stock": 28,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Ray-Ban Eg365"
    },
    {
      "Monture_ID": "MON4",
      "Marque": "Persol",
      "Modele": "lo036",
      "Type": "Invisible",
      "Forme": "Aviateur",
      "Materiau": "Plastique",
      "Couleur": "Ecaille",
      "Taille": "53-16-142",
      "img": "assets/home/products/ivan-cruz-tBMraRmwV_Q-unsplash.jpg",
      "Prix": 241.88,
      "Style": "Business",
      "Stock": 21,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Persol lo036"
    },
    {
      "Monture_ID": "MON5",
      "Marque": "Oakley",
      "Modele": "MX217",
      "Type": "Cerclee",
      "Forme": "Ronde",
      "Materiau": "Metal",
      "Couleur": "Ecaille",
      "Taille": "55-16-137",
      "img": "assets/home/products/redowan-dhrubo-G1pLuGcnqFw-unsplash.jpg",
      "Prix": 67.38,
      "Style": "Casual",
      "Stock": 48,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley MX217"
    },
    {
      "Monture_ID": "MON6",
      "Marque": "Ray-Ban",
      "Modele": "Iy710",
      "Type": "Invisible",
      "Forme": "Papillon",
      "Materiau": "Plastique",
      "Couleur": "Dore",
      "Taille": "52-16-150",
      "img": "assets/home/products/redowan-dhrubo-OWfBsDDOUlQ-unsplash.jpg",
      "Prix": 493.27,
      "Style": "Luxe",
      "Stock": 26,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Ray-Ban Iy710"
    },
    {
      "Monture_ID": "MON7",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/sunset-1283872_1280.jpg",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON7",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/sunset-1283872_1280.jpg",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON7",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/sunset-1283872_1280.jpg",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :"tendance",
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON7",
      "Marque": "Oakley",
      "Modele": "JJ920",
      "Type": "Cerclee",
      "Forme": "Rectangulaire",
      "Materiau": "Metal",
      "Couleur": "Argent",
      "Taille": "53-17-137",
      "img": "assets/home/products/fetchIA-glasses.png",
      "Prix": 390.29,
      "Style": "Casual",
      "Stock": 40,
      "selected" :"innovations",
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Oakley JJ920"
    },
    {
      "Monture_ID": "MON8",
      "Marque": "Ray-Ban",
      "Modele": "IV121",
      "Type": "Cerclee",
      "Forme": "Ronde",
      "Materiau": "Plastique",
      "Couleur": "Noir",
      "Taille": "60-15-132",
      "img": "assets/home/products/glasses-415256_1280.jpg",
      "Prix": 288.34,
      "Style": "Business",
      "Stock": 35,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Ray-Ban IV121"
    },
    {
      "Monture_ID": "MON9",
      "Marque": "Ray-Ban",
      "Modele": "dR175",
      "Type": "Cerclee",
      "Forme": "Aviateur",
      "Materiau": "Plastique",
      "Couleur": "Noir",
      "Taille": "51-16-144",
      "img": "assets/home/products/ivan-cruz-tBMraRmwV_Q-unsplash.jpg",
      "Prix": 484.42,
      "Style": "Casual",
      "Stock": 27,
      "selected" :sigle_monture_selected[Math.floor(Math.random() * sigle_monture_selected.length)],
      "Verre_ID": "verreUnifocal",
      "Indice_Refraction": 1.5,
      "Traitements": "Anti-reflet",
      "Teinte": "Grise",
      "Compatibilite": "Lunettes de soleil",
      "Categorie_Protection": "UV",
      "Securite": "Antichoc",
      "Solaire": true,
      "Modele_Monture": "Ray-Ban dR175"
    }
  ])
  
  
  console.log('Montures insérées avec succès');
  
  
  const clients = await Client.insertMany([
    {
      Nom: 'Guerin',
      Prenom: 'Emmanuel',
      Date_Naissance: new Date('2007-01-17'),
      Genre: 'Femme',
      Ville: 'Sainte Edouard',
      Code_Postal: '71773',
      Pays: 'France',
      Adresse: '910, chemin Renee Leclerc,26385 DelormeBourg',
      Email: 'isaacdijoux@example.org',
      Telephone: '488860055',
      Frequence_Achat: '365',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'Push',
      Retours: 4
    },
    {
      Nom: 'Bertrand',
      Prenom: 'Tristan',
      Date_Naissance: new Date('1979-10-15'),
      Genre: 'Femme',
      Ville: 'Saint Philippe-la-Foret',
      Code_Postal: '12434',
      Pays: 'France',
      Adresse: '23, boulevard Didier,37255 Guyon',
      Email: 'mariejacques@example.net',
      Telephone: '+33 (0)1 43 99 23 42',
      Frequence_Achat: '60',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'SMS',
      Retours: 1
    },
    {
      Nom: 'Laurent',
      Prenom: 'Francois',
      Date_Naissance: new Date('1997-03-18'),
      Genre: 'Femme',
      Ville: 'Saint Emilie',
      Code_Postal: '83325',
      Pays: 'France',
      Adresse: '529, boulevard Mendes,94865 Picard',
      Email: 'raymond41@example.org',
      Telephone: '02 37 22 07 79',
      Frequence_Achat: '365',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'Email',
      Retours: 1
    },
    {
      Nom: 'Bourdon',
      Prenom: 'Guillaume',
      Date_Naissance: new Date('1965-09-30'),
      Genre: 'Femme',
      Ville: 'Gimenez',
      Code_Postal: '29428',
      Pays: 'France',
      Adresse: '8, rue de Boulay,97121 Evrard',
      Email: 'lejeunemanon@example.org',
      Telephone: '+33 4 43 51 54 89',
      Frequence_Achat: '365',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'Email',
      Retours: 5
    },
    {
      Nom: 'Dias',
      Prenom: 'Marthe',
      Date_Naissance: new Date('1965-05-20'),
      Genre: 'Homme',
      Ville: 'Olivier',
      Code_Postal: '81854',
      Pays: 'France',
      Adresse: '69, boulevard Stephanie Vincent,40158 Faivre-sur-Faure',
      Email: 'antoinettechevallier@example.com',
      Telephone: '03 65 89 62 53',
      Frequence_Achat: '120',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'SMS',
      Retours: 5
    },
    {
      Nom: 'Gros',
      Prenom: 'Maryse',
      Date_Naissance: new Date('2001-04-25'),
      Genre: 'Homme',
      Ville: 'Dumas',
      Code_Postal: '54789',
      Pays: 'France',
      Adresse: '6, rue Nicolas Tessier,55981 Saint Noemi',
      Email: 'fontainefranck@example.com',
      Telephone: '534003478',
      Frequence_Achat: '365',
      Mode_Paiement_Favori: 'Virement',
      Preferences_Communication: 'Email',
      Retours: 3
    },
    {
      Nom: 'Pelletier',
      Prenom: 'Laure',
      Date_Naissance: new Date('1966-05-17'),
      Genre: 'Femme',
      Ville: 'Germain',
      Code_Postal: '64846',
      Pays: 'France',
      Adresse: '90, rue Da Silva,53636 Cousin',
      Email: 'fchretien@example.org',
      Telephone: '+33 3 60 08 97 22',
      Frequence_Achat: '30',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'Push',
      Retours: 2
    },
    {
      Nom: 'Blin',
      Prenom: 'Jacques',
      Date_Naissance: new Date('1972-03-14'),
      Genre: 'Homme',
      Ville: 'Saint Thibault-les-Bains',
      Code_Postal: '4330',
      Pays: 'France',
      Adresse: '49, rue de Fleury,28660 Saint Edouardnec',
      Email: 'brobin@example.com',
      Telephone: '+33 (0)5 87 99 08 58',
      Frequence_Achat: '60',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'Email',
      Retours: 2
    },
    {
      Nom: 'Merle',
      Prenom: 'Lorraine',
      Date_Naissance: new Date('1996-03-05'),
      Genre: 'Homme',
      Ville: 'Antoine',
      Code_Postal: '76289',
      Pays: 'France',
      Adresse: '86, rue de Arnaud,30397 Pages',
      Email: 'qribeiro@example.org',
      Telephone: '+33 5 82 04 71 65',
      Frequence_Achat: '120',
      Mode_Paiement_Favori: 'Virement',
      Preferences_Communication: 'Email',
      Retours: 0
    },
    {
      Nom: 'Leduc',
      Prenom: 'Colette',
      Date_Naissance: new Date('1991-08-03'),
      Genre: 'Homme',
      Ville: 'Barbier-la-Foret',
      Code_Postal: '47937',
      Pays: 'France',
      Adresse: '43, rue de Pierre,73165 Dupont',
      Email: 'eleonoredubois@example.com',
      Telephone: '02 69 36 08 10',
      Frequence_Achat: '365',
      Mode_Paiement_Favori: 'CB',
      Preferences_Communication: 'Push',
      Retours: 4
    },
    {
      Nom: 'Gillet',
      Prenom: 'Timothee',
      Date_Naissance: new Date('1948-07-03'),
      Genre: 'Homme',
      Ville: 'VasseurVille',
      Code_Postal: '34979',
      Pays: 'France',
      Adresse: '767, rue Moreno,55157 RaymondVille',
      Email: 'valentine79@example.net',
      Telephone: '04 43 08 76 08',
      Frequence_Achat: '30',
      Mode_Paiement_Favori: 'PayPal',
      Preferences_Communication: 'Email',
      Retours: 3
    },
    // Ajoutez ici les autres clients...
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
        Monture_ID: randomMonture.Monture_ID,
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


    const basket = await Basket.create({
      Client_ID:clients[0]._id,
      Monture_ID:montures[0]._id,
      Quantity: 10
    })

    await Basket.create(basket);
    console.log('Panier inséré avec succès');
    mongoose.connection.close();
  }
  


  insertData()