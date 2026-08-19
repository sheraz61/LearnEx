"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import toast from "react-hot-toast";

import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Loader from "./Loader/Loader";

import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import avatar from "../../public/assets/avatar.png";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [logout, setLogout] = useState(false);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const { data: session } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useLogOutQuery(undefined, {
    skip: !logout,
  });

  /* --------------------------------
     Social authentication
  --------------------------------- */

  useEffect(() => {
    if (isLoading) return;

    if (!userData && session?.user) {
      socialAuth({
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
      });
    }

    if (session === null && isSuccess) {
      toast.success("Login successfully");
      refetch();
    }

    if (session === null && !userData) {
      setLogout(true);
    }
  }, [session, userData, isLoading, isSuccess]);

  /* --------------------------------
     Sticky header scroll state
  --------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* --------------------------------
     Close mobile sidebar
  --------------------------------- */

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenSidebar(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* ================= HEADER ================= */}

      <header
        className={`
          fixed top-0 left-0 z-[999]
          w-full
          border-b
          transition-all duration-300
          ${isScrolled
            ? "border-black/[0.08] bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#07070c]/90 dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            : "border-transparent bg-white/70 backdrop-blur-md dark:bg-[#07070c]/70"
          }
        `}
      >
        <div className="mx-auto flex h-[64px] w-[92%] max-w-[1400px] items-center justify-between">
          {/* ================= LOGO ================= */}

          <Link
            href="/"
            className="group flex items-center font-Poppins text-[22px] font-semibold tracking-[-0.04em] text-black dark:text-white"
          >
            Learn
            <span className="hero-gradient-text transition-opacity duration-200 group-hover:opacity-80">
              Ex
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <div className="hidden items-center md:flex">
            <NavItems
              activeItem={activeItem}
              isMobile={false}
            />

            <div className="mx-4 h-5 w-px bg-black/10 dark:bg-white/10" />

            <ThemeSwitcher />

            {/* Profile */}

            {userData?.user ? (
              <Link
                href="/profile"
                className="ml-4 flex items-center"
                aria-label="Open profile"
              >
                <Image
                  src={
                    userData.user.avatar?.url
                      ? userData.user.avatar.url
                      : avatar
                  }
                  alt="Profile"
                  width={34}
                  height={34}
                  className="
                    h-[34px] w-[34px]
                    rounded-full
                    object-cover
                    border border-black/10
                    dark:border-white/10
                    transition-transform duration-200
                    hover:scale-105
                  "
                />
              </Link>
            ) : (
              <button
                type="button"
                aria-label="Open login"
                onClick={() => {
                  setRoute("Login");
                  setOpen(true);
                }}
                className="
                  ml-4
                  flex items-center justify-center
                  text-black dark:text-white
                  transition-colors
                  hover:text-[#7c5cff]
                  dark:hover:text-[#a994ff]
                "
              >
                <HiOutlineUserCircle size={26} />
              </button>
            )}
          </div>

          {/* ================= MOBILE TRIGGER ================= */}

          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setOpenSidebar(true)}
              className="
                flex h-9 w-9
                items-center justify-center
                text-black dark:text-white
              "
            >
              <HiOutlineMenuAlt3 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}

      {openSidebar && (
        <div
          id="mobile-menu"
          onClick={handleScreenClick}
          className="
            fixed inset-0 z-[1000]
            bg-black/30
            backdrop-blur-[2px]
          "
        >
          <aside
            className="
              absolute right-0 top-0
              flex h-full
              w-1/2
              min-w-[260px]
              flex-col
              bg-white
              shadow-[-10px_0_30px_rgba(0,0,0,0.08)]
              dark:bg-[#0d0e16]
              dark:shadow-[-10px_0_30px_rgba(124,92,255,0.1)]
            "
          >
            {/* Sidebar Header — logo */}

            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-black/[0.08] px-5 dark:border-white/[0.08]">
              <Link
                href="/"
                onClick={() => setOpenSidebar(false)}
                className="font-Poppins text-[21px] font-semibold text-black dark:text-white"
              >
                Learn
                <span className="hero-gradient-text">Ex</span>
              </Link>

              <button
                type="button"
                onClick={() => setOpenSidebar(false)}
                className="text-[26px] leading-none text-black/60 dark:text-white/60"
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>

            {/* Nav items */}

            <div className="flex-1 overflow-y-auto py-3">
              <NavItems
                activeItem={activeItem}
                isMobile={true}
                onClose={() => setOpenSidebar(false)}
              />

              <div className="mx-5 my-4 h-px bg-black/[0.08] dark:bg-white/[0.08]" />

              {/* User / login */}

              {userData?.user ? (
                <Link
                  href="/profile"
                  onClick={() => setOpenSidebar(false)}
                  className="
                    mx-5
                    flex items-center gap-3
                    py-3
                  "
                >
                  <Image
                    src={
                      userData.user.avatar?.url
                        ? userData.user.avatar.url
                        : avatar
                    }
                    alt="Profile"
                    width={38}
                    height={38}
                    className="
                      h-[38px] w-[38px]
                      rounded-full
                      object-cover
                      border border-black/10
                      dark:border-white/10
                    "
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-black dark:text-white">
                      {userData.user.name}
                    </p>

                    <p className="text-xs text-black/50 dark:text-white/40">
                      View profile
                    </p>
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setRoute("Login");
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                  className="
                    mx-5
                    flex items-center gap-3
                    py-3
                    text-black dark:text-white
                  "
                >
                  <HiOutlineUserCircle size={25} />
                  <span className="font-Poppins text-[16px]">
                    Login
                  </span>
                </button>
              )}
            </div>

            {/* Sidebar Footer */}

            <div className="border-t border-black/[0.08] px-5 py-4 dark:border-white/[0.08]">
              <p className="text-xs text-black/40 dark:text-white/30">
                © 2026 LearnEx
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* ================= AUTH MODAL ================= */}

      {open && route === "Login" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}

      {open && route === "Sign-Up" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {open && route === "Verification" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </>
  );
};

export default Header;