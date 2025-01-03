import LoginPage from "../assets/backround.png";
import { message } from "antd"; // Import message untuk notifikasi
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../Components/Form";
import { RegisterController, GuestController } from "../Controller/User";

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

  // Menghandle perubahan input
  const handleChange = (key, value) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  // Menghandle submit
  const Submit = async (e) => {
    e.preventDefault();

    let data = await RegisterController(Values); // Panggil RegisterController
    if (data.status === true) {
      setValues({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
      });
      navigate("/login"); // Redirect ke halaman login jika registrasi berhasil
    } else {
      setRespond(data); // Tampilkan pesan error jika registrasi gagal
    }
  };

  useEffect(() => {
    GuestController(navigate); // Cek apakah user sudah login
  }, [navigate]);

  return (
    <>
      {/* Background Image */}
      <img
        src={LoginPage}
        className="w-full h-full fixed top-0 left-0 max-lg:hidden object-cover object-bottom blur-sm"
        alt="Background"
      />

      {/* Form Container */}
      <div className="w-full h-screen flex justify-center items-center z-10 relative">
        <div className="flex flex-col justify-center items-center p-8 bg-gray-800 rounded-lg shadow-lg">
          {/* Title */}
          <p className="text-white font-bold text-3xl text-center">
            Welcome to Sales Direct
          </p>

          {/* Form */}
          <form onSubmit={Submit} className="w-[400px] mt-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-5 my-6">
              <Input
                error={
                  Respond.error?.first_name ? Respond.error.first_name[0] : ""
                }
                value={Values.first_name}
                onInput={(e) => handleChange("first_name", e.target.value)}
                placeholder="First Name"
              />
              <Input
                error={
                  Respond.error?.last_name ? Respond.error.last_name[0] : ""
                }
                value={Values.last_name}
                onInput={(e) => handleChange("last_name", e.target.value)}
                placeholder="Last Name"
              />
            </div>

            {/* Email Field */}
            <Input
              error={Respond.error?.email ? Respond.error.email[0] : ""}
              className="my-6"
              value={Values.email}
              onInput={(e) => handleChange("email", e.target.value)}
              icon="solar:letter-broken"
              placeholder="Email"
            />

            {/* Phone Number Field */}
            <Input
              error={
                Respond.error?.phone_number ? Respond.error.phone_number[0] : ""
              }
              className="my-6"
              value={Values.phone_number}
              onInput={(e) => handleChange("phone_number", e.target.value)}
              icon="solar:phone-broken"
              placeholder="Phone Number"
              typeInput="number"
            />

            {/* Password Field */}
            <Input
              error={Respond.error?.password ? Respond.error.password[0] : ""}
              className="my-6"
              value={Values.password}
              onInput={(e) => handleChange("password", e.target.value)}
              onClick={() => SetPsw((prev) => !prev)}
              typeInput={Psw ? "text" : "password"}
              icon={Psw ? "solar:eye-broken" : "solar:eye-closed-broken"}
              placeholder="Password"
            />

            {/* Submit Button */}
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

            {/* Login Link */}
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
