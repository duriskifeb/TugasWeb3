import LoginPage from "../assets/backround.png";
import LoginCoder2 from "../assets/layersLogis.png";
import { Checkbox, Flex } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/Form";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [Respond, setRespond] = useState({ status: null, error: null });
  const [Values, setValues] = useState({
    email: "",
    password: "",
    remember: false,
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
  setRespond({ status: null, error: null });

  try {
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Values.email,
        password: Values.password,
      }),
    });
    
    const data = await response.json();
    console.log('Response Data:', data); // Debugging: Check if response is correct
    
    if (response.ok) {
      setValues({ email: "", password: "", remember: false });
      console.log("Redirecting to Home"); // Debugging: Check if redirection is called
      navigate("/"); // Redirect to home page
    } else {
      setRespond({ status: false, error: data.message });
      console.log("Error:", data.message); // Debugging: Check what error message was returned
    }
  } catch (error) {
    setRespond({
      status: false,
      error: { message: "Login gagal. Coba lagi!" },
    });
    console.log("Error in Fetch:", error); // Debugging: Check fetch error
  }
};
      

  return (
    <>
      <img
        src={LoginPage}
        className="w-full h-full fixed top-0 left-0 max-lg:hidden object-cover object-bottom blur-sm"
        alt=""
      />
      <div className="w-full h-screen flex justify-center items-center z-10 relative">
        <div className="flex flex-col justify-center items-center p-8 bg-gray-800 rounded-lg shadow-lg">
          <img src={LoginCoder2} alt="Logo" className="h-14 mb-8" />
          <p className="text-white font-bold text-3xl text-center">
            Welcome, Sales Direct
          </p>
          <form onSubmit={Submit} className="w-[400px] mt-5">
            <Input
              error={Respond.error?.email ?? ""}
              className={"my-6"}
              value={Values.email}
              onInput={(e) => handleChange("email", e.target.value)}
              icon={"solar:letter-broken"}
              placeholder={"Email"}
            />
            <Input
              error={Respond.error?.password ?? ""}
              className={"my-6"}
              value={Values.password}
              onInput={(e) => handleChange("password", e.target.value)}
              onClick={() => SetPsw((d) => !d)}
              typeInput={Psw ? "text" : "password"}
              icon={Psw ? "solar:eye-broken" : "solar:eye-closed-broken"}
              placeholder={"Password"}
            />
            <Flex justify="space-between" align="center" className="mt-10">
              <Checkbox
                checked={Values.remember}
                onChange={(e) => handleChange("remember", e.target.checked)}
                className="text-white text-[15px]"
              >
                Remember Me
              </Checkbox>
              <Link to={"/"} className="text-white text-[14px]">
                Forgot Password?
              </Link>
            </Flex>
            <button
              type="submit"
              className="w-full bg-gray-600 text-black py-3 px-4 rounded-full mx-auto mt-10 flex justify-center items-center gap-1"
            >
              <span className="text-lg font-semibold">Login</span>
              <Icon
                icon={"material-symbols:arrow-right-alt-rounded"}
                className="text-2xl"
              />
            </button>
            <p className="text-center mt-6 text-white text-[15px]">
              don’t have account?{" "}
              <Link to={"/register"} className="font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
