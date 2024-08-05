const pool = require("../database");
const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  const { email, password } = req.query;
  try {
    // Find user by email
    const finduser = await pool.query("SELECT * FROM auth WHERE email = $1", [email]);
    const user = finduser.rows[0];

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password matches
    if (user.pass !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If everything is okay
    res.send({status:200, user: user})
    
  } catch (err) {
    console.log("Something went wrong", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
