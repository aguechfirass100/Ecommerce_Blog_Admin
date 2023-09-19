const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
const articleRoute = require('./routes/article')
const suggestedArticleRoute = require('./routes/suggestedArticle')
const archiveRoute = require('./routes/archive')
const cors = require('cors')

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB connection successfull"))
        .catch((err) => console.log(err))


app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)
app.use("/api/articles", articleRoute)
app.use("/api/suggestedArticles", suggestedArticleRoute)
app.use("/api/archive", archiveRoute)

app.listen(process.env.PORT || 5500, () => {
    console.log("Backend server is running");
})