const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const orderController = require("../controllers/orderController")

//CREATE
router.post("/", verifyToken, orderController.createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);

//DELETE
router.delete("/:id", orderController.deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyToken, orderController.userOrders);

// //GET ALL
router.get("/", verifyTokenAndAdmin, orderController.allOrders);


// GET MONTHLY INCOME
//router.get("/income", verifyTokenAndAdmin, orderController.monthlyIncome);


module.exports = router;