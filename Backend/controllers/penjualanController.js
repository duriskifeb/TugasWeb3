import db from "../config/database.js"; // Pastikan sudah ada konfigurasi database

// Input Penjualan
export const createPenjualan = async (req, res) => {
  try {
    const {
      kode_transaksi,
      produk_id,
      sales_id,
      jumlah,
      total_harga,
      nama_customer,
    } = req.body;

    // Validasi input data
    if (!kode_transaksi || !produk_id || !sales_id || !jumlah || !total_harga) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }


    const values = [
      kode_transaksi || null,
      produk_id || null,
      sales_id || null,
      jumlah || null,
      total_harga || null,
      nama_customer || null,
    ];

    const query = `
      INSERT INTO penjualan (kode_transaksi, produk_id, sales_id, jumlah, total_harga, nama_customer)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, values);

    // console.log("Query executed successfully:", result);
    res.status(201).json({ message: "Penjualan berhasil ditambahkan!" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Mengambil semua data penjualan
export const getAllPenjualan = async (req, res) => {
  try {
    const query = `
      SELECT penjualan.*, produk.nama AS nama_produk
      FROM penjualan
      JOIN produk ON penjualan.produk_id = produk.id
    `;

    const [rows] = await db.execute(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tidak ada data penjualan." });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};


// export const deletePenjualan = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Query untuk menghapus penjualan berdasarkan id
//     const query = `DELETE FROM penjualan WHERE id = ?`;

//     // Eksekusi query
//     const [result] = await db.execute(query, [id]);

//     // Mengecek apakah penjualan ditemukan dan dihapus
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Penjualan tidak ditemukan." });
//     }

//     res.status(200).json({ message: "Penjualan berhasil dihapus!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Terjadi kesalahan pada server." });
//   }
// };

export const deletePenjualan = async (req, res) => {
  try {
    const { penjualan_id } = req.params;

    // Query untuk menghapus penjualan berdasarkan penjualan_id
    const query = `DELETE FROM penjualan WHERE idPenjualan = ?`;

    // Eksekusi query
    const [result] = await db.execute(query, [penjualan_id]);

    // Mengecek apakah penjualan ditemukan dan dihapus
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Penjualan tidak ditemukan." });
    }

    res.status(200).json({ message: "Penjualan berhasil dihapus!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};


// Melihat Penjualan berdasarkan ID Sales
export const getPenjualanBySales = async (req, res) => {
  try {
    const { sales_id } = req.params;

    const query = `SELECT penjualan.*, produk.nama AS nama_produk
                    FROM penjualan
                    JOIN produk ON penjualan.produk_id = produk.id
                    WHERE penjualan.sales_id = ?`;

    //`
    //             SELECT penjualan.*, produk.nama AS nama_produk
    //             FROM penjualan
    //             JOIN produk ON penjualan.produk_id = produk.idProduk
    //             WHERE penjualan.sales_id = ?
    //         `;

    const [rows] = await db.execute(query, [sales_id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Penjualan tidak ditemukan untuk sales ini." });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
