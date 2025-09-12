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

// DELETE PRODUCTS
const deleteProduct = asynchandler(async(req,res)=> {
    const toDelete = await Product.findById(req.params.id);
    if(toDelete){
        await toDelete.deleteOne();
        res.json({message: 'Produk Berhasil Dihapus'})
    } else {
        res.status(404);
        throw new Error('Produk Tidak Ditemukan');
    }
});

// UPDATE Product
const updateProduct = asynchandler(async(req,res)=> {
    const product = await Product.findById(req.params.id);
    
    if(product){
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image

        const updatedProduct = await product.save();
        res.json({
            name: updatedProduct.name,
            price: updatedProduct.price,
            image: updatedProduct.image,
        });
    } else {
        res.status(404);
        throw new Error('Produk Tidak Ditemukan');
    }
});

export {getProducts, postProduct, deleteProduct, updateProduct};