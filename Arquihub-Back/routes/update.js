const express = require("express")
const router = express.Router();
const { getUpdates, createUpdate, putUpdate, deleteUpdate} = require("../controllers/update")

router.get("/", getUpdates)
router.post("/", createUpdate)
router.put("/:id", putUpdate)
router.delete("/:id", deleteUpdate)


module.exports = router;