import express from "express";
const router = express.Router();
import { createPenjualan ,getPenjualanBySales, deletePenjualan } from "../controllers/penjualanController.js";

// Route untuk input penjualan
router.post("/create", createPenjualan);

// Route untuk melihat penjualan berdasarkan ID Sales
router.get(
  "/view/:sales_id", getPenjualanBySales);

router.delete("/delete/:penjualan_id", deletePenjualan);


export default router;

