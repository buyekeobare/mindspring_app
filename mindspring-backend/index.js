const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const createWebSocket = require("./routes/chat");

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const SECRET_KEY = "JWT_SECRET";

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

createWebSocket(server);

// Database Setup
const db = new sqlite3.Database("./mindspring.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS journal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      entry TEXT NOT NULL,
      date TEXT NOT NULL,
      
      FOREIGN KEY(userId) REFERENCES users(id)
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
      expiresIn: "1h",
    });

    res.json({ message: "Login successful!", token });
  });
});

// Middleware for Authentication
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token." });
  }
}

// Journal CRUD Operations
app.post("/journal", authenticateToken, (req, res) => {
  const { entry } = req.body;
  const date = new Date().toISOString();

  if (!entry || entry.trim() === "") {
    return res.status(400).json({ error: "Entry cannot be empty." });
  }

  const query = "INSERT INTO journal (userId, entry, date) VALUES (?, ?, ?)";
  db.run(query, [req.user.id, entry, date], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, message: "Entry added successfully!" });
    }
  });
});

app.get("/journal", authenticateToken, (req, res) => {
  const query = "SELECT * FROM journal WHERE userId = ? ORDER BY date DESC";
  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.put("/journal/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { entry } = req.body;

  if (!entry || entry.trim() === "") {
    return res.status(400).json({ error: "Entry cannot be empty." });
  }

  const query = "UPDATE journal SET entry = ?, date = ? WHERE id = ? AND userId = ?";
  const date = new Date().toISOString();

  db.run(query, [entry, date, id, req.user.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Entry not found or not authorized." });
    } else {
      res.json({ message: "Entry updated successfully!" });
    }
  });
});

app.delete("/journal/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM journal WHERE id = ? AND userId = ?";
  db.run(query, [id, req.user.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Entry not found or not authorized." });
    } else {
      res.json({ message: "Entry deleted successfully!" });
    }
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
