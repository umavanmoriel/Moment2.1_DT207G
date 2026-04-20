const mysql = require('mysql2/promise');

// Skapar anslutning
const connection = mysql.createConnection(process.env.MYSQL_URL);




// Exporterar promise anslutning
module.exports = promiseConnection;