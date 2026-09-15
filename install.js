const mysql = require('mysql2');

// Anslut till MySQL (utan databas)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889'
});

connection.connect((err) => {
    if (err) {
        console.error("Kan inte ansluta:", err);
        return;
    }

    console.log("Ansluten till MySQL!");

    // Skapa databasen
    connection.query("CREATE DATABASE IF NOT EXISTS DT207G_Moment2", (err) => {
        if (err) {
            console.error("Kunde inte skapa databas:", err);
            return;
        }
        console.log("Databas 'DT207G_Moment2' skapad!");

        // Byt till DT207G_Moment2-databasen
        connection.changeUser({ database: 'DT207G_Moment2' }, (err) => {
            if (err) {
                console.error("Kunde inte byta till DT207G_Moment2:", err);
                return;
            }

            // Skapa tabellen workexperience
            const skapaTabell = `
                CREATE TABLE IF NOT EXISTS workexperience (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    companyname VARCHAR(100) NOT NULL,
                    jobtitle VARCHAR(100) NOT NULL,
                    location VARCHAR(100) NOT NULL,
                    startdate DATE NOT NULL,
                    enddate DATE NOT NULL,
                    description TEXT NOT NULL
                )
            `;

            connection.query(skapaTabell, (err) => {
                if (err) {
                    console.error("Kunde inte skapa tabell:", err);
                    return;
                }
                console.log("Tabell 'workexperience' skapad!");
                console.log("Allt klart! Starta servern med: node server.js");
                connection.end();
            });
        });
    });
});