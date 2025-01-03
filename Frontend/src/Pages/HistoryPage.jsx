import React, { useState, useEffect } from "react";
import axios from "axios";

const HistoryPage = () => {
  const [salesHistory, setSalesHistory] = useState([]);

  // Fungsi untuk mengambil data dari API
  const fetchSalesHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/viewAll"); // Sesuaikan URL dengan endpoint Anda
      setSalesHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch sales history:", error.message);
    }
  };

  // Ambil data ketika komponen dimuat
  useEffect(() => {
    fetchSalesHistory();
  }, []);

  return (
    <div className="p-6">
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Belum ada data produk.</p>
      )}
    </div>
  );
};

export default HistoryPage;
