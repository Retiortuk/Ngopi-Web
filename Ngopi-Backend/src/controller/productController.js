import asynchandler from 'express-async-handler';
import Product from '../models/productModel.js';

// GET ALL PRODUCTS
const getProducts = asynchandler(async(req, res)=> {
    const products = await Product.find({});
    res.json(products);
});

// POST Product
const postProduct = asynchandler(async(req,res)=> {
    const {name, price, image} = req.body;

    // gak boleh kosong
    if(!name || !price || !image){
        res.status(400);
        throw new Error('Nama, Harga, Gambar Item Tidak boleh kosong');
    } 

    const product = new Product({
        name,
        price,
        image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

export {getProducts, postProduct};