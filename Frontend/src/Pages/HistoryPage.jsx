import React, { useState, useEffect } from "react";
import Navbar from "../Components/Nav";

const HistoryPage = () => {
  const [salesHistory, setSalesHistory] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Menyimpan produk yang sedang diedit
  const [updatedProduct, setUpdatedProduct] = useState({
    kode_produk: "",
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Mengontrol status modal

  // Fungsi untuk mengambil data dari API menggunakan fetch
  const fetchSalesHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/viewAll"); // Sesuaikan URL dengan endpoint Anda
      const data = await response.json();
      setSalesHistory(data); // Menyimpan data ke state
    } catch (error) {
      console.error("Failed to fetch sales history:", error.message);
    }
  };

  // Fungsi untuk meng-handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani klik tombol edit dan membuka modal
  const handleEditClick = (product) => {
    setEditProduct(product); // Menyimpan produk yang akan diedit
    setUpdatedProduct({
      kode_produk: product.kode_produk,
      nama: product.nama,
      kategori: product.kategori,
      harga: product.harga,
      stok: product.stok,
      status: product.status,
    });
    setIsModalOpen(true); // Membuka modal
  };

  // Fungsi untuk menyimpan perubahan ke backend
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/edit/${editProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        alert("Produk berhasil diperbarui!");
        fetchSalesHistory(); // Ambil data terbaru setelah update
        setIsModalOpen(false); // Tutup modal
      } else {
        alert("Gagal memperbarui produk.");
      }
    } catch (error) {
      console.error("Failed to update product:", error.message);
    }
  };

  // Fungsi untuk menangani penghapusan produk
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/product/delete/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Produk berhasil dihapus!");
          fetchSalesHistory(); // Ambil data terbaru setelah dihapus
        } else {
          alert("Gagal menghapus produk.");
        }
      } catch (error) {
        console.error("Failed to delete product:", error.message);
        alert(`Gagal menghapus produk: ${error.message}`);
      }
    }
  };

  // Ambil data ketika komponen dimuat
  useEffect(() => {
    fetchSalesHistory();
  }, []); // [] memastikan fungsi hanya dijalankan sekali saat komponen dimuat

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-0 mt-3">
      <Navbar className="mt-0" />
      <h1 className="text-2xl font-bold mb-6">History Penjualan</h1>

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
              <th className="py-2 px-4 border-b">Aksi</th> {/* Kolom aksi */}
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
                    onClick={() => handleDelete(product.id)} // Menambahkan tombol delete
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

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
            <div>
              <label>Nama Produk</label>
              <input
                type="text"
                name="nama"
                value={updatedProduct.nama}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border"
              />
            </div>
            <div>
              <label>Kategori</label>
              <input
                type="text"
                name="kategori"
                value={updatedProduct.kategori}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border"
              />
            </div>
            <div>
              <label>Harga</label>
              <input
                type="number"
                name="harga"
                value={updatedProduct.harga}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border"
              />
            </div>
            <div>
              <label>Stok</label>
              <input
                type="number"
                name="stok"
                value={updatedProduct.stok}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border"
              />
            </div>
            <div>
              <label>Status</label>
              <select
                name="status"
                value={updatedProduct.status}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border"
              >
                <option value="aktif">Aktif</option>
                <option value="nonactive">Nonaktif</option>
              </select>
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Produk
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
