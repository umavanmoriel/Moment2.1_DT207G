const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'DT207G_Moment2',
});

// Testar anslutningen
connection.getConnection()
    .then(() => console.log('Ansluten till databasen DT207G_Moment2'))
    .catch(err => console.error('Kunde inte ansluta:', err.message));

module.exports = connection;