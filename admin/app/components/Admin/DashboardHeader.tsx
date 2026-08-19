"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess, refetch]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
    });
  }, [refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full h-[60px] flex items-center justify-end p-6 z-[9999]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <div className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-slate-800" />
        </div>
        <span className="absolute top-0 right-0 bg-[var(--hero-accent)] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white font-semibold shadow-lg">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-auto custom-scrollbar hero-glass dark:bg-[#111C43]/90 bg-white/90 shadow-2xl border border-slate-200 dark:border-white/10 absolute top-20 right-6 z-[10000] rounded-xl backdrop-blur-xl">
          <h5 className="text-center text-[18px] font-Poppins font-semibold text-slate-800 dark:text-white p-4 border-b border-slate-200 dark:border-white/10">
            Notifications
          </h5>
          {notifications && notifications.length === 0 && (
             <p className="text-center p-4 text-slate-500 dark:text-slate-400">No new notifications</p>
          )}
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                className="font-Poppins p-4 border-b dark:border-white/5 border-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                key={index}
              >
                <div className="w-full flex items-center justify-between mb-2">
                  <p className="text-slate-800 dark:text-white font-medium">{item.title}</p>
                  <button
                    className="text-[var(--hero-accent)] text-sm font-medium hover:underline"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </button>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                  {item.message}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-[12px] font-medium">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;