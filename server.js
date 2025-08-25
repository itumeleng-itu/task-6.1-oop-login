const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    loggedIn INTEGER DEFAULT 0
  )`);
});

app.post("/api/login", (req, res) => { 
  const { username, password } = req.body;

  const findSql = `SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1`;
  db.get(findSql, [username, password], (err, row) => {
    if (err) return res.status(500).json({ ok: false, error: "DB read failed" });
    if (!row) return res.json({ ok: false, message: "Invalid username/password" });

    // Log out all users first
    db.run(`UPDATE users SET loggedIn = 0`, [], (err) => {
      if (err) return res.status(500).json({ ok: false, error: "DB update failed" });

      // Log in this user
      db.run(`UPDATE users SET loggedIn = 1 WHERE id = ?`, [row.id], function (uErr) {
        if (uErr) return res.status(500).json({ ok: false, error: "DB update failed" });
        return res.json({ ok: true });
      });
    });
  });
});

app.post("/api/logout", (req, res) => {
  const sql = `UPDATE users SET loggedIn = 0 WHERE loggedIn = 1`;
  db.run(sql, [], function (err) {
    if (err) return res.status(500).json({ ok: false, error: "DB update failed" });
    return res.json({ ok: true });
  });
});

app.get("/api/profile", (req, res) => {
  const sql = `SELECT username, email, createdAt, loggedIn FROM users WHERE loggedIn = 1 LIMIT 1`;
  db.get(sql, [], (err, row) => {
    if (err) return res.status(500).json({ ok: false, error: "DB read failed" });
    if (!row) return res.json({ ok: false, message: "No user currently logged in" });
    return res.json({ ok: true, data: row });
  });
});

app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ ok: false, message: "Missing fields" });
  }

  db.get(
    `SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1`,
    [username, email],
    (err, row) => {
      if (err) return res.status(500).json({ ok: false, error: "DB read failed" });
      if (row) return res.json({ ok: false, message: "Username or email already exists" });

      const createdAt = new Date().toISOString();
      db.run(
        `INSERT INTO users (username, email, password, createdAt, loggedIn) VALUES (?, ?, ?, ?, 0)`,
        [username, email, password, createdAt],
        function (err) {
          if (err) return res.status(500).json({ ok: false, error: "DB insert failed" });
          return res.json({ ok: true });
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
