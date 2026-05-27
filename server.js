const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3002;

// Erlaubt dem Server, JSON-Daten vom Spiel zu empfangen
app.use(express.json());

// Liefert die index.html aus dem aktuellen Ordner aus
app.use(express.static(__dirname));

// SQLite Datenbank initialisieren (wird automatisch als Datei erstellt)
const db = new sqlite3.Database('./scores.db');

db.serialize(() => {
    // Erstellt die Tabelle, falls sie noch nicht existiert (ganz simpel, ohne Primary Key)
    db.run("CREATE TABLE IF NOT EXISTS leaderboard (name TEXT, score INTEGER)");
});

// Route 1: Einen neuen Score speichern
app.post('/score', (req, res) => {
    const { name, score } = req.body;
    db.run("INSERT INTO leaderboard (name, score) VALUES (?, ?)", [name, score], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Route 2: Die Top 10 abrufen
app.get('/leaderboard', (req, res) => {
    db.all("SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Oma-Tetris Server läuft auf Port ${port}`);
});