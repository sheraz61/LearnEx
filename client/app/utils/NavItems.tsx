import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  onClose?: () => void;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile, onClose }) => {
  return (
    <>
      {/* ==================== DESKTOP NAVIGATION ==================== */}
      {!isMobile && (
        <nav className="hidden items-center gap-1 md:flex">
          {navItemsData.map((item, index) => {
            const isActive = activeItem === index;

            return (
              <Link
                href={item.url}
                key={item.url}
                onClick={() => onClose && onClose()}
                className={`
                  group
                  relative
                  rounded-xl
                  px-3.5
                  py-2
                  text-[14px]
                  font-Poppins
                  font-medium
                  tracking-[-0.01em]
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-[#7c5cff]/10 text-[#7c5cff] dark:bg-[#7c5cff]/15 dark:text-[#a994ff]"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                  }
                `}
              >
                <span className="relative z-10">
                  {item.name}
                </span>

                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-1
                      left-1/2
                      h-0.5
                      w-3
                      -translate-x-1/2
                      rounded-full
                      bg-[#7c5cff]
                      shadow-[0_0_8px_rgba(124,92,255,0.7)]
                    "
                  />
                )}

                {!isActive && (
                  <span
                    className="
                      absolute
                      inset-0
                      rounded-xl
                      bg-[#7c5cff]/0
                      transition-all
                      duration-300
                      group-hover:bg-[#7c5cff]/5
                      dark:group-hover:bg-[#7c5cff]/5
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>
      )}

      {/* ==================== MOBILE NAVIGATION ==================== */}
      {isMobile && (
        <nav className="flex flex-col gap-1 px-2">
          {navItemsData.map((item, index) => {
            const isActive = activeItem === index;

            return (
              <Link
                href={item.url}
                key={item.url}
                onClick={() => onClose && onClose()}
                className={`
                  group
                  relative
                  flex
                  items-center
                  rounded-xl
                  px-4
                  py-3.5
                  text-[15px]
                  font-Poppins
                  font-medium
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-[#7c5cff]/10 text-[#7c5cff] dark:bg-[#7c5cff]/15 dark:text-[#a994ff]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      h-6
                      w-0.5
                      rounded-full
                      bg-[#7c5cff]
                      shadow-[0_0_10px_rgba(124,92,255,0.8)]
                    "
                  />
                )}

                <span>{item.name}</span>

                <span
                  className={`
                    ml-auto
                    text-sm
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "translate-x-0 text-[#a994ff] opacity-100"
                        : "-translate-x-1 text-black/20 opacity-0 group-hover:translate-x-0 group-hover:text-black/40 dark:text-white/20 dark:group-hover:text-white/50 group-hover:opacity-100"
                    }
                  `}
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default NavItems;