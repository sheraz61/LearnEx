"use client";
import { FC, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
  MenuIcon
} from "./Icon";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLogOutQuery } from "../../../../redux/features/auth/authApi";

interface ItemProps {
  title: string;
  to: string;
  icon: any;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, isActive, isCollapsed, onClick }) => {
  return (
    <Link 
      href={to}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        flex items-center gap-4 py-3 px-5 transition-all duration-300 rounded-lg mx-3 mb-1
        ${isActive ? 'bg-[var(--hero-accent)] text-white shadow-lg shadow-[#7c5cff]/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[var(--hero-accent)]'}
      `}
    >
      <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
        {icon}
      </div>
      {!isCollapsed && (
        <span className="font-Poppins text-[15px] whitespace-nowrap overflow-hidden transition-all">
          {title}
        </span>
      )}
    </Link>
  );
};

const SectionHeader = ({ title, isCollapsed }: { title: string, isCollapsed: boolean }) => {
  if (isCollapsed) return <div className="h-4"></div>;
  return (
    <h5 className="uppercase text-[12px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider px-8 mt-6 mb-2">
      {title}
    </h5>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const AdminSidebar: FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const {} = useLogOutQuery(undefined, { skip: !logout });

  if (!mounted) {
    return null;
  }

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  return (
    <div className={`
      fixed top-0 left-0 h-screen hero-glass z-[999] border-r border-slate-200/50 dark:border-white/10
      transition-all duration-300 ease-in-out flex flex-col
      ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-5 mb-4">
        {!isCollapsed && (
          <Link href="/admin" className="flex-1">
            <h3 className="text-2xl font-Poppins font-bold hero-gradient-text uppercase tracking-wider">
              LearnEx
            </h3>
          </Link>
        )}
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="!text-black dark:!text-white">
          {isCollapsed ? <MenuIcon className="!text-black dark:!text-white" /> : <ArrowBackIosIcon className="w-5 h-5 !text-black dark:!text-white" />}
        </IconButton>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="flex flex-col items-center justify-center mb-8 px-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--hero-accent)] shadow-[0_0_15px_rgba(124,92,255,0.4)] mb-3">
            <Image
              alt="profile"
              fill
              className="object-cover"
              src={user?.avatar ? user.avatar.url : avatarDefault}
            />
          </div>
          <h4 className="text-lg font-Poppins font-semibold text-slate-800 dark:text-white">
            {user?.name}
          </h4>
          <span className="text-sm font-Poppins text-[var(--hero-accent-2)] capitalize tracking-wide font-medium">
            Admin
          </span>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} isActive={pathname === "/admin"} isCollapsed={isCollapsed} />

        <SectionHeader title="Data" isCollapsed={isCollapsed} />
        <Item title="Users" to="/admin/users" icon={<GroupsIcon />} isActive={pathname === "/admin/users"} isCollapsed={isCollapsed} />
        <Item title="Invoices" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} isActive={pathname === "/admin/invoices"} isCollapsed={isCollapsed} />

        <SectionHeader title="Content" isCollapsed={isCollapsed} />
        <Item title="Create Course" to="/admin/create-course" icon={<VideoCallIcon />} isActive={pathname === "/admin/create-course"} isCollapsed={isCollapsed} />
        <Item title="Live Courses" to="/admin/courses" icon={<OndemandVideoIcon />} isActive={pathname === "/admin/courses"} isCollapsed={isCollapsed} />

        <SectionHeader title="Customization" isCollapsed={isCollapsed} />
        <Item title="Hero" to="/admin/hero" icon={<WebIcon />} isActive={pathname === "/admin/hero"} isCollapsed={isCollapsed} />
        <Item title="FAQ" to="/admin/faq" icon={<QuizIcon />} isActive={pathname === "/admin/faq"} isCollapsed={isCollapsed} />
        <Item title="Categories" to="/admin/categories" icon={<WysiwygIcon />} isActive={pathname === "/admin/categories"} isCollapsed={isCollapsed} />

        <SectionHeader title="Controllers" isCollapsed={isCollapsed} />
        <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} isActive={pathname === "/admin/team"} isCollapsed={isCollapsed} />

        <SectionHeader title="Analytics" isCollapsed={isCollapsed} />
        <Item title="Courses Analytics" to="/admin/courses-analytics" icon={<BarChartOutlinedIcon />} isActive={pathname === "/admin/courses-analytics"} isCollapsed={isCollapsed} />
        <Item title="Orders Analytics" to="/admin/orders-analytics" icon={<MapOutlinedIcon />} isActive={pathname === "/admin/orders-analytics"} isCollapsed={isCollapsed} />
        <Item title="Users Analytics" to="/admin/users-analytics" icon={<ManageHistoryIcon />} isActive={pathname === "/admin/users-analytics"} isCollapsed={isCollapsed} />

        <SectionHeader title="Extras" isCollapsed={isCollapsed} />
        <Item 
          title="Logout" 
          to="#" 
          icon={<ExitToAppIcon />} 
          isActive={false}
          isCollapsed={isCollapsed} 
          onClick={logoutHandler}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
