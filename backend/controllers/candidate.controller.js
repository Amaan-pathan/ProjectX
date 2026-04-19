const Candidate = require("../models/Candidate.model");

// Email & phone validation
const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^[6-9]\d{9}$/;

// CREATE
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;

    if (!emailRegex.test(email))
      return res.status(400).json({ error: "Invalid email" });

    if (!phoneRegex.test(phone))
      return res.status(400).json({ error: "Invalid phone number" });

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl: req.file ? req.file.path : ""
    });

    return res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// READ
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    return res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE STATUS
exports.updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Reviewed", "Hired"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!candidate)
      return res.status(404).json({ error: "Candidate not found" });

    return res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

