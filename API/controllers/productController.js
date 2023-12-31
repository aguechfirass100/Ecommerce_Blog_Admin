const Product = require("../models/Product")

async function createProduct(req, res){
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function updateProduct(req, res){
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )

        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function deleteProduct(req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllProducts(req, res) {
    const queryNew = req.query.new
    const queryCategory = req.query.category
    try {
        let products

        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (queryCategory) {
            products = await Product.find( { categories: { $in: [queryCategory] } } )
        } else {
            products = await Product.find()
        }
        
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts }