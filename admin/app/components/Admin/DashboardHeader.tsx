"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
// import {
//   useGetAllNotificationsQuery,
//   useUpdateNotificationStatusMutation,
// } from "@redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
// import socketIO from "socket.io-client";
// import { format } from "timeago.js";
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
//   const { data, refetch } = useGetAllNotificationsQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });
//   const [updateNotificationStatus, { isSuccess }] =
//     useUpdateNotificationStatusMutation();
//   const [notifications, setNotifications] = useState<any>([]);
//   const [audio] = useState<any>(
//     typeof window !== "undefined" &&
//       new Audio(
//         "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
//       )
//   );

  const playNotificationSound = () => {
    // audio.play();
  };

//   useEffect(() => {
//     // if (data) {
//     //   setNotifications(
//     //     data.notifications.filter((item: any) => item.status === "unread")
//     //   );
//     // }
//     // if (isSuccess) {
//     //   refetch();
//     // }
//     // audio.load();
//   }, [data, isSuccess,audio]);

  useEffect(() => {
    // socketId.on("newNotification", (data) => {
    //   refetch();
    //   playNotificationSound();
    // });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    // await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full p-2">
              <div className="flex items-center justify-between">
                <p className="text-black dark:text-white font-medium">
                  New Question Received
                </p>
                <p className="text-black dark:text-white cursor-pointer text-[14px]">
                  mark as read
                </p>
              </div>
              <p className="py-2 text-black dark:text-white text-[14px] line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odit ratione numquam? Modi sed tenetur consectetur atque iste pariatur vero, quos consequatur. Quo aperiam eius earum adipisci iure recusandae? Doloribus.
              </p>
              <p className="text-black dark:text-white text-[12px]">
                5 days ago
              </p>
            </div>
          </div>   
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;