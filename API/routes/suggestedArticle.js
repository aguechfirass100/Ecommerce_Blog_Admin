const router = require("express").Router()
const suggestedArticleController = require("../controllers/suggestedArticleController")

// CREATE Article
router.post("/", suggestedArticleController.createSuggestedArticle)

// // UPDATE Article
// router.put("/:id", suggestedArticleController.updateSuggestedArticle)

// DELETE Article
router.delete("/:id", suggestedArticleController.deleteSuggestedArticle)

// GET Article
router.get("/find/:id", suggestedArticleController.getSuggestedArticle)

// GET ALL Articles
router.get("/", suggestedArticleController.getAllSuggestedArticles)

// Accept a suggested article and convert it to a regular article
router.post('/acceptSuggestedArticle/:id', suggestedArticleController.acceptSuggestedArticle);

module.exports = router