const User = require("../models/User")



// async function updateUser(req, res){
//     if (req.body.password) {
//         req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: req.body
//             },
//             {
//                 new: true
//             }
//         )

//         res.status(200).json(updatedUser)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

async function  deleteUser(req, res){
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
}

async function  getUser(req, res){
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllUsers(req, res) {
    const query = req.query.new
    try {
        const users = query
            ? await User.find().sort({createdAt: -1}).limit(5)
            : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


// async function addUserOrder(req, res) {
//   const { userId, orderData } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.orders.push(orderData);

//     await user.save();

//     res.status(200).json({ message: "Order added to user successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// async function getUserOrders(req, res) {
//     const { userId } = req.params;
  
//     try {
//       // Find the user by userId
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       const orders = user.orders;
//       res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }


// async function deleteUserOrder(req, res) {
//   const { userId, orderId } = req.params;

//   try {

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const orderIndex = user.orders.findIndex((order) => order._id.toString() === orderId);

//     if (orderIndex === -1) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     user.orders.splice(orderIndex, 1);

//     await user.save();

//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // async function getUserStats(req, res) {
// //     const date = new Date()
// //     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

// //     try {
// //         const data = await User.aggregate([
// //             { $match: {createdAt: { $gte: lastYear }} },
// //             { $project: { month: { $month: "$createdAt" } } },
// //             { $group: { _id: "$month", total: { $sum: 1 } } }
// //         ])
// //         res.status(200).json(data)
// //     } catch (error) {
// //         res.status(500).json(error)
// //     }
// // }


module.exports = { deleteUser, getUser, getAllUsers }


