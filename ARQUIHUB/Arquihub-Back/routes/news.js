const express = require("express");
const router = express.Router();
const newsData = require("../controllers/news");


router.get("/", newsData);

module.exports = router;
