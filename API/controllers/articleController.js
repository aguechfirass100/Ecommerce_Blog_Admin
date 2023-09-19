const Article = require("../models/Article")

async function createArticle(req, res){
    
    const newArticle = new Article(req.body)

    try {
        const savedArticle = await newArticle.save()
        res.status(200).json(savedArticle)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function updateArticle(req, res){
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )

        res.status(200).json(updatedArticle)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function deleteArticle(req, res) {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.status(200).json("Article has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getArticle(req, res) {
    try {
        const article = await Article.findById(req.params.id)
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllArticles(req, res) {
    try {
        const articles = await Article.find()
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createArticle, updateArticle, deleteArticle, getArticle, getAllArticles }
