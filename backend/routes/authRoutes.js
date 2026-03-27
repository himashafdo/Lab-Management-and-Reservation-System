const express = require("express");
const router = express.Router();

const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send(err);

    res.send("User registered");
  });
});

// 🔐 LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user.user_id }, "secretkey", {
      expiresIn: "1h",
    });

    res.json({ token });
  });
});

// 🔒 PROTECTED ROUTE
router.get("/protected", authMiddleware, (req, res) => {
  res.send("Protected route accessed");
});

module.exports = router;
