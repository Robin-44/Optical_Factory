const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const authConfig = require('./auth_config.json');
const { Client, Commande, Monture, Verre, Prescription } = require('../models-mongodb/models');

const app = express();

if (
  !authConfig.domain ||
  !authConfig.authorizationParams.audience ||
  ["YOUR_API_IDENTIFIER", "https://optical-factory"].includes(authConfig.authorizationParams.audience)
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: authConfig.appUri,
  })
);

const checkJwt = auth({
  audience: authConfig.authorizationParams.audience,
  issuerBaseURL: `https://${authConfig.domain}`,
});

app.post('/api/clients', checkJwt, async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/clients', checkJwt, async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/clients/:id', checkJwt, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/clients/:id', checkJwt, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/clients/:id', checkJwt, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ message: 'Client deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Montures**

app.post('/api/montures', checkJwt, async (req, res) => {
  try {
    const monture = new Monture(req.body);
    await monture.save();
    res.status(201).json(monture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/montures', checkJwt, async (req, res) => {
  try {
    const montures = await Monture.find().populate('Verre_ID'); // populate Verre_ID field
    res.status(200).json(montures);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/montures/:id', checkJwt, async (req, res) => {
  try {
    const monture = await Monture.findById(req.params.id).populate('Verre_ID');
    if (!monture) return res.status(404).json({ message: 'Monture not found' });
    res.status(200).json(monture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/montures/:id', checkJwt, async (req, res) => {
  try {
    const monture = await Monture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!monture) return res.status(404).json({ message: 'Monture not found' });
    res.status(200).json(monture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/montures/:id', checkJwt, async (req, res) => {
  try {
    const monture = await Monture.findByIdAndDelete(req.params.id);
    if (!monture) return res.status(404).json({ message: 'Monture not found' });
    res.status(200).json({ message: 'Monture deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Verres**

app.post('/api/verres', checkJwt, async (req, res) => {
  try {
    const verre = new Verre(req.body);
    await verre.save();
    res.status(201).json(verre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/verres', checkJwt, async (req, res) => {
  try {
    const verres = await Verre.find();
    res.status(200).json(verres);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/verres/:id', checkJwt, async (req, res) => {
  try {
    const verre = await Verre.findById(req.params.id);
    if (!verre) return res.status(404).json({ message: 'Verre not found' });
    res.status(200).json(verre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/verres/:id', checkJwt, async (req, res) => {
  try {
    const verre = await Verre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!verre) return res.status(404).json({ message: 'Verre not found' });
    res.status(200).json(verre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/verres/:id', checkJwt, async (req, res) => {
  try {
    const verre = await Verre.findByIdAndDelete(req.params.id);
    if (!verre) return res.status(404).json({ message: 'Verre not found' });
    res.status(200).json({ message: 'Verre deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Commandes**

app.post('/api/commandes', checkJwt, async (req, res) => {
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/commandes', checkJwt, async (req, res) => {
  try {
    const commandes = await Commande.find().populate('Client_ID').populate('Verre_ID').populate('Monture_ID');
    res.status(200).json(commandes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/commandes/:id', checkJwt, async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate('Client_ID').populate('Verre_ID').populate('Monture_ID');
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json(commande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/commandes/:id', checkJwt, async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json(commande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/commandes/:id', checkJwt, async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json({ message: 'Commande deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// **Routes for Prescriptions**

app.post('/api/prescriptions', checkJwt, async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/prescriptions', checkJwt, async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/prescriptions/:id', checkJwt, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/prescriptions/:id', checkJwt, async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/prescriptions/:id', checkJwt, async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const port = process.env.API_SERVER_PORT || 3001;
app.listen(port, () => console.log(`API started on port ${port}`));
