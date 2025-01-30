const mysql = require('mysql2');

// Crée une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'app_user',
  password: 'app_password',
  database: 'mydatabase'
});

// Se connecter à la base de données
connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données avec l\'ID ' + connection.threadId);
});

// Créer des tables dans la base de données
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    stock INT
  );
`;

// Exécuter la requête SQL
connection.query(createTablesQuery, (err, results) => {
  if (err) {
    console.error('Erreur lors de la création des tables: ' + err.message);
    return;
  }
  console.log('Tables créées avec succès.');
});

// Fermer la connexion à la base de données
connection.end();
