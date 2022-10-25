const express = require("express")
const router = express.Router();
const { postWebhooks, getWebhooks } = require("../controllers/webhooks")

router.get("/", getWebhooks)
router.post("/", express.raw({type: 'application/json'}), postWebhooks)
router.put("/:id")
router.delete("/:id")


module.exports = router;