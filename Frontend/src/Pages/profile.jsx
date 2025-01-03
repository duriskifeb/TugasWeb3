import { useEffect, useState } from "react";
import Navbar from "../Components/Nav";
import LogoutController, {
  AuthController,
  UpdateProfileController,
} from "../Controller/User";
import { Link, useNavigate } from "react-router";
import { Button, Flex, Image, Input } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Profile() {
  let [DataUser, SetDataUser] = useState(null);
  let [Profile, SetProfile] = useState(null);
  let [EditProfile, SetEditProfile] = useState(false);
  let [Respond, SetRespond] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let data = AuthController(navigate);
    SetDataUser(data);
  }, []);

  const SavingOn = () => {
    let x = UpdateProfileController({ image: Profile });
    SetRespond(x);
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
                onClick={() => SetEditProfile(true)}
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
                  onInput={(e) => SetProfile(e.target.value)}
                  placeholder="Enter the image URL"
                  className="flex-1"
                />
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    SetEditProfile(false);
                    SetProfile(null);
                    SetRespond(null);
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
                  {DataUser?.phone_number}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-3">
              {DataUser?.role && (
                <Button
                  type="primary"
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border-none text-sm h-10"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Open Admin Dashboard
                </Button>
              )}
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
