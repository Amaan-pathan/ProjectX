const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  createCandidate,
  getCandidates,
  updateCandidateStatus,
  deleteCandidate
} = require("../controllers/candidate.controller");

router.post("/", upload.single("resume"), createCandidate);
router.get("/", getCandidates);
router.put("/:id/status", updateCandidateStatus);
router.delete("/:id", deleteCandidate);

module.exports = router;

// testing code
// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   console.log("GET /candidates route hit");
//   res.status(200).json([]);
// });

// module.exports = router;


