"use client";

import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

const Custom = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoadUserQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default Custom;