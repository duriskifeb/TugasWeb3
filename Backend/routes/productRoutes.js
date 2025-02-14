import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct); 
router.get("/viewAll", getAllProducts); 
router.get("/:id", getProductById); 
router.put("/edit/:id", updateProduct); 
router.delete("/delete/:id", deleteProduct); 

export default router;
