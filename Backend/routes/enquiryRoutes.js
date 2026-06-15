const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Enquiry, User } = require("../models");
const { Op } = require("sequelize");

// Get all enquiries (Admin only)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  
  try {
    const { status, assignedTo, search, startDate, endDate } = req.query;
    let whereClause = {};

    if (status) whereClause.status = status;
    if (assignedTo) {
      if (assignedTo === 'unassigned') whereClause.assignedTo = null;
      else whereClause.assignedTo = assignedTo;
    }
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const enquiries = await Enquiry.findAll({ 
      where: whereClause,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'staff', attributes: ['id', 'name'] }]
    });
    res.json(enquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get assigned enquiries (Staff only)
router.get("/assigned", auth, async (req, res) => {
  try {
    const { status, search, startDate, endDate } = req.query;
    let whereClause = { assignedTo: req.user.id };

    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const enquiries = await Enquiry.findAll({ 
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    res.json(enquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update enquiry status (Staff or Admin)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    if (req.user.role !== "admin" && enquiry.assignedTo !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    enquiry.status = req.body.status;
    await enquiry.save();
    res.json(enquiry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Assign enquiry to staff (Admin only)
router.put("/:id/assign", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    enquiry.assignedTo = req.body.staffId || null;
    await enquiry.save();
    res.json(enquiry);
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
