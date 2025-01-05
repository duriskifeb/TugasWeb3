import db from "../config/database.js";

// Create Product
export const createProduct = async (req, res) => {
  const {
    kode_produk,
    nama,
    kategori,
    harga,
    stok,
    deskripsi,
    status,
    user_id,
  } = req.body;
  try {
    await db.execute(
      "INSERT INTO produk (kode_produk, nama, kategori, harga, stok, deskripsi, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [kode_produk, nama, kategori, harga, stok, deskripsi, status, user_id]
    );
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM produk");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product By ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM produk WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    kode_produk,
    nama,
    kategori,
    harga,
    stok,
    deskripsi,
    status,
    user_id,
  } = req.body;

  // Pastikan semua field memiliki nilai yang valid
  const updatedData = {
    kode_produk: kode_produk || null,
    nama: nama || null,
    kategori: kategori || null,
    harga: harga || null,
    stok: stok || null,
    deskripsi: deskripsi || null,
    status: status || null,
    user_id: user_id || null,
  };

  try {
    await db.execute(
      "UPDATE produk SET kode_produk = ?, nama = ?, kategori = ?, harga = ?, stok = ?, deskripsi = ?, status = ?, user_id = ? WHERE id = ?",
      [
        updatedData.kode_produk,
        updatedData.nama,
        updatedData.kategori,
        updatedData.harga,
        updatedData.stok,
        updatedData.deskripsi,
        updatedData.status,
        updatedData.user_id,
        id,
      ]
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM produk WHERE id = ?", [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
