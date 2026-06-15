const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    // Seed default admin if no users exist (for first time setup)
    if (!user && email === "admin@b2b.com" && password === "admin123") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      user = await User.create({
        email: "admin@b2b.com",
        password: hashedPassword,
        role: "admin",
        status: "approved",
      });
    } else if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (user.role === 'staff' && user.status !== 'approved') {
      return res.status(403).json({ message: "Account is pending approval or deactivated" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        status: user.status
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role, status: user.status });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Staff Signup
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "staff",
      status: "pending",
    });

    res.status(201).json({ message: "Registration successful! Please wait for admin approval." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
