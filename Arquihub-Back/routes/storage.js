const express = require("express");
const { createStorage, getStorages, getStorageById, deleteStorage } = require("../controllers/storage");
const router = express.Router();
const uploadMiddleware  = require("../utils/handleStorage")

router.post("/", uploadMiddleware.single("file"), createStorage)
router.get("/", getStorages);
router.get("/:id", getStorageById);
router.delete("/:id", deleteStorage);


module.exports = router;