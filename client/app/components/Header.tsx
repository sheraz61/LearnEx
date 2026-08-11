"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ open, setOpen, activeItem }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 w-full h-20 z-50 border-b shadow-xl transition duration-500"
            : "w-full h-20 border-b z-50"
        } bg-white border-slate-200 text-black dark:bg-slate-950 dark:border-slate-700 dark:text-white`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-20 flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className="text-[25px] font-Poppins font-medium text-black dark:text-white"
              >
                LearnEx
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />

              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-black dark:text-white"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              
                <HiOutlineUserCircle
                  size={25}
                  className="hidden md:block cursor-pointer text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
           
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-50 bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-50 h-screen bg-white top-0 right-0 dark:bg-slate-950 dark:bg-opacity-95">
              <NavItems activeItem={activeItem} isMobile={true} />
              <button
                type="button"
                className="flex items-center gap-2 py-5 px-6 text-lg font-Poppins font-normal w-full text-black dark:text-white"
                onClick={() => setOpen(true)}
              >
                <HiOutlineUserCircle size={25} />
                <span>Profile</span>
              </button>
              <p className="text-base px-2 pl-5 text-black dark:text-white">
                Copyright © 2026 ELearning
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
