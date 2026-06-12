const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Enquiry } = require("../models");

// Get all enquiries (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.json(enquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new enquiry (Public)
router.post("/", async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json({ message: "Enquiry submitted successfully!", id: newEnquiry.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
