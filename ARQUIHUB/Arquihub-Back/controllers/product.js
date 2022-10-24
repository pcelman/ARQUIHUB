const { productModel } = require("../models")


const getProducts = async (req, res) => {
    try {
        const allProducts = await productModel.findAllData({})
        res.send(allProducts)

    } catch (error) {
        res.status(400).send("No products found")
    }
}

const createProduct = async (req, res) => { //llegan title, description por body 
    try { 
        const { title, description, price } = req.body;

        if(!title || !description || !price){
            res.status(400).send("Missing fields to complete")
        } else {
        const newProduct = { title, description, price }
        await productModel.create(newProduct)
        res.status(200).send(newProduct)
        }
    } catch (error) {
        res.status(400).send("Can't post this Product")
    }
}

const putProduct = async (req, res) => { 
    try {
        const { id } = req.params;
        const { description, price } = req.body;

        if(!description || !price){
            res.status(400).send("A comment is needed")
        } else {
        const product = { description, price }
        await productModel.findByIdAndUpdate(id, product)
        res.send(product)
        }
    } catch (error) {
        res.status(400).send("Can't product")
    }
}



module.exports = { getProducts, createProduct, putProduct }