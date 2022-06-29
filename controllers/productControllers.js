import { Product } from "../models/product.js";
import util from "util";
import cloudinary  from 'cloudinary'
import multer from "multer";
import express from "express";

cloudinary.config({ 
    cloud_name : process.env.CLUD_NAME , 
    api_key : process.env.API_KEY , 
    api_secret : process.env.API_SECRET ,
    upload_preset: process.env.UPLOAD_PRESET,
    seguro : process.env.SEG  
 });

//CREAR PRODUCTO
export const createProduct = async(req, res) => {
    
    console.log(req.body);
    const {item, name, image, description, price, cstock} = req.body;

    try {
        const product= new Product({item, name, image, description, price, cstock});
        

    await product.save();
        
    return res.status(201).json({ok: "guardado en db"});
        
    } catch (error) {

        console.log(error._message);
        const imgID =  image.split("/").pop().split(".")[0];  
        cloudinary.uploader.destroy(imgID, async (error, result) => { console.log(result, error) });

    }
};

// ACTUALIZAR PRODUCTO
export const updateProduct = async(req, res) => {
    const {item, name, image, description, price, cstock} = req.body;

      const product = await Product.updateOne({item: req.params.item});
      if (product) {
        product.item = item || product.item;
        product.name = name || product.name;
        product.image = image || product.image;
        product.description = description || product.description;
        product.price = price || product.price;
        product.cstock = cstock || product.cstock;
        
        console.log(product);
        const updateItem = await Product.updateOne(product);
        res.json(updateItem);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    };


 //BORRAR PRODRUCTO 
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.find({item: req.params.item});

    if (product) {
      await Product.deleteOne({item: req.params.item})
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }   
    } catch (error) {
        console.log(error);
    }
    }


//MOSTRAR TODOS LOS PRODUCTOS
export const allProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        
        return res.json(product);
    } catch (error) {
        console.log(error);
    }
}

