import { Button, Flex } from "antd";
import logo from "../../assets/SalesDirect.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { AuthController } from "../../Controller/user";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
export default function Dashboard() {
  let [DataUser, SetDataUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    let data = AuthController(navigate);
    SetDataUser(data);
  }, []);

  let Menu = [
    {
      name: "Dashboard",
      icon: "solar:home-angle-broken",
      route: "/admin/dashboard",
    },
    // {
    //   name: "Article",
    //   icon: "solar:clipboard-list-broken",
    //   route: "/admin/artikel",
    // },
  ];

  return (
    <div className="w-full h-screen grid grid-cols-[250px,1fr] gap-5 px-5 py-10 overflow-auto">
      <div className="grid grid-rows-[30px,1fr,100px] gap-8">
        <div>
          <img
            src={logo}
            alt=""
            className="h-full object-cover block mx-auto"
          />
        </div>
        <Flex vertical>
          {Menu.map((dt, id) => {
            return (
              <NavLink
                to={dt.route}
                className={({ isActive }) =>
                  `py-2 px-4 ${
                    isActive == true && "bg-primary"
                  } rounded-xl text-white flex gap-4 items-center my-3`
                }
                align="center"
              >
                <Icon icon={dt.icon} className="text-xl" />
                <p>{dt.name}</p>
              </NavLink>
            );
          })}
        </Flex>
        <div>
          <Flex gap={8} align="center" className="text-white mb-2">
            <img
              src={DataUser?.profile}
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                {DataUser?.first_name} {DataUser?.last_name}
              </p>
              <p className="text-xs text-white/50">{DataUser?.email}</p>
            </div>
          </Flex>
          <Button
            danger
            type="link"
            icon={<Icon icon={"solar:login-2-broken"} className="text-lg" />}
          >
            Log out
          </Button>
        </div>
      </div>
      <div className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
