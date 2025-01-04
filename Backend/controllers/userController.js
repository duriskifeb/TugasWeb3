import database from "../config/database.js";

// Fungsi untuk registrasi pengguna
export const register = async (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  try {
    // Simpan pengguna baru ke database tanpa mengenkripsi password
    await database.execute(
      "INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, phone_number, email, password]
    );

    res.status(201).json({ message: "Pengguna berhasil masuk database" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat registrasi", error });
  }
};

// Fungsi untuk login pengguna
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah email ada di database
    const [user] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Verifikasi password tanpa enkripsi
    if (user[0].password !== password) {
      return res.status(400).json({ message: "Password salah" });
    }

    // Jika login berhasil
    res.status(200).json({ message: "Login berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat login", error });
  }
};
