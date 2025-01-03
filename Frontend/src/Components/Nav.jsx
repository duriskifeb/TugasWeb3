import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../assets/LogoIconWeb.png";
import { Button, Dropdown } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import LogoutController, { AuthController } from "../Controller/user";
import Category from "../data/category.json";

export default function Navbar({ className }) {
  let { pathname } = useLocation();

  let [DataUser, SetDataUser] = useState(null);
  let navigate = useNavigate();

  let [NavMenu, setNavMenu] = useState([
    { name: "Home", route: "/" },
    { name: "Form", route: "/Form" },
    { name: "Profile", route: "/Profile" },
    { name: "history", route: "/history" },
  ]);

  useEffect(() => {
    let data = AuthController(navigate);
    SetDataUser(data);
    setNavMenu((dt) =>
      dt.map((main) => {
        if (main.name === "Category") {
          const updatedRoute = [
            ...main.route,
            ...Category.map((element) => ({
              key: "sdm_20" + element.name + element.uuid,
              label: (
                <Link to={`/category/${element.uuid}`}>{element.name}</Link>
              ),
            })),
          ];
          return { ...main, route: updatedRoute };
        }
        return main;
      })
    );
  }, []);

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
        {NavMenu.map((dt, id) => {
          if (Array.isArray(dt.route)) {
            return (
              <li key={`navMenuT${id}`} className="relative group">
                <Dropdown menu={{ items: dt.route }} trigger={["click"]}>
                  <a
                    onClick={(e) => e.preventDefault()}
                    className={`flex items-center gap-2 text-sm ${
                      pathname.startsWith("/category/")
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {dt.name} <Icon icon={"solar:alt-arrow-down-broken"} />
                  </a>
                </Dropdown>
              </li>
            );
          } else {
            return (
              <li key={`navMenuT${id}`}>
                <NavLink
                  to={dt.route}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-b-2 border-white text-sm"
                      : "text-black hover:text-white text-sm"
                  }
                >
                  {dt.name}
                </NavLink>
              </li>
            );
          }
        })}
      </ul>

      {/* Logout */}
      <div className="flex items-center gap-4">
        <Button
          type="primary"
          onClick={() => LogoutController(navigate)}
          className="flex items-center gap-2 px-4 py-2"
        >
          <Icon icon={"heroicons-outline:logout"} className="text-xl" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}
