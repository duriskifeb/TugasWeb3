import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoIconWeb.png";
import { Button, Dropdown } from "antd";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import LogoutController from "../Controller/user"; // Pastikan LogoutController sesuai dengan kode yang Anda buat

export default function Navbar({ className }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [navMenu, setNavMenu] = useState([
    { name: "Home", route: "/" },
    { name: "Form", route: "/form" },
    { name: "History", route: "/history" },
  ]);

  useEffect(() => {
    // Anda dapat menambahkan logika tambahan di sini
    // Untuk mengambil data pengguna atau kategori, jika diperlukan.
  }, []);

  const handleLogout = () => {
    LogoutController(navigate); // Pastikan controller logout berjalan sesuai keinginan
  };

  return (
    <nav
      className={`w-full bg-blue-800 px-6 py-4 flex justify-between items-center z-50 fixed top-0 shadow-lg ${className}`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Logo" className="h-[30px]" />
        <h1 className="text-white font-bold text-lg">SalesDirect</h1>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-10">
        {navMenu.map((menu, idx) => (
          <li key={idx}>
            <NavLink
              to={menu.route}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white text-sm"
                  : "text-gray-400 hover:text-white text-sm"
              }
            >
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="flex items-center gap-4">
        <Button
          type="primary"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2"
        >
          <Icon icon="heroicons-outline:logout" className="text-xl" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}
