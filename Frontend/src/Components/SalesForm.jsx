// Full code provided with fixes and adjustments for frontend and backend integration

// --- Frontend ---
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1e1e1e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

const SalesForm = ({ isOpen, onRequestClose, fetchSales }) => {
  const [formData, setFormData] = useState({
    kode_transaksi: "",
    produk_id: "",
    jumlah: "",
    total_harga: "",
    keterangan: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.kode_transaksi.trim())
      errors.kode_transaksi = "Kode transaksi wajib diisi";
    if (!formData.produk_id) errors.produk_id = "Produk ID wajib diisi";
    if (!formData.jumlah) errors.jumlah = "Jumlah wajib diisi";
    if (!formData.total_harga) errors.total_harga = "Total harga wajib diisi";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/sales/create", formData);
        fetchSales(); // Refresh sales data after submission
        onRequestClose(); // Close modal
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Form Penjualan"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Form Penjualan Barang
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Kode Transaksi
          </label>
          <input
            type="text"
            name="kode_transaksi"
            value={formData.kode_transaksi}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white ${
              errors.kode_transaksi ? "border-red-500" : ""
            }`}
          />
          {errors.kode_transaksi && (
            <span className="text-red-500 text-sm">
              {errors.kode_transaksi}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Produk ID</label>
          <input
            type="number"
            name="produk_id"
            value={formData.produk_id}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white ${
              errors.produk_id ? "border-red-500" : ""
            }`}
          />
          {errors.produk_id && (
            <span className="text-red-500 text-sm">{errors.produk_id}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jumlah</label>
          <input
            type="number"
            name="jumlah"
            value={formData.jumlah}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white ${
              errors.jumlah ? "border-red-500" : ""
            }`}
          />
          {errors.jumlah && (
            <span className="text-red-500 text-sm">{errors.jumlah}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Harga</label>
          <input
            type="number"
            name="total_harga"
            value={formData.total_harga}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white ${
              errors.total_harga ? "border-red-500" : ""
            }`}
          />
          {errors.total_harga && (
            <span className="text-red-500 text-sm">{errors.total_harga}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Keterangan</label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-zinc-600 text-white rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SalesForm;

// --- Backend Adjustments ---
// The backend code provided is already functional.
// Ensure the database `penjualan` table is correctly set up, and the Express server is running.
