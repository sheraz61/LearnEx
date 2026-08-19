import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <div className="w-[92%] max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 py-8">
          <Heading
            title={data[activeVideo]?.title}
            description="anything"
            keywords={data[activeVideo]?.tags}
          />
          <div className="w-full lg:w-[65%]">
            <CourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              user={user}
              refetch={refetch}
            />
          </div>
          <div className="w-full lg:w-[35%] relative">
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={data}
              activeVideo={activeVideo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContent;