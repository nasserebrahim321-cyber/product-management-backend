const router = require('express').Router()
const Product = require('../model/Product')

router.get('/', async (req, res) => {
    try {
        const AllProduct = await Product.find();
        res.status(200).json(AllProduct);
    } catch (err) {
        return res.status(500).json({ message: "products not Found" })
    }
})

router.post('/', async (req, res) => {
    try {
        const createdProduct = await Product.create(req.body);
        res.status(201).json(createdProduct)

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        if (err.code === 11000) {
            return res.status(409).json({ message: 'Product with this name already exist' })
        }

        console.log(err)
        res.status(500).json({ message: 'Product Not Found' })
    }
})

router.get('/:productID', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.productID);
        res.status(200).json(foundProduct)
    } catch (err) {
        return res.status(500).json({ message: 'the selected products is not available' })
    }
})

router.put('/:edit_productID', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.edit_productID, req.body, { returnDocument: 'after', runValidators: true });
        res.status(200).json(updatedProduct)
    } catch (err) { return res.status(500).json({ message: 'The Product is Not Found' }) }
})

router.delete('/:delete_productID', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.delete_productID)
        res.sendStatus(200)
    } catch (err) {
        return res.status(500).json({ message: 'The Product is not Found' })
    }
})

module.exports = router