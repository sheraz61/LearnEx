"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Login from "./components/Auth/Login";
import { useRouter } from "next/navigation";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(true); // Always open the modal on load
  const [route, setRoute] = useState("Login");
  const router = useRouter();

  // Load user data to see if already logged in
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (!isLoading && userData?.user) {
      if (userData.user.role === "admin") {
        router.push("/admin");
      }
    }
  }, [userData, isLoading, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Heading
        title="Admin Portal - LearnEx"
        description="Login to the LearnEx Admin Portal"
        keywords="Admin, Login, LearnEx"
      />
      
      {/* Login Card */}
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
        <Login setRoute={setRoute} setOpen={setOpen} refetch={refetch} />
      </div>
    </div>
  );
};

export default Page;
