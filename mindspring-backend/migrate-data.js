const sqlite3 = require('sqlite3').verbose();

// Paths to the databases
const analyticsDBPath = './analytics.db'; // Update path if needed
const mindspringDBPath = './mindspring.db'; // Update path if needed

// Open both databases
const analyticsDB = new sqlite3.Database(analyticsDBPath, (err) => {
  if (err) console.error('Error connecting to analytics.db:', err.message);
});
const mindspringDB = new sqlite3.Database(mindspringDBPath, (err) => {
  if (err) console.error('Error connecting to mindspring.db:', err.message);
});

// Migrate data
analyticsDB.all('SELECT * FROM analytics', [], (err, rows) => {
  if (err) {
    console.error('Error reading data from analytics.db:', err.message);
    return;
  }

  // Create the `analytics` table in mindspring.db if it doesn't exist
  mindspringDB.run(
    `CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error('Error creating analytics table in mindspring.db:', err.message);
        return;
      }

      console.log('Analytics table ensured in mindspring.db.');

      // Insert data into mindspring.db
      const insertStmt = mindspringDB.prepare(
        'INSERT INTO analytics (id, event, timestamp) VALUES (?, ?, ?)'
      );

      rows.forEach((row) => {
        insertStmt.run([row.id, row.event, row.timestamp], (err) => {
          if (err) {
            console.error('Error inserting row:', err.message);
          }
        });
      });

      insertStmt.finalize(() => {
        console.log('Data migration complete.');
        // Close both databases
        analyticsDB.close();
        mindspringDB.close();
      });
    }
  );
});
