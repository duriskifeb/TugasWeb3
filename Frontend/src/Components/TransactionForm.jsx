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
    width: "500px", // Lebar modal diperkecil
    maxHeight: "80vh", // Maksimum tinggi modal 80% dari viewport
    overflowY: "auto", // Tambahkan scrolling vertikal
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

// Bind modal ke root element (penting untuk aksesibilitas)
Modal.setAppElement("#root");

const TransactionForm = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    nomorTransaksi: "",
    tanggalTransaksi: "",
    namaSales: "",
    statusTransaksi: "pending",
    namaPelanggan: "",
    nomorTelepon: "",
    alamatPengiriman: "",
    produk: [{ namaProduk: "", jumlah: 0, hargaSatuan: 0, totalHarga: 0 }],
    subtotal: 0,
    diskon: 0,
    totalPembayaran: 0,
    metodePembayaran: "",
    statusPembayaran: "belum",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Hapus error saat pengguna mulai mengisi field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleProdukChange = (index, e) => {
    const { name, value } = e.target;
    const newProduk = [...formData.produk];
    newProduk[index][name] = value;

    // Hitung total harga per item
    if (name === "jumlah" || name === "hargaSatuan") {
      newProduk[index].totalHarga =
        newProduk[index].jumlah * newProduk[index].hargaSatuan;
    }

    setFormData({
      ...formData,
      produk: newProduk,
    });

    // Hitung ulang subtotal
    const newSubtotal = newProduk.reduce(
      (sum, item) => sum + item.totalHarga,
      0
    );
    setFormData((prev) => ({
      ...prev,
      subtotal: newSubtotal,
      totalPembayaran: newSubtotal - prev.diskon,
    }));
  };

  const handleAddProduk = () => {
    setFormData({
      ...formData,
      produk: [
        ...formData.produk,
        { namaProduk: "", jumlah: 0, hargaSatuan: 0, totalHarga: 0 },
      ],
    });
  };

  const handleRemoveProduk = (index) => {
    const newProduk = formData.produk.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      produk: newProduk,
    });

    // Hitung ulang subtotal
    const newSubtotal = newProduk.reduce(
      (sum, item) => sum + item.totalHarga,
      0
    );
    setFormData((prev) => ({
      ...prev,
      subtotal: newSubtotal,
      totalPembayaran: newSubtotal - prev.diskon,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      onRequestClose(); // Tutup modal setelah submit
    }
  };

  const validateForm = (form) => {
    const errors = {};
    if (!form.nomorTransaksi.trim())
      errors.nomorTransaksi = "Nomor transaksi wajib diisi";
    if (!form.tanggalTransaksi)
      errors.tanggalTransaksi = "Tanggal transaksi wajib diisi";
    if (!form.namaSales.trim()) errors.namaSales = "Nama sales wajib diisi";
    if (!form.namaPelanggan.trim())
      errors.namaPelanggan = "Nama pelanggan wajib diisi";
    if (!form.nomorTelepon.trim())
      errors.nomorTelepon = "Nomor telepon wajib diisi";
    if (!form.alamatPengiriman.trim())
      errors.alamatPengiriman = "Alamat pengiriman wajib diisi";
    if (!form.metodePembayaran)
      errors.metodePembayaran = "Metode pembayaran wajib dipilih";
    return errors;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Form Transaksi Penjualan"
      closeTimeoutMS={300}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Form Transaksi Penjualan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informasi Transaksi */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nomor Transaksi
          </label>
          <input
            type="text"
            name="nomorTransaksi"
            value={formData.nomorTransaksi}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nomorTransaksi ? "border border-red-500" : ""
            }`}
          />
          {errors.nomorTransaksi && (
            <span className="text-red-500 text-sm">
              {errors.nomorTransaksi}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Transaksi
          </label>
          <input
            type="date"
            name="tanggalTransaksi"
            value={formData.tanggalTransaksi}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tanggalTransaksi ? "border border-red-500" : ""
            }`}
          />
          {errors.tanggalTransaksi && (
            <span className="text-red-500 text-sm">
              {errors.tanggalTransaksi}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nama Sales</label>
          <input
            type="text"
            name="namaSales"
            value={formData.namaSales}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.namaSales ? "border border-red-500" : ""
            }`}
          />
          {errors.namaSales && (
            <span className="text-red-500 text-sm">{errors.namaSales}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status Transaksi
          </label>
          <select
            name="statusTransaksi"
            value={formData.statusTransaksi}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>

        {/* Informasi Pelanggan */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Pelanggan
          </label>
          <input
            type="text"
            name="namaPelanggan"
            value={formData.namaPelanggan}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.namaPelanggan ? "border border-red-500" : ""
            }`}
          />
          {errors.namaPelanggan && (
            <span className="text-red-500 text-sm">{errors.namaPelanggan}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="nomorTelepon"
            value={formData.nomorTelepon}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nomorTelepon ? "border border-red-500" : ""
            }`}
          />
          {errors.nomorTelepon && (
            <span className="text-red-500 text-sm">{errors.nomorTelepon}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Alamat Pengiriman
          </label>
          <input
            type="text"
            name="alamatPengiriman"
            value={formData.alamatPengiriman}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.alamatPengiriman ? "border border-red-500" : ""
            }`}
          />
          {errors.alamatPengiriman && (
            <span className="text-red-500 text-sm">
              {errors.alamatPengiriman}
            </span>
          )}
        </div>

        {/* Detail Produk */}
        {formData.produk.map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              name="namaProduk"
              value={item.namaProduk}
              onChange={(e) => handleProdukChange(index, e)}
              className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium mb-1">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              value={item.jumlah}
              onChange={(e) => handleProdukChange(index, e)}
              className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium mb-1">
              Harga Satuan
            </label>
            <input
              type="number"
              name="hargaSatuan"
              value={item.hargaSatuan}
              onChange={(e) => handleProdukChange(index, e)}
              className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium mb-1">
              Total Harga
            </label>
            <input
              type="number"
              name="totalHarga"
              value={item.totalHarga}
              readOnly
              className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveProduk(index)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Hapus Produk
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddProduk}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Tambah Produk
        </button>

        {/* Ringkasan Pembayaran */}
        <div>
          <label className="block text-sm font-medium mb-1">Subtotal</label>
          <input
            type="number"
            name="subtotal"
            value={formData.subtotal}
            readOnly
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Diskon (Opsional)
          </label>
          <input
            type="number"
            name="diskon"
            value={formData.diskon}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Pembayaran
          </label>
          <input
            type="number"
            name="totalPembayaran"
            value={formData.totalPembayaran}
            readOnly
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Metode Pembayaran
          </label>
          <select
            name="metodePembayaran"
            value={formData.metodePembayaran}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.metodePembayaran ? "border border-red-500" : ""
            }`}
          >
            <option value="">Pilih metode pembayaran</option>
            <option value="tunai">Tunai</option>
            <option value="transfer">Transfer Bank</option>
            <option value="kartu-kredit">Kartu Kredit</option>
          </select>
          {errors.metodePembayaran && (
            <span className="text-red-500 text-sm">
              {errors.metodePembayaran}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status Pembayaran
          </label>
          <select
            name="statusPembayaran"
            value={formData.statusPembayaran}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="belum">Belum Lunas</option>
            <option value="lunas">Lunas</option>
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

export default TransactionForm;
