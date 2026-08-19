"use client";

import React from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = ({ params }: Props) => {
  const [id, setId] = React.useState<string>("");

  React.useEffect(() => {
    params.then((data) => {
      setId(data.id);
    });
  }, [params]);

  if (!id) {
    return null;
  }

  return (
    <>
      <Heading
        title="LearnEx - Admin"
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <EditCourse id={id} />
    </>
  );
};

export default Page;
