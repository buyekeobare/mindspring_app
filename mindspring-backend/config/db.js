const sqlite3 = require('sqlite3').verbose();

const connectDB = () => {
  const db = new sqlite3.Database('./mindspring.db', (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  return db;
};

module.exports = connectDB;
