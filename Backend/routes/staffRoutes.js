const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, Enquiry } = require("../models");
const bcrypt = require("bcrypt");

// Get all staff (Admin only)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  try {
    const staff = await User.findAll({ 
      where: { role: "staff" },
      attributes: { exclude: ['password'] }
    });
    
    // Also fetch stats for each staff member
    const staffWithStats = await Promise.all(staff.map(async (s) => {
      const enquiries = await Enquiry.findAll({ where: { assignedTo: s.id } });
      const stats = {
        totalAssigned: enquiries.length,
        inProgress: enquiries.filter(e => e.status === "In Progress" || e.status === "Requirements Gathering").length,
        dealDone: enquiries.filter(e => e.status === "Deal Done").length,
        pending: enquiries.filter(e => e.status === "Pending" || e.status === "Contacted").length,
      };
      return { ...s.toJSON(), stats };
    }));

    res.json(staffWithStats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update staff status (Admin only)
router.put("/:id/status", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  try {
    const staff = await User.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    staff.status = req.body.status;
    await staff.save();
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Staff Profile (Staff only)
router.put("/profile", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, phone, password } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get Staff Stats (Staff only)
router.get("/stats", auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { assignedTo: req.user.id } });
    const stats = {
      assigned: enquiries.length,
      progress: enquiries.filter(e => e.status === "In Progress" || e.status === "Requirements Gathering").length,
      successful: enquiries.filter(e => e.status === "Deal Done").length,
      pending: enquiries.filter(e => e.status === "Pending" || e.status === "Contacted").length,
    };
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
