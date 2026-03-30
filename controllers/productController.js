import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "access denied. admin only"
        });
        return
    }


    try {
        
        const existingProduct = await Product.findOne({
            productId : req.body.productId
        });

        if(existingProduct != null){
            res.status(400).json({
                message : "product with this productId already exists"
            });
            return
        }

        const newProduct = new Product({
            productId : req.body.productId,
            name : req.body.name,
            altName : req.body.altName,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            category : req.body.category,
            isAvailable : req.body.isAvailable,
            stock : req.body.stock,
        });

        await newProduct.save();

        res.status(201).json({
            message : "product create success"
        });

    } catch (error) {
        console.error("FULL ERROR:", error);

        res.status(500).json({
            message : error.message,
            error: error
        });
    }
}


export async function getAllProducts(req, res){

    try {

        if(isAdmin(req)){
            const products = await Product.find();
            res.json(products);
        } else {
            const products = await Product.find({ isAvailable: true });
            res.json(products);
        }
        
    } catch (error) {
        res.status(500).json({
            message : "error fatching product"
        });
    }
}


export async function deleteProduct(req, res){

     if(!isAdmin(req)){
        res.status(403).json({
            message : "access denied. admin only"
        });
        return
    }

    try {
        
        await Product.deleteOne({
            productId : req.params.productId
        })
        res.json({
            message : "delete product"
        });

    } catch (error) {
        res.status(500).json({
            message : "error delete product"
        });
    }
}


export async function updateProduct(req, res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "access denied. admin only"
        });
        return
    }

    try {
        
        await Product.updateOne({
            productId : req.params.productId
        },{
            name : req.body.name,
            altName : req.body.altName,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            category : req.body.category,
            isAvailable : req.body.isAvailable,
            stock : req.body.stock,
        });

        res.json({
            message : "product updated success"
        });
        
    } catch (error) {
        res.status(500).json({
            message : "error updating product"
        });
    }
}


export async function getProductById(req, res){
    try {
        const product = await Product.findOne({
            productId : req.params.productId
        });

        if(product == null){
            res.status(404).json({
                message : "product not found"
            });
        } else {
            if (product.isAvailable) {
                res.json(product);
            } else {
                if (isAdmin(req)) {
                    res.json(product);
                } else {
                    res.status(403).json({
                        message : "access denied. Admin only"
                    });
                }
            }
        }

    } catch (error) {
         res.status(500).json({
            message : "error fetching product"
        });
    }
}