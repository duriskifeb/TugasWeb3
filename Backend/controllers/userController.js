import database from "../config/database.js";

// Fungsi untuk registrasi pengguna
export const register = async (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const [existingUser] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Simpan pengguna baru ke database
    await database.execute(
      "INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, phone_number, email, password]
    );

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat registrasi", error });
  }
};

// Fungsi untuk login pengguna
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Verifikasi password (tanpa enkripsi)
    if (user[0].password !== password) {
      return res.status(400).json({ message: "Password salah" });
    }

    // Jika login berhasil, kembalikan data pengguna
    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user[0].id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
        phone_number: user[0].phone_number,
        profile: user[0].profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat login", error });
  }
};

// Fungsi untuk mengambil data profil pengguna
export const getProfile = async (req, res) => {
  const { userId } = req.query; // Ambil userId dari query parameter

  try {
    const [user] = await database.execute(
      "SELECT first_name, last_name, email, phone_number, profile FROM users WHERE id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    res.status(200).json(user[0]); // Kirim data profil
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data profil", error });
  }
};

// Fungsi untuk mengupdate profil pengguna
export const updateProfile = async (req, res) => {
  const { userId, image } = req.body;

  try {
    await database.execute("UPDATE users SET profile = ? WHERE id = ?", [
      image,
      userId,
    ]);

    res
      .status(200)
      .json({ success: true, message: "Profil berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui profil", error });
  }
};
