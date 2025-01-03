import express from "express";
// const bodyParser = require("body-parser");
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan authRouter untuk menangani rute login dan register
app.use("/user", userRoutes);

// Tambahkan middleware untuk rute produk
app.use("/product", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
