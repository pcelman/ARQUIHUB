const express = require("express")
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getUser }= require("../controllers/user")
const {verifyToken,  isAdmin, isSuperAdmin, isMember}= require("../middlewares")

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.put("/:id",verifyToken, updateUser)
router.delete("/:id",[verifyToken,isAdmin], deleteUser)

module.exports = router;