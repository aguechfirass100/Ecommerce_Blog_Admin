const SuggestedArticle = require("../models/SuggestedArticle")
const Article = require("../models/Article")

async function createSuggestedArticle(req, res){
    
    const newSuggestedArticle = new SuggestedArticle(req.body)

    try {
        const savedSuggestedArticle = await newSuggestedArticle.save()
        res.status(200).json(savedSuggestedArticle)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function deleteSuggestedArticle(req, res) {
    try {
        await SuggestedArticle.findByIdAndDelete(req.params.id)
        res.status(200).json("Suggested article has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getSuggestedArticle(req, res) {
    try {
        const suggestedArticle = await SuggestedArticle.findById(req.params.id)
        res.status(200).json(suggestedArticle)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllSuggestedArticles(req, res) {
    try {
        const suggestedArticles = await SuggestedArticle.find()
        res.status(200).json(suggestedArticles)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function acceptSuggestedArticle(req, res) {
    try {

      const suggestedArticle = await SuggestedArticle.findById(req.params.id)

      if (!suggestedArticle) {
        return res.status(404).json('Suggested article not found')
      }
      
      const newArticle = new Article({
        fullName: suggestedArticle.fullName,
        email: suggestedArticle.email,
        title: suggestedArticle.title,
        desc: suggestedArticle.desc,
        img: suggestedArticle.img
      })

      const savedArticle = await newArticle.save()

      await SuggestedArticle.findByIdAndDelete(req.params.id);
      
      res.status(201).json(savedArticle);

    } catch (error) {
        console.log(error)
      res.status(500).json('Failed to accept suggested article');
    }
  }

module.exports = { createSuggestedArticle, deleteSuggestedArticle, getSuggestedArticle, getAllSuggestedArticles, acceptSuggestedArticle }
