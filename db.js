const mysql = require('mysql2');

// Skapar anslutning
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DT207G_Moment2'
});

// Skapa promise
const promiseConnection = connection.promise();

// Ansluter till databasen DT207G_Moment2
connection.connect((err) => {
    if (err) {
        console.error('Kunde inte ansluta till databasen:', err.message);
        return;
    }
    console.log('Ansluten till databasen DT207G_Moment2');
});

// Exporterar promise anslutning
module.exports = promiseConnection;