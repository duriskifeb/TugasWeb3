import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile); // Tambahkan route untuk mengambil profil
router.post("/update-profile", updateProfile); // Tambahkan route untuk memperbarui profil

export default router;
