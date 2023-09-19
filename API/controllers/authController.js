const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// async function register(req, res) {

//     const checkEmail = await User.findOne({ email: req.body.email })

//     // checkEmail && res.status(401).json("Try another email")
//     // console.log(checkEmail)
//     if (checkEmail) {
//         //throw new Error("Try another email")
//         res.status(401).json("Try another email")
//     } else {

//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
//         })

//         try {
//             const savedUser = await newUser.save()
//             res.status(201).json(savedUser)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }

// }

async function register(req, res) {
    const checkEmail = await User.findOne({ email: req.body.email })

    if (checkEmail) {
        res.status(401).json("Try another email")
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        })

        try {
            const savedUser = await newUser.save()

            const accessToken = jwt.sign(
                {
                    id: savedUser._id,
                    isAdmin: savedUser.isAdmin
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            )

            const { password, ...others } = savedUser._doc

            res.status(201).json({ ...others, accessToken })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


async function login(req, res, next) {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            const error = new Error("Wrong username or password")
            error.statusCode = 401
            throw error
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    
        if (OriginalPassword !== req.body.password) {
            const error = new Error("Wrong username or password")
            error.statusCode = 401
            throw error
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        )
        

        const { password, ...others } = user._doc
        // console.log({ ...others, accessToken });

        res.status(200).json({ ...others, accessToken })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login }