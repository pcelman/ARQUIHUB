const express = require("express")
const router = express.Router();
const { postPaymentSubscription, getPayment } = require("../controllers/payment")

router.get("/", getPayment)
router.post("/", postPaymentSubscription)
router.put("/")
router.delete("/")

module.exports = router;
