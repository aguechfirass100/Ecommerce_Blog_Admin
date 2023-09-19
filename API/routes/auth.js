const router = require("express").Router()

const authController = require("../controllers/authController")

// REGISTER
router.post("/register", authController.register)

// LOGIN
router.post("/login", authController.login);

// Error handler middleware
router.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({ message });
});


// LOGIN
// router.post("/login", async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username })
//         !user && res.status(401).json("Wrong username or password")

//         const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
//         const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
//         OriginalPassword !== req.body.password && res.status(401).json("Wrong username or password")

//         const accessToken = jwt.sign(
//             {
//                 id: user._id,
//                 isAdmin: user.isAdmin
//             },
//             process.env.JWT_SEC,
//             {expiresIn: "3d"}
//         )

//         const {password, ...others} = user._doc

//         res.status(200).json({...others, accessToken})        
//     } catch (error) {
//         res.status(401).json({ message: "Invalid username or password" })
//     }
// })






module.exports = router