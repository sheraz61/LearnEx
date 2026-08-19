import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const profileImage =
    user?.avatar?.url || avatar || avatarDefault;

  const menuItems = [
    {
      id: 1,
      label: "My Account",
      icon: <AiOutlineUser size={17} />,
    },
    {
      id: 2,
      label: "Change Password",
      icon: <RiLockPasswordLine size={17} />,
    },
    {
      id: 3,
      label: "Enrolled Courses",
      icon: <SiCoursera size={16} />,
    },
  ];

  return (
    <div className="w-full">
      {/* User */}
      <div className="mb-6 flex items-center gap-3">
        <Image
          src={profileImage}
          alt="Profile"
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10"
        />

        <div className="min-w-0">
          <p className="truncate font-Poppins text-sm font-semibold text-black dark:text-white">
            {user?.name}
          </p>

          <p className="mt-0.5 truncate font-Josefin text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`
                  flex w-full items-center gap-2.5
                  rounded-md
                  px-3 py-2
                  text-left
                  font-Poppins text-[14px]
                  transition-colors duration-150
                  ${
                    isActive
                      ? "bg-[#7c5cff]/10 text-[#7c5cff] dark:bg-[#7c5cff]/15 dark:text-[#a994ff]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }
                `}
              >
                <span className={isActive ? "text-[#7c5cff]" : "text-gray-400 dark:text-gray-500"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="mt-6 border-t border-gray-200 pt-4 dark:border-white/10">
        <button
          type="button"
          onClick={logOutHandler}
          className="
            flex w-full items-center gap-2.5
            rounded-md
            px-3 py-2
            font-Poppins text-[14px]
            text-gray-500
            transition-colors
            hover:bg-red-50 hover:text-red-500
            dark:text-gray-400
            dark:hover:bg-red-500/10 dark:hover:text-red-400
          "
        >
          <AiOutlineLogout size={17} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBarProfile;