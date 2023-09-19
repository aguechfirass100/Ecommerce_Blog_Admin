const mongoose = require("mongoose")

const ArticleSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Article", ArticleSchema)