const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

// Dateipfade
const scoresFile = path.join(__dirname, 'scores.json');
const logsFile = path.join(__dirname, 'logs.json');

// Erstellt die Dateien, falls sie noch nicht existieren
if (!fs.existsSync(scoresFile)) {
    fs.writeFileSync(scoresFile, JSON.stringify([]));
}
if (!fs.existsSync(logsFile)) {
    fs.writeFileSync(logsFile, JSON.stringify([]));
}

app.use(express.json());
app.use(express.static(__dirname));

// Hilfsfunktion: Schreibt einen Eintrag in die logs.json
function writeLog(name, action) {
    try {
        const currentData = fs.readFileSync(logsFile, 'utf8');
        let logs = JSON.parse(currentData);
        
        // Aktuelle deutsche Zeit ermitteln
        const timestamp = new Date().toLocaleString('de-DE');
        
        // Log-Eintrag hinzufügen
        logs.push({ zeit: timestamp, name: name, aktion: action });
        
        // Schön formatiert zurück in die Datei schreiben (mit Einrückungen für gute Lesbarkeit)
        fs.writeFileSync(logsFile, JSON.stringify(logs, null, 2));
    } catch (err) {
        console.error("Fehler beim Loggen:", err);
    }
}

// Route, um zu speichern, wenn jemand nur seinen Namen eingibt
app.post('/log-name', (req, res) => {
    const { name } = req.body;
    writeLog(name, "Spiel betreten");
    res.json({ success: true });
});

// Route 1: Einen neuen Score speichern
app.post('/score', (req, res) => {
    const { name, score } = req.body;
    
    try {
        // Lese aktuelle Scores
        const currentData = fs.readFileSync(scoresFile, 'utf8');
        let scores = JSON.parse(currentData);
        
        // Füge neuen Score hinzu
        scores.push({ name, score });
        
        // Speichere zurück in die Datei
        fs.writeFileSync(scoresFile, JSON.stringify(scores));
        
        // Den Score auch ins Logbuch eintragen
        writeLog(name, `Score gemacht: ${score}`);
        
        res.json({ success: true });
    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        res.status(500).json({ error: err.message });
    }
});

// Route 2: Die Top 10 abrufen
app.get('/leaderboard', (req, res) => {
    try {
        const currentData = fs.readFileSync(scoresFile, 'utf8');
        let scores = JSON.parse(currentData);
        
        // Absteigend sortieren und nur die ersten 10 nehmen
        const top10 = scores.sort((a, b) => b.score - a.score).slice(0, 10);
        
        res.json(top10);
    } catch (err) {
        console.error("Fehler beim Lesen:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Oma-Tetris Server läuft fehlerfrei auf Port ${port}`);
});