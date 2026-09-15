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

// Hämta info om arbetserfarenheter från tabellen workexperience - Read
app.get('/workexperience', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM workexperience');
        // Skickar alla arbetserfarenheter i JSON-format
        res.json(rows); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Hämta en specifik arbetserfarenhet - Read
app.get('/workexperience/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM workexperience WHERE id = ?', [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Arbetserfarenhet hittades inte' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Lägg till ny arbetserfarenhet - Create
app.post('/workexperience', async (req, res) => {
    // Hämtar info från body
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Skapar en tom array för att samla alla errors
    let errors = [];

    // Validering om något av fält är tomt
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        errors.push('Alla fält måste fyllas i');
    }

    // Kontrollerar att företagsnamn eller jobbtitel inte har specialtecken
    if (/[!@#$%^&*()]/.test(companyname) || /[!@#$%^&*()]/.test(jobtitle)) {
        errors.push('Företagsnamn och jobtitel får inte innehålla specialtecken som !@#$%^&*()');
    }

    // Om valideringsfel returnerar errors array
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        // Lägger till ny arbetserfarenhet
        const [result] = await db.query(
            'INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)',
            [companyname, jobtitle, location, startdate, enddate, description]
        );
        // Visar meddelande om arbetserfarenhet är sparad
        res.status(201).json({ 
            message: 'Ny arbetserfarenhet är sparad',
            id: result.insertId 
        });
    } catch (error) {
        // Visar felmeddelande om något gick fel
        res.status(500).json({ error: error.message });
    }
});


// Uppdaterar en arbetserfarenhet - Update
app.put('/workexperience/:id', async (req, res) => {

    // Hämtar info från body 
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    const id = req.params.id;

    // Skapar en tom array för att samla alla errors
    let errors = [];

    // Validering om något av fält är tomt
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        errors.push('Alla fält måste fyllas i');
    }

    // Kontrollerar att företagsnamn eller jobtitel inte har specialtecken
    if (/[!@#$%^&*()]/.test(companyname) || /[!@#$%^&*()]/.test(jobtitle)) {
        errors.push('Företagsnamn och jobbtitel får inte innehålla specialtecken !@#$%^&*()');
    }

    // Om valideringsfel returnerar errors array
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const [result] = await db.query(
            // UPDATE ändrar befintlig data
            'UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id = ?',
            // Ersätter befintlig data
            [companyname, jobtitle, location, startdate, enddate, description, id]
        );
        // Returnerar fel om arbetserfarenhet inte finns
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Arbetserfarenhet hittades inte' });
        }
        // Visar att arbetserfarenhet är uppdaterad
        res.json({ message: 'Arbetserfarenhet uppdaterad' });
    } catch (error) {
        // Visar felmeddelande om något gick fel
        res.status(500).json({ error: error.message });
    }
});


// Tar bort en arbetserfarenhet - Delete
app.delete('/workexperience/:id', async (req, res) => {
    try {
        // Tar bort en arbetserfarenhet med specifikt ID från tabellen workexperience 
        const [result] = await db.query('DELETE FROM workexperience WHERE id = ?', [req.params.id]);

        // Om ingen ID matchar då returneras felmeddelande 
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Arbetserfarenhet med angivet ID finns inte' });
        }
        res.json({ message: 'Arbetserfarenhet borttagen' });
    } catch (error) {
        // Visar felmeddelande om något gick fel
        res.status(500).json({ error: error.message });
    }
});


// Startar servern
app.listen(port, () => {
    console.log(`Servern körs på port ${port}`);
});