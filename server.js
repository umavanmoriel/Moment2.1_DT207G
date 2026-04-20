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