const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');

// Example: Get all analytics data
router.get('/', (req, res) => {
  const db = connectDB();
  db.all('SELECT * FROM analytics', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
    db.close();
  });
});

// Example: Add new analytics data
router.post('/', (req, res) => {
  const { event, timestamp } = req.body;
  const db = connectDB();
  const sql = 'INSERT INTO analytics (event, timestamp) VALUES (?, ?)';
  db.run(sql, [event, timestamp], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Analytics data saved successfully.', id: this.lastID });
    }
    db.close();
  });
});

module.exports = router;
