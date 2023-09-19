const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const cartController = require("../controllers/cartController")

const router = require("express").Router()

// CREATE
router.post("/", verifyToken, cartController.createCart)

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart)

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart)

// GET USER PRODUCT
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.userCart)

// // GET ALL carts
router.get("/", verifyTokenAndAdmin, cartController.allCarts)

module.exports = router