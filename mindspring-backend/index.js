const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database('./thrivewell.db', (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to the SQLite database.');
});

// Create Journal Table
db.run(`
  CREATE TABLE IF NOT EXISTS journal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

// Routes
app.post('/journal', (req, res) => {
  const { entry } = req.body;
  const date = new Date().toISOString();
  const query = `INSERT INTO journal (entry, date) VALUES (?, ?)`;
  
  db.run(query, [entry, date], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

app.get('/journal', (req, res) => {
  const query = `SELECT * FROM journal ORDER BY date DESC`;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
