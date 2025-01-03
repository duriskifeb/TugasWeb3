// import db from "../config/database.js";

// // Create Sales Transaction
// export const createSales = async (req, res) => {
//   const { kode_transaksi, produk_id, jumlah, total_harga, keterangan } =
//     req.body;
//   try {
//     await db.execute(
//       "INSERT INTO penjualan (kode_transaksi, produk_id, jumlah, total_harga, keterangan) VALUES (?, ?, ?, ?, ?)",
//       [kode_transaksi, produk_id, jumlah, total_harga, keterangan]
//     );
//     res.status(201).json({ message: "Sales transaction created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Sales Transactions
// export const getAllSales = async (req, res) => {
//   try {
//     const [rows] = await db.execute(`
//       SELECT penjualan.*, produk.nama AS nama_produk
//       FROM penjualan
//       JOIN produk ON penjualan.produk_id = produk.id
//     `);
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Sales Transaction By ID
// export const getSalesById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await db.execute(
//       `SELECT penjualan.*, produk.nama AS nama_produk 
//        FROM penjualan 
//        JOIN produk ON penjualan.produk_id = produk.id 
//        WHERE penjualan.id = ?`,
//       [id]
//     );
//     if (rows.length === 0)
//       return res.status(404).json({ message: "Sales transaction not found" });
//     res.status(200).json(rows[0]);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Sales Transaction
// export const updateSales = async (req, res) => {
//   const { id } = req.params;
//   const { kode_transaksi, produk_id, jumlah, total_harga, keterangan } =
//     req.body;
//   try {
//     await db.execute(
//       `UPDATE penjualan SET kode_transaksi = ?, produk_id = ?, jumlah = ?, total_harga = ?, keterangan = ? 
//        WHERE id = ?`,
//       [kode_transaksi, produk_id, jumlah, total_harga, keterangan, id]
//     );
//     res.status(200).json({ message: "Sales transaction updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Sales Transaction
// export const deleteSales = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.execute("DELETE FROM penjualan WHERE id = ?", [id]);
//     res.status(200).json({ message: "Sales transaction deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
