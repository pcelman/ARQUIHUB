const express = require("express")
const router = express.Router();
const { getReviewReports, createReviewReport, updateReviewReport,  deleteReviewReport,} = require("../controllers/reviewReport")

router.get("/", getReviewReports)
/* router.get("/:id", getReviewReport) */
router.post("/", createReviewReport)
router.put("/:id", updateReviewReport)
router.delete("/:id", deleteReviewReport) 

module.exports = router;
