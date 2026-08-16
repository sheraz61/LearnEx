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
    <div>
      <Heading
        title="LearnEx - Admin"
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>

        <div className="w-[85%]">
          <DashboardHeader />

          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
