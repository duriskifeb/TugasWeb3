import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct); // Create product
router.get("/viewAll", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get product by ID
router.put("/edit/:id", updateProduct); // Update product by ID
router.delete("/delete/:id", deleteProduct); // Delete product by ID

export default router;
