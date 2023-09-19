const router = require("express").Router()
const articleController = require("../controllers/articleController")

// CREATE Article
router.post("/", articleController.createArticle)

// UPDATE Article
router.put("/:id", articleController.updateArticle)

// DELETE Article
router.delete("/:id", articleController.deleteArticle)

// GET Article
router.get("/find/:id", articleController.getArticle)

// GET ALL Articles
router.get("/", articleController.getAllArticles)

module.exports = router