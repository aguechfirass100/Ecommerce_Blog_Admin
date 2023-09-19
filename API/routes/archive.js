const router = require("express").Router()
const archiveController = require("../controllers/archiveController")

// CREATE archive
router.post("/", archiveController.createArchive)

// GET ALL archive
router.get("/", archiveController.getAllArchive)

module.exports = router