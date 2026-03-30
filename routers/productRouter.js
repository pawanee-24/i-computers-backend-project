import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/create", createProduct);
productRouter.delete("/delete/:productId", deleteProduct);
productRouter.put("/update/:productId", updateProduct);
productRouter.get("/search", ()=>{
    console.log("search product");
    
});
productRouter.get("/:productId", getProductById);


export default productRouter;