const express = require("express")
const router = express.Router();
const { getReviews, createReview, updateReview, deleteReview, getReview} = require("../controllers/review")

router.get("/", getReviews)
router.get("/:id/:mood", getReview)
router.post("/", createReview)
router.put("/:id", updateReview)
router.delete("/:id", deleteReview)

module.exports = router;
