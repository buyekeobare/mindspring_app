require('dotenv').config();

const express = require("express");
const db = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticateToken = require("./middleware/auth");
const http = require("http");
const createWebSocket = require("./routes/chat");
const emailRoutes = require('./routes/email');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "defaultsecret";

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use("/entries", require("./routes/journals"));
app.use('/api/email', emailRoutes);

createWebSocket(server);

// Create Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS journal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

// Register Endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    stmt.run(username, email, hashedPassword, (err) => {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({ error: "Username or email already exists." });
        }
        return res.status(500).json({ error: "Internal server error." });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "Internal server error." });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: "3h",
    });

    res.json({ message: "Login successful!", token, user_id: user.id });
  });
});

// Journal CRUD Operations

// Create a new journal entry
app.post("/journal", authenticateToken, (req, res) => {
  const { content, date } = req.body;
  const currentDate = date || new Date().toISOString();

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content cannot be empty." });
  }

  const query = "INSERT INTO journal (user_id, content, date) VALUES (?, ?, ?)";
  db.run(query, [req.user.id, content, currentDate], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error." });
    } else {
      res.status(201).json({ id: this.lastID, message: "Entry added successfully!" });
    }
  });
});

// Retrieve all journal entries for the user
app.get("/journal", authenticateToken, (req, res) => {
  const query = "SELECT * FROM journal WHERE user_id = ? ORDER BY date DESC";
  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error." });
    } else {
      res.json(rows);
    }
  });
});

// Update an existing journal entry
app.put("/journal/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { content, date } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content cannot be empty." });
  }

  const query = "UPDATE journal SET content = ?, date = ? WHERE id = ? AND user_id = ?";
  const currentDate = date || new Date().toISOString();

  db.run(query, [content, currentDate, id, req.user.id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Entry not found or not authorized." });
    }

    const selectQuery = "SELECT * FROM journal WHERE id = ? AND user_id = ?";
    db.get(selectQuery, [id, req.user.id], (err, updatedEntry) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to fetch the updated entry." });
      }
      res.json(updatedEntry);
    });
  });
});

// Delete an existing journal entry
app.delete("/journal/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM journal WHERE id = ? AND user_id = ?";
  db.run(query, [id, req.user.id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Entry not found or not authorized." });
    }

    res.json({ message: "Entry deleted successfully!" });
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error." });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});