const mysql = require('mysql2');

// Skapar anslutning
const connection = mysql.createConnection(process.env.MYSQL_URL);

// Skapa promise
const promiseConnection = connection.promise();



// Exporterar promise anslutning
module.exports = promiseConnection;