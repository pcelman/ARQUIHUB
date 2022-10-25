const express = require("express");
const router = express.Router();
const { updateUserProject, deleteUserProject} = require("../controllers/userproject")


router.put("/:id", updateUserProject)
router.delete("/:id", deleteUserProject)

module.exports = router;
