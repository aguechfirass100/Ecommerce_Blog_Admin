const mongoose = require("mongoose")

const SuggestedArticleSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
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
        },
        isAccepted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("SuggestedArticle", SuggestedArticleSchema)