const express = require("express")
const router = express.Router();
const { getProducts, createProduct, putProduct} = require("../controllers/product")

router.get("/", getProducts)
router.post("/", createProduct)
router.put("/:id", putProduct)


module.exports = router;