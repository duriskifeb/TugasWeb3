import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthController } from "../../Controller/user";

import Ilus23 from "../../assets/ilust23.png";
import { Button, Flex } from "antd";

export default function Index() {
  let [DataUser, SetDataUser] = useState(null);
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  let navigate = useNavigate();

  useEffect(() => {
    let data = AuthController(navigate);
    SetDataUser(data);
  }, []);

  return (
    <div className="grid grid-cols-[2fr,1.5fr] gap-8">
      <div className="bg-white rounded-xl p-4 grid grid-cols-[1fr,300px] items-center">
        <div>
          <p className="text-lg font-medium">Hai, {DataUser?.first_name}</p>
          <p className="text-[15px]">Welcome to Dashboard!</p>
          <p className="text-[15px] mt-10 font-medium">
            {" "}
            Today, {day} {month}
          </p>
        </div>
        <img src={Ilus23} alt="" />
      </div>
      <div className="p-8 text-white bg-primary rounded-xl">
        <p className="font-medium">Your Profile</p>
        <Flex align="center" gap={10} className="mt-2">
          <img
            src={DataUser?.profile}
            className="w-24 h-24 rounded-full"
            alt=""
          />
          <div>
            <p className="text-lg font-medium">{DataUser?.first_name}</p>
            <p className="text-sm text-white/50">{DataUser?.role}</p>
          </div>
        </Flex>
        <Flex justify="end">
          <Link to={"/profile"}>
            <Button type="primary" className="bg-secondary">
              View Profile
            </Button>
          </Link>
        </Flex>
      </div>
    </div>
  );
}
