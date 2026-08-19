"use client";
import React from "react";
import Heading from "../utils/Heading";
import DashboardWidgets from "../components/Admin/Widgets/DashboardWidgets";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="LearnEx - Admin Dashboard"
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <DashboardWidgets />
    </>
  );
};

export default page;