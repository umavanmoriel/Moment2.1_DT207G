const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

// Importera databaskopplingen
const db = require('./db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); 

// Hämta info om anställda från tabellen employees - Read
app.get('/employees', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees');
        // Skickar alla anställda i JSON-format
        res.json(rows); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Lägg till ny anställd - Create
app.post('/employees', async (req, res) => {
    // Hämtar info från body
    const { Name, Lastname, Jobtitle, Location, Dateofbirth } = req.body;
    

    // Skapar en tom array för at samla alla errors
    let errors = [];

    // Validering om något av fält är tomt
    if (Name === '' || Lastname === '' || Jobtitle === '' || Location === '' || Dateofbirth === '') {
        errors.push('Alla fält måste fyllas i');
    }

    // Kontrollerar att namn eller efternamn inte har specialtecken
    if (/[!@#$%^&*()]/.test(Name) || /[!@#$%^&*()]/.test(Lastname)) {
        errors.push('Namn och efternamn får inte innehålla specialtecken som !@#$%^&*()');
    }

    // Om valideringsfel returnerar errors array
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    

    try {
        // Lägger till ny anställd info 
        const [result] = await db.query(
            'INSERT INTO employees (Name, Lastname, Jobtitle, Location, Dateofbirth) VALUES (?, ?, ?, ?, ?)',
            [Name, Lastname, Jobtitle, Location, Dateofbirth]
        );
        // Visar meddelanden om anställd är sparad
        res.status(201).json({ 
            message: 'Ny anställd är sparad',
            id: result.insertId 
        });
    } catch (error) {
        // Visar felmeddelande om något gick fel
        res.status(500).json({ error: error.message });
    }
});


// Uppdaterar en anställd - Update
app.put('/employees/:id', async (req, res) => {

    // Hämtar info från body 
    const { Name, Lastname, Jobtitle, Location, Dateofbirth } = req.body;
    const id = req.params.id;

    // Skapar en tom array för at samla alla errors
    let errors = [];

    // Validering om något av fält är tomt
    if (!Name || !Lastname || !Jobtitle || !Location || !Dateofbirth) {
        errors.push('Alla fält måste fyllas i');
    }

    // Kontrollerar att namn eller efternamn inte har specialtecken
    if (/[!@#$%^&*()]/.test(Name) || /[!@#$%^&*()]/.test(Lastname)) {
        errors.push('Namn och efternamn får inte innehålla specialtecken !@#$%^&*()');
    }

    // Om valideringsfel returnerar errors array
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const [result] = await db.query(
            // UPDATE ändrar befintlig data
            'UPDATE employees SET Name = ?, Lastname = ?, Jobtitle = ?, Location = ?, Dateofbirth = ? WHERE ID = ?',
            // Ersätter befintlig data
            [Name, Lastname, Jobtitle, Location, Dateofbirth, id]

        );
        // Returnerar fel om anställd finns inte
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Anställd hittades inte' });
        }
        // Visar att anställd info är uppdaterad
        res.json({ message: 'Anställd uppdaterad' });
    } catch (error) {
        // Visar felmeddelande om något gick fel
        res.status(500).json({ error: error.message });
    }
});


// Tar bort en anställd - Delete
app.delete('/employees/:id', async (req, res) => {
    try {

        // Tar bort en anställd med specifikt ID från tabellen employees 
        const [result] = await db.query('DELETE FROM employees WHERE ID = ?', [req.params.id]);
        

        // Om ingen ID matchar då returneras felmeddelande 
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Anställd med angivet ID finns inte' });
        }
        res.json({ message: 'Anställd borttagen' });
    } catch (error) {
        // Visar felmeddelande om något gick fel
        res.status(500).json({ error: error.message });

    }
});


// Starta servern
app.listen(port, () => {
    console.log(`Servern körs på port ${port}`);
});