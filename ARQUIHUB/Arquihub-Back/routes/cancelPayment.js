const express = require("express")
const router = express.Router();
const { cancelSubscription } = require("../controllers/cancelPayment")


router.get("/")
router.post("/", cancelSubscription)
router.put("/")
router.delete("/")

module.exports = router;