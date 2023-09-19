const Archive = require("../models/Archive")

async function createArchive(req, res){
    
    const newArchive = new Archive(req.body)

    try {
        const savedArchive = await newArchive.save()
        res.status(200).json(savedArchive)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllArchive(req, res) {
    try {
        const archives = await Archive.find()
        res.status(200).json(archives)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createArchive, getAllArchive }
