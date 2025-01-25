const express = require("express");
const db = require("../config/db");
const router = express.Router();
const validateJournals = require("../middleware/validateJournals");
const auth = require("../middleware/auth"); // JWT middleware

// Create a new journal entry
router.post("/", auth, validateJournals, (req, res) => {
  const { date, content } = req.body;
  const userId = req.user.id;

  db.run(
    "INSERT INTO journal (user_id, date, content) VALUES (?, ?, ?)",
    [userId, date, content],
    function (err) {
      if (err) {
        console.error("Error inserting entry into journal table:", err.message);
        return res
          .status(500)
          .json({ error: "Database error occurred while saving the entry." });
      }
      // Include the saved entry in the response
      res.status(201).json({ id: this.lastID, user_id: userId, date, content });
    }
  );
});

// Get all journal entries for a user
router.get("/", auth, (req, res) => {
  const userId = req.user.id;

  db.all(
    "SELECT * FROM journal WHERE user_id = ? ORDER BY date DESC",
    [userId],
    (err, rows) => {
      if (err) {
        console.error("Error fetching journal entries:", err.message);
        return res.status(500).json({ error: "Database error." });
      }
      res.json(rows);
    }
  );
});

// Update a journal entry
router.put("/:id", auth, validateJournals, (req, res) => {
  const { id } = req.params;
  const { date, content } = req.body;
  const userId = req.user.id;

  db.run(
    "UPDATE journal SET date = ?, content = ? WHERE id = ? AND user_id = ?",
    [date, content, id, userId],
    function (err) {
      if (err) {
        console.error("Error updating journal entry:", err.message);
        return res.status(500).json({ error: "Database error." });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Entry not found or not authorized." });
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
    "DELETE FROM journal WHERE id = ? AND user_id = ?",
    [id, userId],
    function (err) {
      if (err) {
        console.error("Error deleting journal entry:", err.message);
        return res.status(500).json({ error: "Database error." });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Entry not found or not authorized." });
      }
      res.json({ message: "Entry deleted successfully." });
    }
  );
});

module.exports = router;
