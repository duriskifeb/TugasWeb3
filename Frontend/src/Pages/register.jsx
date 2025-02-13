import LoginPage from "../assets/backround.png";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../Components/Form";
import { message } from "antd"; // Tambahkan message dari antd untuk notifikasi

export default function Register() {
  const navigate = useNavigate();
  const [Respond, setRespond] = useState({ status: null, error: null });
  const [Values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [Psw, SetPsw] = useState(false);

  const handleChange = (key, value) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (
      !Values.first_name ||
      !Values.last_name ||
      !Values.email ||
      !Values.phone_number ||
      !Values.password
    ) {
      message.error("Harap isi semua field yang wajib!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Registrasi berhasil!");
        setValues({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          password: "",
        });
        navigate("/login"); // Arahkan ke halaman login setelah registrasi
      } else {
        setRespond({ status: false, error: data });
        message.error(data.message || "Registrasi gagal. Coba lagi!");
      }
    } catch (error) {
      setRespond({
        status: false,
        error: { message: "Registrasi gagal. Coba lagi!" },
      });
      message.error("Terjadi kesalahan saat registrasi.");
    }
  };

  return (
    <>
      <img
        src={LoginPage}
        className="w-full h-full fixed top-0 left-0 max-lg:hidden object-cover object-bottom blur-sm"
        alt="Background"
      />
      <div className="w-full h-screen flex justify-center items-center z-10 relative">
        <div className="flex flex-col justify-center items-center p-8 bg-gray-800 rounded-lg shadow-lg">
          <p className="text-white font-bold text-3xl text-center">
            Welcome to Sales Direct
          </p>
          <form onSubmit={Submit} className="w-[400px] mt-5">
            <div className="grid grid-cols-2 gap-5 my-6">
              <Input
                error={Respond.error?.first_name ?? ""}
                value={Values.first_name}
                onInput={(e) => handleChange("first_name", e.target.value)}
                placeholder="First Name"
              />
              <Input
                error={Respond.error?.last_name ?? ""}
                value={Values.last_name}
                onInput={(e) => handleChange("last_name", e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <Input
              error={Respond.error?.email ?? ""}
              className="my-6"
              value={Values.email}
              onInput={(e) => handleChange("email", e.target.value)}
              icon="solar:letter-broken"
              placeholder="Email"
            />
            <Input
              error={Respond.error?.phone_number ?? ""}
              className="my-6"
              value={Values.phone_number}
              onInput={(e) => handleChange("phone_number", e.target.value)}
              icon="solar:phone-broken"
              placeholder="Phone Number"
              typeInput="number"
            />
            <Input
              error={Respond.error?.password ?? ""}
              className="my-6"
              value={Values.password}
              onInput={(e) => handleChange("password", e.target.value)}
              onClick={() => SetPsw((prev) => !prev)}
              typeInput={Psw ? "text" : "password"}
              icon={Psw ? "solar:eye-broken" : "solar:eye-closed-broken"}
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full bg-gray-600 text-black py-3 px-4 rounded-full mx-auto mt-10 flex justify-center items-center gap-1"
            >
              <span className="text-lg font-semibold">Register</span>
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                className="text-2xl"
              />
            </button>
            <p className="text-center mt-6 text-white text-[15px]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
