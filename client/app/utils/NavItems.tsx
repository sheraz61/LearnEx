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
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden md:flex items-center">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                className={`${activeItem === index ? "text-[crimson]" : "text-black dark:text-white"} text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="md:hidden">
          <Link href="/">
            <span className="block py-5 px-6 text-[25px] font-Poppins font-[500] text-black dark:text-white">
              LearnEx
            </span>
          </Link>

          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                className={`${activeItem === index ? "text-[crimson]" : "text-black dark:text-white"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;