const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'sql.freedb.tech',
    user: 'u_4w69tl',
    password: 'hAVhqLcxF8wI',
    port: 3306,
    database: 'freedb_UwljZlRo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testar anslutningen
connection.getConnection()
    .then(() => console.log('Ansluten till databasen DT207G_Moment2'))
    .catch(err => console.error('Kunde inte ansluta:', err.message));

module.exports = connection;