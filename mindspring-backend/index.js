// configuration
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client'); 


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
  
  // Initialize Prisma
  const prisma = new PrismaClient();

  // Routes for Journal
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