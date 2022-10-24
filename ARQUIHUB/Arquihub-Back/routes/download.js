const express = require("express");
const router = express.Router();
const {/*  getDownloads, */ createDownload,/*  updateDownload, deleteDownload, getDownload */} = require("../controllers/download")

/* router.get("/", getDownloads)
router.get("/:id", getDownload) */
router.post("/", createDownload)
/* router.put("/:id", updateDownload)
router.delete("/:id", deleteDownload) */

module.exports = router;
