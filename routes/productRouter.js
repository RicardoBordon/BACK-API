import { Router } from "express";
import { createProduct, deleteProduct } from "../controllers/productControllers.js";
import { allProducts } from "../controllers/productControllers.js";
import { updateProduct } from "../controllers/productControllers.js";
import multer from "multer";

const router = Router();

router.post("/createProduct", createProduct);
router.get("/allProducts", allProducts);
router.post("/deleteProduct/:item", deleteProduct);
router.post("/updateProduct/:item", updateProduct);


export default router;