const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken")

const router = require("express").Router()
const productController = require("../controllers/productController")

// CREATE
router.post("/", verifyTokenAndAdmin, productController.createProduct)

// UPDATE
router.put("/:id", productController.updateProduct)

// DELETE
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct)

// GET PRODUCT
router.get("/find/:id", productController.getProduct)

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts)

module.exports = router