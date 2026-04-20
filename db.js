const mysql = require('mysql2/promise');

// Skapar connection pool
const db = mysql.createPool(process.env.MYSQL_URL);

// Testar anslutningen på Railway
db.getConnection()
    .then(() => console.log('Databasansluten på Railway'))
    .catch(err => console.error('Databasfel:', err.message));

module.exports = db;