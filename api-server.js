const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const authConfig = require('./auth_config.json');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sullivansextius:T1vcZx08zLzE0pVr@cluster0.hlc6i.mongodb.net/guardian-project?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const app = express();

if (
  !authConfig.domain ||
  !authConfig.authorizationParams.audience ||
  ["YOUR_API_IDENTIFIER", "{yourApiIdentifier}"].includes(authConfig.authorizationParams.audience)
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );
  process.exit();
}
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.options('*', cors()); 
app.use(express.json());  

app.use(morgan('dev'));
app.use(helmet());

const checkJwt = auth({
  audience: authConfig.authorizationParams.audience,
  issuerBaseURL: `https://${authConfig.domain}`,
});
let db;
async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('optical-factory'); // Replace 'myDatabase' with your actual DB name
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
connectToDatabase();

app.post('/api/register', checkJwt, async (req, res) => {
  try {

    // Récupère les données envoyées par le client
    const { username, email, sub } = req.body;
    let address = "8 allée de la cours";  // Valeur par défaut pour l'adresse
    
    // Vérifie si les champs 'username' et 'email' sont présents
    if (!username || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Vérification si un client avec cet email existe déjà dans la base de données
    const existingClient = await db.collection('clients').findOne({sub : sub });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists with this email.' });
    }

    // Si aucun client n'existe avec cet email, créez un nouveau client
    const client = {
      username,
      email,
      prenom:username,
      nom: username,
      phone: "500-400-209",
      sub:sub,  
      genre:"Homme",
      Ville:"Paris",
      Mode_Paiement_Favori:"VISA",
      Preferences_Communication:"Téléphone",
      address,   
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
    // Insertion du nouveau client dans la base de données
    const result = await db.collection('clients').insertOne(client);
    // Retourne une réponse avec le client créé
    res.status(201).json({result, message: "Utilisateur ajouté avec succès" });

  } catch (err) {
    console.error('Error during registration:', err);  // Affiche l'erreur côté serveur
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/clients', checkJwt, async (req, res) => {
  try {
    const clients = await db.collection('clients').find().toArray();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/api/recommendations/panier', checkJwt, async (req, res) => {
  try {
    const sub = req.auth.payload.sub;  // Récupérer l'ID du client depuis le JWT
    const client = await db.collection('clients').findOne({ sub: sub });  // Chercher le client
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Récupérer les produits du panier du client
    const panier = await db.collection('baskets').find({ Client_ID: client._id }).toArray();

    if (panier.length === 0) {
      return res.status(404).json({ message: 'Aucun produit trouvé dans le panier' });
    }

    // Récupérer les détails des montures dans le panier
    const monturesInPanier = await Promise.all(panier.map(async (item) => {
      const monture = await db.collection('montures').findOne({ _id: new ObjectId(item.Monture_ID) });
      return monture;
    }));

    // Extraire les caractéristiques des montures pour la recommandation
    const montureCategories = monturesInPanier.map(monture => monture.Categorie_Protection);  // Exemple : Categorie_Protection
    const montureStyles = monturesInPanier.map(monture => monture.Style);  // Exemple : Style

    // Rechercher des montures similaires dans la base de données
    const recommendedMontures = await db.collection('montures').find({
      Categorie_Protection: { $in: montureCategories },
      Style: { $in: montureStyles },
      _id: { $nin: monturesInPanier.map(m => m._id) }  // Exclure les montures déjà dans le panier
    }).toArray();

    // Recommander des verres compatibles avec les montures
    const recommendedVerres = await db.collection('verres').find({
      // Logique pour recommander des verres, par exemple en fonction du type de monture
    }).toArray();

    res.status(200).json({
      recommendedMontures: recommendedMontures,
      recommendedVerres: recommendedVerres
    });

  } catch (err) {
    console.error('Erreur lors des recommandations :', err);
    res.status(500).json({ message: 'Erreur lors des recommandations basées sur le panier' });
  }
});

app.post('/api/glasses', async (req, res) => {
  try {
    const glassData = req.body;

    // Validation basique
    if (!glassData.type || !glassData.indiceRefraction || !glassData.prix || glassData.stock == null) {
      return res.status(400).json({ message: 'Certains champs obligatoires sont manquants.' });
    }

    // Vérification d'existence d'un verre similaire
    const existingGlass = await db.collection('verres').findOne({
      type: glassData.type,
      indiceRefraction: glassData.indiceRefraction,
      traitements: glassData.traitements,
      teinte: glassData.teinte,
      compatibilite: glassData.compatibilite,
      categorieProtection: glassData.categorieProtection,
      securite: glassData.securite,
      solaire: glassData.solaire
    });

    if (existingGlass) {
      return res.status(409).json({ message: 'Ce verre existe déjà dans la base de données.' });
    }

    // Insertion
    const result = await db.collection('verres').insertOne(glassData);

    res.status(201).json({
      message: 'Verre ajouté avec succès.',
      id: result.insertedId
    });

  } catch (error) {
    console.error('Erreur lors de l\'insertion dans la collection "verres" :', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout des verres.' });
  }
});





app.get('/api/panier/count', checkJwt, async (req, res) => {
  try {
    const sub = req.auth.payload.sub;  // Récupérer l'ID du client depuis le JWT
    const client = await db.collection('clients').findOne({ sub: sub });  // Chercher le client dans la base

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Utilisation de l'agrégation pour calculer la somme des quantités dans le panier
    const panier = await db.collection('baskets').aggregate([
      { 
        $match: { Client_ID: client._id }  // Trouver tous les paniers pour ce client
      },
      {
        $group: {
          _id: null,  // Pas besoin de regrouper par monture, juste additionner
          totalQuantity: { $sum: "$Quantity" }  // Additionner les quantités des montures dans le panier
        }
      }
    ]).toArray();

    if (panier.length === 0) {
      return res.status(404).json({ message: 'Aucune monture trouvée dans le panier.' });
    }

    // Retourner la quantité totale
    res.status(200).json({ quantity: panier[0].totalQuantity });

  } catch (err) {
    console.error('Erreur lors du calcul du nombre d\'articles dans le panier:', err);
    res.status(500).json({ message: 'Erreur lors du calcul du nombre d\'articles dans le panier' });
  }
});


app.get('/api/clients/:id', checkJwt, async (req, res) => {
  try {
    const client = await db.collection('clients').findOne({ _id: new ObjectId(req.params.id) });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/panier/count/:montureId', checkJwt, async (req, res) => {
  const { montureId } = req.params;  // Récupérer l'ID de la monture depuis l'URL
  const sub = req.auth.payload.sub;  // ID de l'utilisateur à partir du JWT

  if (!montureId) {
    return res.status(400).json({ message: 'Monture ID est nécessaire' });
  }

  try {
    // Vérifiez si le client existe
    const client = await db.collection('clients').findOne({ sub: sub });
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Récupérer le panier du client pour cette monture spécifique
    const panier = await db.collection('baskets').findOne({ 
      Client_ID: client._id, 
      Monture_ID: montureId 
    });

    if (panier) {
      return res.status(200).json({ 
        quantity: panier.Quantity,  // Retourne la quantité de cette monture dans le panier
        montureId: montureId
      });
    } else {
      // Si la monture n'est pas dans le panier
      return res.status(200).json({ quantity: 0 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


app.post('/api/checkout', checkJwt, async (req, res) => {
  try {
    const sub = req.auth.payload.sub;

    const client = await db.collection('clients').findOne({ sub: sub });
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    await db.collection('baskets').deleteMany({ Client_ID: client._id });

    return res.status(200).json({ message: 'Achat effectué avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

app.post('/api/reduce_monture_quantity', checkJwt, async (req, res) => {
  try {
    const { montureId } = req.body;
    const sub = req.auth.payload.sub;

    if (!montureId) {
      return res.status(400).json({ message: 'Monture ID requis' });
    }

    const client = await db.collection('clients').findOne({ sub: sub });
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    let basketItem = await db.collection('baskets').findOne({ Client_ID: client._id, Monture_ID: montureId });

    if (!basketItem) {
      return res.status(404).json({ message: 'Article non trouvé dans le panier' });
    }

    if (basketItem.Quantity > 1) {
      await db.collection('baskets').updateOne(
        { Client_ID: client._id, Monture_ID: montureId },
        { $inc: { Quantity: -1 } }
      );
    } else {
      await db.collection('baskets').deleteOne({ Client_ID: client._id, Monture_ID: montureId });
    }

    return res.status(200).json({ message: 'Quantité mise à jour' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

app.get('/api/get_basket', checkJwt, async (req, res) => {
  try {
    const sub = req.auth.payload.sub;

    // Vérifier si le client existe
    const client = await db.collection('clients').findOne({ sub: sub });
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Récupérer tous les articles du panier pour ce client
    const baskets = await db.collection('baskets').find({ Client_ID: client._id }).toArray();

    // Vérifier si le panier est vide
    if (!baskets.length) {
      return res.status(200).json({ message: 'Panier vide', baskets: [] });
    }

    // Récupérer les détails des montures associées aux IDs stockés dans le panier
    const montureIds = baskets.map((basket) => new ObjectId(basket.Monture_ID));
    const montures = await db.collection('montures').find({ _id: { $in: montureIds } }).toArray();

    // Associer les montures aux articles du panier
    const panierComplet = baskets.map((basket) => {
      const monture = montures.find((m) => m._id.toString() === basket.Monture_ID.toString());
      return {
        monture: monture || null,
        quantity: basket.Quantity,
      };
    });

    return res.status(200).json({ panier: panierComplet });
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

app.post('/api/add_monture_to_basket', checkJwt, async (req, res) => {
  const { montureId, quantity } = req.body;
  console.log(quantity)
  const sub = req.auth.payload.sub
  if (!montureId || quantity == null) {
    return res.status(400).json({ message: 'Monture ID  sont nécessaires' });
  }
  try {

    // Vérifiez si le client existe
    const client = await db.collection('clients').findOne({sub: sub});
    
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Vérifiez si un panier pour ce client existe
    let baskets = await db.collection('baskets').findOne({ Client_ID: client._id, Monture_ID: montureId });

    if (!baskets) {
      // Si le panier pour cette monture n'existe pas, créez-le
      baskets = {
        Client_ID: new ObjectId(client._id),
        Monture_ID: montureId,
        Quantity: quantity
      };
      const result = await db.collection('baskets').insertOne(baskets);
      return res.status(201).json({ message: 'Monture ajoutée au panier', baskets });
    } else {
      // Mettre à jour la quantité dans la base de données
      await db.collection('baskets').updateOne(
        { Client_ID: client._id, Monture_ID: montureId },
        { $set: { Quantity: quantity } } // Mise à jour de la quantité
      );  
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});



app.put('/api/clients/:id', checkJwt, async (req, res) => {
  try {
    const client = await db.collection('clients').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!client.value) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client.value);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/clients/:id', checkJwt, async (req, res) => {
  try {
    const client = await db.collection('clients').deleteOne({ _id: new ObjectId(req.params.id) });
    if (client.deletedCount === 0) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ message: 'Client deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Montures**
app.post('/api/montures', async (req, res) => {
  try {
    const monture = await db.collection('montures').insertOne(req.body);
    console.log(monture)
    res.status(201).json(monture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get('/api/tables', async (req, res) => {
  const collections = await db.listCollections().toArray();
  res.json({ tables: collections.map(col => col.name) });
});
app.delete('/api/tables/:tableName/:id', async (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;
  await db.collection(tableName).deleteOne({ _id: new ObjectId(id) });
  res.json({ message: 'Donnée supprimée' });
});
app.post('/api/tables/:tableName', async (req, res) => {
  const tableName = req.params.tableName;
  const newData = req.body;
  await db.collection(tableName).insertOne(newData);
  res.json({ message: 'Donnée ajoutée' });
});


app.get('/api/tables/:tableName', async (req, res) => {
  const tableName = req.params.tableName;
  const data = await db.collection(tableName).find().toArray();
  res.json({ data });
});



app.get('/api/montures', async (req, res) => {
  try {
    const montures = await db.collection('montures').find().toArray();
    res.status(200).json(montures);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/verres', async (req, res) => {
  try {
    const verres = await db.collection('verres').find().toArray();
    console.log(verres)
    res.status(200).json(verres);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/monture/:id', checkJwt, async (req, res) => {
  try {
    const monture = await db.collection('montures').findOne({ _id: new ObjectId(req.params.id) });
    if (!monture) return res.status(404).json({ message: 'Monture not found' });
    res.status(200).json(monture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/montures/:id', checkJwt, async (req, res) => {
  try {
    const monture = await db.collection('montures').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!monture.value) return res.status(404).json({ message: 'Monture not found' });
    res.status(200).json(monture.value);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/montures/:id', checkJwt, async (req, res) => {
  try {
    const monture = await db.collection('montures').deleteOne({ _id: new ObjectId(req.params.id) });
    if (monture.deletedCount === 0) return res.status(404).json({ message: 'Monture not found' });
    res.status(200).json({ message: 'Monture deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Verres**
app.post('/api/verres', checkJwt, async (req, res) => {
  try {
    const verre = await db.collection('verres').insertOne(req.body);
    res.status(201).json(verre.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/verres', checkJwt, async (req, res) => {
  try {
    const verres = await db.collection('verres').find().toArray();
    res.status(200).json(verres);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/verres/:id', checkJwt, async (req, res) => {
  try {
    const verre = await db.collection('verres').findOne({ _id: new ObjectId(req.params.id) });
    if (!verre) return res.status(404).json({ message: 'Verre not found' });
    res.status(200).json(verre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/verres/:id', checkJwt, async (req, res) => {
  try {
    const verre = await db.collection('verres').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!verre.value) return res.status(404).json({ message: 'Verre not found' });
    res.status(200).json(verre.value);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/verres/:id', checkJwt, async (req, res) => {
  try {
    const verre = await db.collection('verres').deleteOne({ _id: new ObjectId(req.params.id) });
    if (verre.deletedCount === 0) return res.status(404).json({ message: 'Verre not found' });
    res.status(200).json({ message: 'Verre deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Commandes**
app.post('/api/commandes', checkJwt, async (req, res) => {
  try {
    const commande = await db.collection('commandes').insertOne(req.body);
    res.status(201).json(commande.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/commandes', checkJwt, async (req, res) => {
  try {
    const commandes = await db.collection('commandes').find().toArray();
    res.status(200).json(commandes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/commandes/:id', checkJwt, async (req, res) => {
  try {
    const commande = await db.collection('commandes').findOne({ _id: new ObjectId(req.params.id) });
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json(commande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/commandes/:id', checkJwt, async (req, res) => {
  try {
    const commande = await db.collection('commandes').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!commande.value) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json(commande.value);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/commandes/:id', checkJwt, async (req, res) => {
  try {
    const commande = await db.collection('commandes').deleteOne({ _id: new ObjectId(req.params.id) });
    if (commande.deletedCount === 0) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json({ message: 'Commande deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Prescriptions**
app.post('/api/prescriptions', checkJwt, async (req, res) => {
  try {
    const prescription = await db.collection('prescriptions').insertOne(req.body);
    res.status(201).json(prescription.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/prescriptions', checkJwt, async (req, res) => {
  try {
    const prescriptions = await db.collection('prescriptions').find().toArray();
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/prescriptions/:id', checkJwt, async (req, res) => {
  try {
    const prescription = await db.collection('prescriptions').findOne({ _id: new ObjectId(req.params.id) });
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/prescriptions/:id', checkJwt, async (req, res) => {
  try {
    const prescription = await db.collection('prescriptions').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!prescription.value) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json(prescription.value);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/prescriptions/:id', checkJwt, async (req, res) => {
  try {
    const prescription = await db.collection('prescriptions').deleteOne({ _id: new ObjectId(req.params.id) });
    if (prescription.deletedCount === 0) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/clients-by-city', async (req, res) => {
  try {

    const clients = await db.collection('clients').aggregate([
      { 
        $group: { 
          _id: "$Ville",      
          count: { $sum: 1 }  
        } 
      },
      { 
        $project: { 
          city: "$_id",   
          clientCount: "$count", 
          _id: 0          
        } 
      }
    ]).toArray(); 
    res.status(200).json(clients); 
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des clients" });
  }
});
app.get('/api/montures-by-brand', async (req, res) => {
  try {
    const statusCount = await db.collection('montures').aggregate([
      {
        $group: {
          _id: "$Marque", // Regroupement par marque
          count: { $sum: 1 } // Compter le nombre de montures par marque
        }
      },
      {
        $project: {
          marque: "$_id", // Changer le nom de _id en marque
          count: 1,
          _id: 0
        }
      }
    ]).toArray();
    
    res.status(200).json(statusCount); // Renvoyer les données sous forme de JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des données des montures par marque", error);
    res.status(500).send("Erreur serveur");
  }
});


app.get('/api/montures/get-all', async (req, res) => {
  try {
    const montures = await db.collection('montures').find().toArray();  // Récupérer toutes les données de la collection "montures"
    
    if (montures.length === 0) {
      return res.status(404).json({ message: 'Aucune monture trouvée.' });  // Si aucune donnée n'est trouvée
    }

    res.status(200).json(montures);  // Retourner les données sous forme de JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des données des montures:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des montures" });  // Si une erreur se produit
  }
});



app.get('/api/orders/status-count',checkJwt,  async (req, res) => {
  try {
    // Compter les commandes par statut
    const statusCount = await db.collection('commandes').aggregate([
      {
        $group: {
          _id: "$Statut", // Regroupement par statut
          count: { $sum: 1 } // Compter le nombre de commandes pour chaque statut
        }
      },
      {
        $project: { // Changer le format de la réponse
          statut: "$_id", // Remplacer _id par "statut"
          count: 1,
          _id: 0 // Ne pas inclure le champ _id dans la réponse
        }
      }
    ]).toArray(); // Important : assure-toi d'appeler `toArray()` pour récupérer les résultats sous forme de tableau
    

    res.status(200).json(statusCount); // Retourner les résultats au frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de récupérer les données des commandes par statut' });
  }
});

app.get('/api/montures/type-count',checkJwt,  async (req, res) => {
  try {
    // Regrouper les montures par "Type" et compter le nombre de montures pour chaque type
    const montureCount = await db.collection('montures').aggregate([
      {
        $group: {
          _id: "$Type", // Regrouper par Type de la monture
          count: { $sum: 1 } // Compter le nombre de montures pour chaque type
        }
      },
      {
        $project: { // Formatter la réponse
          type: "$_id", // Renommer _id en type
          count: 1,
          _id: 0 // Exclure le champ _id
        }
      }
    ]).toArray(); // Récupérer les résultats sous forme de tableau

    // Retourner les résultats au frontend
    res.status(200).json(montureCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de récupérer les données des montures par type' });
  }
});

app.post('/api/proxy/recommander', async (req, res) => {
  try {
    const response = await fetch('https://optical-api.onrender.com/recommander', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    // Récupérer les données du client envoyées dans la requête
    const clientData = req.body;

    const result = await db.collection('clients').insertOne(clientData);
    // Répondre avec les données sauvegardées
    res.status(201).json({
      message: 'Client ajouté avec succès',
      client: result
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du client:', error);
    res.status(500).json({
      message: 'Erreur serveur lors de l\'ajout du client'
    });
  }
});

// Server Setup
const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
