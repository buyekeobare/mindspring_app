const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mindspring.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create journal_entries table
    db.run(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating journal_entries table:', err.message);
      } else {
        console.log('journal_entries table initialized.');
      }
    });

    // Create analytics table
    db.run(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating analytics table:', err.message);
      } else {
        console.log('analytics table initialized.');
      }
    });
  }
});
