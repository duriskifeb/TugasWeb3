import React, { useState, useEffect } from "react";
import Navbar from "../Components/Nav";

const HistoryPage = () => {
  const [salesHistory, setSalesHistory] = useState([]);
  const [penjualanHistory, setPenjualanHistory] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    kode_produk: "",
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk mengambil data produk
  const fetchSalesHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/viewAll");
      const data = await response.json();
      setSalesHistory(data);
    } catch (error) {
      console.error("Failed to fetch sales history:", error.message);
    }
  };

  // Fungsi untuk mengambil data penjualan
  const fetchPenjualanHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/penjual/all");
      const data = await response.json();
      setPenjualanHistory(data);
    } catch (error) {
      console.error("Failed to fetch penjualan history:", error.message);
    }
  };

  // Fungsi untuk menghapus penjualan
  const handleDeletePenjualan = async (idPenjualan) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus penjualan ini?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/penjual/delete/${idPenjualan}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Penjualan berhasil dihapus!");
          fetchPenjualanHistory(); // Ambil data terbaru setelah dihapus
        } else {
          alert("Gagal menghapus penjualan.");
        }
      } catch (error) {
        console.error("Failed to delete penjualan:", error.message);
        alert(`Gagal menghapus penjualan: ${error.message}`);
      }
    }
  };

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchSalesHistory();
    fetchPenjualanHistory();
  }, []);

  // ... (kode lainnya tetap sama)

  return (
    <div className="p-0 mt-3">
      <Navbar className="mt-0" />
      <h1 className="text-2xl font-bold mb-6">History Penjualan</h1>

      {/* Tabel Produk */}
      <h2 className="text-xl font-bold mb-4">Data Produk</h2>
      {salesHistory.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Kode Produk</th>
              <th className="py-2 px-4 border-b">Nama Produk</th>
              <th className="py-2 px-4 border-b">Kategori</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Stok</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.kode_produk}</td>
                <td className="py-2 px-4 border-b">{product.nama}</td>
                <td className="py-2 px-4 border-b">{product.kategori}</td>
                <td className="py-2 px-4 border-b">{product.harga}</td>
                <td className="py-2 px-4 border-b">{product.stok}</td>
                <td className="py-2 px-4 border-b">{product.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Belum ada data produk.</p>
      )}

      {/* Tabel Penjualan */}
      <h2 className="text-xl font-bold mt-8 mb-4">Data Penjualan</h2>
      {penjualanHistory.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Kode Transaksi</th>
              <th className="py-2 px-4 border-b">Nama Produk</th>
              <th className="py-2 px-4 border-b">Sales ID</th>
              <th className="py-2 px-4 border-b">Jumlah</th>
              <th className="py-2 px-4 border-b">Total Harga</th>
              <th className="py-2 px-4 border-b">Nama Customer</th>
              <th className="py-2 px-4 border-b">Aksi</th>{" "}
              {/* Kolom baru untuk aksi */}
            </tr>
          </thead>
          <tbody>
            {penjualanHistory.map((penjualan) => (
              <tr key={penjualan.idPenjualan} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {penjualan.kode_transaksi}
                </td>
                <td className="py-2 px-4 border-b">{penjualan.nama_produk}</td>
                <td className="py-2 px-4 border-b">{penjualan.sales_id}</td>
                <td className="py-2 px-4 border-b">{penjualan.jumlah}</td>
                <td className="py-2 px-4 border-b">{penjualan.total_harga}</td>
                <td className="py-2 px-4 border-b">
                  {penjualan.nama_customer}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDeletePenjualan(penjualan.idPenjualan)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Belum ada data penjualan.</p>
      )}

      {/* Modal Edit (kode modal tetap sama) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
            {/* ... (kode modal tetap sama) */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
