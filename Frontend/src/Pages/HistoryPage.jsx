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
    deskripsi: "",
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

  // Fungsi untuk menangani klik tombol Edit
  const handleEditClick = (product) => {
    setEditProduct(product); // Set produk yang akan diedit
    setUpdatedProduct({
      kode_produk: product.kode_produk || "",
      nama: product.nama || "",
      kategori: product.kategori || "",
      harga: product.harga || "",
      stok: product.stok || "",
      deskripsi: product.deskripsi || "",
      status: product.status || "",
    });
    setIsModalOpen(true); // Buka modal edit
  };

  // Fungsi untuk menangani tombol Delete produk
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/product/delete/${id}`,
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

  // Fungsi untuk menyimpan perubahan setelah edit
  const handleSaveEdit = async () => {
    try {
      // Pastikan semua field memiliki nilai yang valid (null jika tidak diisi)
      const updatedData = {
        kode_produk: updatedProduct.kode_produk || null,
        nama: updatedProduct.nama || null,
        kategori: updatedProduct.kategori || null,
        harga: updatedProduct.harga || null,
        stok: updatedProduct.stok || null,
        deskripsi: updatedProduct.deskripsi || null,
        status: updatedProduct.status || null,
        user_id: 1, // Sesuaikan dengan ID pengguna yang login
      };

      console.log("Data yang dikirim:", updatedData); // Log data yang dikirim

      const response = await fetch(
        `http://localhost:5000/product/edit/${editProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData), // Kirim data yang sudah divalidasi
        }
      );

      const data = await response.json();
      console.log("Response dari backend:", data); // Log response dari backend

      if (response.ok) {
        alert("Produk berhasil diperbarui!");
        setIsModalOpen(false); // Tutup modal
        fetchSalesHistory(); // Ambil data terbaru setelah edit
      } else {
        alert(data.message || "Gagal memperbarui produk.");
      }
    } catch (error) {
      console.error("Failed to update product:", error.message);
      alert(`Gagal memperbarui produk: ${error.message}`);
    }
  };

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchSalesHistory();
    fetchPenjualanHistory();
  }, []);

  return (
    <div className="p-0 mt-3">
      <Navbar className="mt-0" />
      <h1 className="text-2xl font-bold mb-6">History Penjualan</h1>

      {/* Tabel Produk */}
      <h2 className="text-xl text-white font-bold mb-4">Data Produk</h2>
      {salesHistory.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Kode Produk</th>
              <th className="py-2 px-4 border-b">Nama Produk</th>
              <th className="py-2 px-4 border-b">Kategori</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Stok</th>
              <th className="py-2 px-4 border-b">Deskripsi</th>
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
                <td className="py-2 px-4 border-b">{product.deskripsi}</td>
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
      <h2 className="text-xl text-white font-bold mt-8 mb-4">Data Penjualan</h2>
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
              <th className="py-2 px-4 border-b">Aksi</th>
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

      {/* Modal Edit */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Tutup modal saat klik di luar
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            style={{
              width: "400px", // Lebar modal
              maxHeight: "80vh", // Tinggi maksimum modal
              overflowY: "auto", // Aktifkan scroll jika konten melebihi tinggi
            }}
            onClick={(e) => e.stopPropagation()} // Mencegah event bubbling ke parent
          >
            <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kode Produk
                </label>
                <input
                  type="text"
                  value={updatedProduct.kode_produk}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      kode_produk: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={updatedProduct.nama}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      nama: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kategori
                </label>
                <input
                  type="text"
                  value={updatedProduct.kategori}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      kategori: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <input
                  type="number"
                  value={updatedProduct.harga}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      harga: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stok</label>
                <input
                  type="number"
                  value={updatedProduct.stok}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      stok: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={updatedProduct.deskripsi}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      deskripsi: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={updatedProduct.status}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      status: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="aktif">Aktif</option>
                  <option value="tidak-aktif">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
