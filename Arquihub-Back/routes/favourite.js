const express = require("express")
const router = express.Router();
const { updateFavourites,deleteFavourites } = require("../controllers/favourites")


router.put("/:id",updateFavourites)
router.delete("/:id",deleteFavourites)

module.exports = router;
