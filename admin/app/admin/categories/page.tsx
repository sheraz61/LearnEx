"use client";
import Heading from "@/app/utils/Heading";
import React from "react";
import EditCategories from "../../components/Admin/Customization/EditCategories";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="LearnEx - Admin"
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <EditCategories />
    </>
  );
};

export default page;