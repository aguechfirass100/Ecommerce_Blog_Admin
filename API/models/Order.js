const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                productId: {
                    type: String
                },
                title: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                img: {
                    type: String
                },
                price: {
                    type: Number
                }
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: false
        },
        status: {
            type: String,
            default: "Pending"
        },
        quantity: {
            type: Number
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)