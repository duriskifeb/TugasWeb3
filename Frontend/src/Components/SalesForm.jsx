import React, { useState } from "react";
import Modal from "react-modal";

// Styling untuk modal
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

// Set elemen root untuk modal
Modal.setAppElement("#root");

const SalesForm = ({ isOpen, onRequestClose, fetchSales }) => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    kode_transaksi: "",
    produk_id: "",
    sales_id: "",
    jumlah: "",
    total_harga: "",
    nama_customer: "",
  });

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi field yang wajib diisi
    if (
      !formData.kode_transaksi ||
      !formData.produk_id ||
      !formData.sales_id ||
      !formData.jumlah ||
      !formData.total_harga
    ) {
      alert(
        "Harap isi semua field yang wajib: Kode Transaksi, Produk ID, Sales ID, Jumlah, dan Total Harga!"
      );
      return;
    }

    // Sanitize data sebelum dikirim ke backend
    const sanitizedFormData = {
      kode_transaksi: formData.kode_transaksi.trim(),
      produk_id: parseInt(formData.produk_id),
      sales_id: parseInt(formData.sales_id),
      jumlah: parseInt(formData.jumlah),
      total_harga: parseFloat(formData.total_harga),
      nama_customer: formData.nama_customer.trim() || null,
    };

    console.log("Form data sebelum dikirim:", sanitizedFormData);

    try {
      // Kirim data ke backend
      const response = await fetch("http://localhost:5000/penjual/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedFormData),
      });

      const result = await response.json();
      console.log("Response dari backend:", result);

      // Jika sukses, refresh data dan tutup modal
      if (response.ok) {
        if (typeof fetchSales === "function") {
          fetchSales(); // Refresh data penjualan
        }
        onRequestClose(); // Tutup modal
      } else {
        // Jika gagal, tampilkan pesan error dari backend
        console.error("Error submitting form:", result);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      // Tangani error jaringan atau lainnya
      console.error("Error submitting form:", error);
      alert(`Error: ${error.message}`);
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
        {/* Field: Kode Transaksi */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Kode Transaksi
          </label>
          <input
            type="text"
            name="kode_transaksi"
            value={formData.kode_transaksi}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>

        {/* Field: Produk ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Produk ID</label>
          <input
            type="number"
            name="produk_id"
            value={formData.produk_id}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>

        {/* Field: Sales ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Sales ID</label>
          <input
            type="number"
            name="sales_id"
            value={formData.sales_id}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>

        {/* Field: Jumlah */}
        <div>
          <label className="block text-sm font-medium mb-1">Jumlah</label>
          <input
            type="number"
            name="jumlah"
            value={formData.jumlah}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>

        {/* Field: Total Harga */}
        <div>
          <label className="block text-sm font-medium mb-1">Total Harga</label>
          <input
            type="number"
            name="total_harga"
            value={formData.total_harga}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>

        {/* Field: Nama Customer */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Customer
          </label>
          <textarea
            name="nama_customer"
            value={formData.nama_customer}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
          ></textarea>
        </div>

        {/* Tombol Batal dan Simpan */}
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
