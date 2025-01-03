import React, { useState } from "react";
import Modal from "react-modal";

// Styling untuk modal
const customStyles = {
  content: {
    top: "53%",
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

// Bind modal ke root element (penting untuk aksesibilitas)
Modal.setAppElement("#root");

const ProductForm = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    kodeProduk: "",
    namaProduk: "",
    kategoriProduk: "",
    hargaJual: "",
    stokTersedia: "",
    deskripsi: "",
    statusProduk: "aktif"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // Hapus error saat pengguna mulai mengisi field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const dataToSend = {
        kode_produk: formData.kodeProduk,
        nama: formData.namaProduk,
        kategori: formData.kategoriProduk,
        harga: formData.hargaJual,
        stok: formData.stokTersedia,
        deskripsi: formData.deskripsi,
        status: formData.statusProduk
      };

      console.log("Form Data Submitted:", dataToSend);
      onRequestClose(); // Tutup modal setelah submit
    }
  };

  const validateForm = (form) => {
    const errors = {};
    if (!form.kodeProduk.trim()) errors.kodeProduk = "Kode produk wajib diisi";
    if (!form.namaProduk.trim()) errors.namaProduk = "Nama produk wajib diisi";
    if (!form.kategoriProduk)
      errors.kategoriProduk = "Kategori produk wajib dipilih";
    if (!form.hargaJual) errors.hargaJual = "Harga jual wajib diisi";
    if (!form.stokTersedia) errors.stokTersedia = "Stok tersedia wajib diisi";
    return errors;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Form Produk"
      closeTimeoutMS={300}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Form Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Kode Produk */}
        <div>
          <label className="block text-sm font-medium mb-1">Kode Produk</label>
          <input
            type="text"
            name="kodeProduk"
            value={formData.kodeProduk}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.kodeProduk ? "border border-red-500" : ""
            }`}
          />
          {errors.kodeProduk && (
            <span className="text-red-500 text-sm">{errors.kodeProduk}</span>
          )}
        </div>

        {/* Nama Produk */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            name="namaProduk"
            value={formData.namaProduk}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.namaProduk ? "border border-red-500" : ""
            }`}
          />
          {errors.namaProduk && (
            <span className="text-red-500 text-sm">{errors.namaProduk}</span>
          )}
        </div>

        {/* Kategori Produk */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Kategori Produk
          </label>
          <select
            name="kategoriProduk"
            value={formData.kategoriProduk}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.kategoriProduk ? "border border-red-500" : ""
            }`}
          >
            <option value="">Pilih kategori</option>
            <option value="elektronik">Elektronik</option>
            <option value="fashion">Fashion</option>
            <option value="makanan">Makanan</option>
          </select>
          {errors.kategoriProduk && (
            <span className="text-red-500 text-sm">
              {errors.kategoriProduk}
            </span>
          )}
        </div>

        {/* Harga Jual */}
        <div>
          <label className="block text-sm font-medium mb-1">Harga Jual</label>
          <input
            type="number"
            name="hargaJual"
            value={formData.hargaJual}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.hargaJual ? "border border-red-500" : ""
            }`}
          />
          {errors.hargaJual && (
            <span className="text-red-500 text-sm">{errors.hargaJual}</span>
          )}
        </div>

        {/* Stok Tersedia */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Stok Tersedia
          </label>
          <input
            type="number"
            name="stokTersedia"
            value={formData.stokTersedia}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.stokTersedia ? "border border-red-500" : ""
            }`}
          />
          {errors.stokTersedia && (
            <span className="text-red-500 text-sm">{errors.stokTersedia}</span>
          )}
        </div>

        {/* Deskripsi Produk */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Deskripsi Produk
          </label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        {/* Status Produk */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status Produk
          </label>
          <select
            name="statusProduk"
            value={formData.statusProduk}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="aktif">Aktif</option>
            <option value="tidak-aktif">Tidak Aktif</option>
          </select>
        </div>

    
        {/* Tombol */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
