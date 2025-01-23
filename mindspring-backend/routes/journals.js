const express = require("express");
const db = require("../config/db");
const router = express.Router();
const auth = require("../middleware/auth"); // JWT middleware

// Create a new journal entry
router.post("/", auth, (req, res) => {
  const { date, content } = req.body;
  const userId = req.user.id;

  db.run(
    "INSERT INTO journal_entries (user_id, date, content) VALUES (?, ?, ?)",
    [userId, date, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Get all journal entries for a user
router.get("/", auth, (req, res) => {
  const userId = req.user.id;

  db.all(
    "SELECT * FROM journal_entries WHERE user_id = ? ORDER BY date DESC",
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      res.json(rows);
    }
  );
});

// Update a journal entry
router.put("/:id", auth, (req, res) => {
  const { id } = req.params;
  const { date, content } = req.body;
  const userId = req.user.id;

  db.run(
    "UPDATE journal_entries SET date = ?, content = ? WHERE id = ? AND user_id = ?",
    [date, content, id, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Entry not found." });
      }
      res.json({ message: "Entry updated successfully." });
    }
  );
});

// Delete a journal entry
router.delete("/:id", auth, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.run(
    "DELETE FROM journal_entries WHERE id = ? AND user_id = ?",
    [id, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Entry not found." });
      }
      res.json({ message: "Entry deleted successfully." });
    }
  );
});

module.exports = router;
