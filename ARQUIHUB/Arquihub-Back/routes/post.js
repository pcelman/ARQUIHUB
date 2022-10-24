const express = require("express")
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, getPost} = require("../controllers/post")
const {verifyToken,  isAdmin, isSuperAdmin, isMember}= require("../middlewares")

router.get("/", getPosts)
router.get("/:id", getPost)
// router.post("/",verifyToken, createPost)
router.post("/", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
// router.put("/:id",verifyToken, updatePost)
// router.delete("/:id",[verifyToken, isAdmin], deletePost)

module.exports = router;
