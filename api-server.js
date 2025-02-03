const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
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

// **Routes for Clients**
app.post('/api/clients', checkJwt, async (req, res) => {
  try {
    const client = await db.collection('clients').insertOne(req.body);
    res.status(201).json(client.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/clients', checkJwt, async (req, res) => {
  try {
    const clients = await db.collection('clients').find().toArray();
    console.log(clients)
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

app.get('/api/montures', async (req, res) => {
  try {
    const montures = await db.collection('montures').find().toArray();
    console.log(montures)
    res.status(200).json(montures);
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

// Server Setup
const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
