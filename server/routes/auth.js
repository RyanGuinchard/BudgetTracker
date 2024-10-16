const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create the user
    const newUser = new User({ username: username, password: password });

    // Save the user
    await newUser.save();

    // Send success response
    return res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Login Route

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "User not found" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        // Create and send a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

        return res.json({ token });
    } catch (err) {
        console.error("Error logging in: ", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = router;
