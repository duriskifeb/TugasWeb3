import { useEffect, useState } from "react";
import Navbar from "../Components/Nav";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Image, Input, message } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Profile() {
  const [DataUser, setDataUser] = useState(null); // State untuk menyimpan data pengguna
  const [Profile, setProfile] = useState(null); // State untuk menyimpan URL gambar profil
  const [EditProfile, setEditProfile] = useState(false); // State untuk mode edit profil
  const [Respond, setRespond] = useState(null); // State untuk menyimpan respons dari API

  const navigate = useNavigate();

  // Ambil data pengguna dari localStorage saat komponen dimuat
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchUserProfile(user.id); // Ambil data profil dari backend
    } else {
      navigate("/login"); // Jika tidak ada data pengguna, arahkan ke halaman login
    }
  }, [navigate]);

  // Fungsi untuk mengambil data profil dari backend
  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/profile?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data profil.");
      }

      const data = await response.json();
      setDataUser(data); // Set data pengguna ke state
      setProfile(data.profile); // Set gambar profil dari data pengguna
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      message.error("Gagal mengambil data profil.");
    }
  };

  // Fungsi untuk menyimpan perubahan profil
  const SavingOn = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: Profile, userId: DataUser.id }), // Kirim userId dan URL gambar
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui profil.");
      }

      // Update data pengguna di localStorage dan state
      const updatedUser = { ...DataUser, profile: Profile };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setDataUser(updatedUser);

      setRespond(result); // Set response ke state
      message.success("Profil berhasil diperbarui!");
      setEditProfile(false); // Tutup mode edit
      setProfile(null); // Reset input URL gambar
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error(
        error.message || "Terjadi kesalahan saat memperbarui profil."
      );
    }
  };

  return (
    <>
      <Navbar className={"mt-0"} />

      <div className="w-8/12 lg:w-[600px] mx-auto mt-24">
        <div className="bg-navy-800 rounded-xl shadow-lg p-6 relative overflow-hidden">
          {/* Glassmorphism Effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

          {/* Profile Header */}
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
            <p className="text-white/80">Manage your profile information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex justify-center mt-6 relative z-10">
            <div className="relative overflow-hidden">
              <Image
                preview={false}
                fallback="https://imageupscaler.com/wp-content/uploads/2024/07/maple-leaf-enlarged.jpg"
                src={Profile ?? DataUser?.profile}
                width={150}
                className="aspect-square rounded-full object-cover object-center border-4 border-white/20"
                alt="Profile Picture"
              />
              <Button
                onClick={() => setEditProfile(true)}
                className="absolute bottom-2 right-1 bg-white/20 hover:bg-white/30 border-none"
                shape="circle"
                size="large"
                icon={
                  <Icon
                    icon={"solar:gallery-edit-linear"}
                    className="text-xl text-white"
                  />
                }
              />
            </div>
          </div>

          {/* Edit Profile URL Section */}
          {EditProfile && (
            <div className="mt-4 relative z-10">
              <Flex gap={10} className="mb-2">
                <Input
                  value={Profile}
                  onChange={(e) => setProfile(e.target.value)}
                  placeholder="Enter the image URL"
                  className="flex-1"
                />
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    setEditProfile(false);
                    setProfile(null);
                    setRespond(null);
                  }}
                >
                  Cancel
                </Button>
              </Flex>
              <p className="text-xs text-red-500">
                {Respond?.error?.image?.[0] ?? ""}
              </p>
            </div>
          )}

          {/* User Information and Actions */}
          <div className="mt-6 relative z-10">
            {/* User Information */}
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md mb-4">
              <div className="mb-3">
                <p className="text-white/80 text-sm font-semibold">Name</p>
                <p className="text-white text-md font-medium">
                  {DataUser?.first_name} {DataUser?.last_name}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-white/80 text-sm font-semibold">Email</p>
                <p className="text-white text-md font-medium">
                  {DataUser?.email}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-sm font-semibold">Phone</p>
                <p className="text-white text-md font-medium">
                  {DataUser?.phone_number ?? "No phone number available"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-3">
              <Button
                type="primary"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-none text-sm h-10"
                onClick={SavingOn}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
