"use client";

import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const router = useRouter();

  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const { data } = useGetAllCoursesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const editCourseData = data?.courses?.find(
    (item: any) => item._id === id
  );

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);

  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState([
  {
    videoUrl: "",
    title: "",
    description: "",
    videoSection: "Untitled Section",
    videoLength: "",
    links: [
      {
        title: "",
        url: "",
      },
    ],
    suggestion: "",
  },
]);

  const [courseData, setCourseData] = useState<any>({});

  // Load course data
  useEffect(() => {
    if (!editCourseData) return;

    setCourseInfo({
      name: editCourseData.name || "",
      description: editCourseData.description || "",
      price: editCourseData.price || "",
      estimatedPrice: editCourseData.estimatedPrice || "",
      tags: editCourseData.tags || "",
      level: editCourseData.level || "",
      categories: editCourseData.categories || "",
      demoUrl: editCourseData.demoUrl || "",
      thumbnail: editCourseData.thumbnail?.url || "",
    });

    setBenefits(editCourseData.benefits || [{ title: "" }]);

    setPrerequisites(
      editCourseData.prerequisites || [{ title: "" }]
    );

    setCourseContentData(
      editCourseData.courseData || [
        {
          videoUrl: "",
          title: "",
          description: "",
          videoSection: "Untitled Section",
          links: [
            {
              title: "",
              url: "",
            },
          ],
          suggestion: "",
        },
      ]
    );
  }, [editCourseData]);

  // Handle successful update
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      router.push("/admin/courses");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(
          errorMessage?.data?.message || "Failed to update course"
        );
      }
    }
  }, [isSuccess, error, router]);

  // Prepare course data
  const handleSubmit = () => {
  const formattedBenefits = benefits.map((benefit) => ({
    title: benefit.title,
  }));

  const formattedPrerequisites = prerequisites.map((prerequisite) => ({
    title: prerequisite.title,
  }));

  const formattedCourseContentData = courseContentData.map(
    (courseContent: any) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      videoSection: courseContent.videoSection,

      links: courseContent.links.map((link: any) => ({
        title: link.title,
        url: link.url,
      })),

      suggestion: courseContent.suggestion,
    })
  );

  const preparedData = {
    name: courseInfo.name,
    description: courseInfo.description,
    categories: courseInfo.categories,
    price: courseInfo.price,
    estimatedPrice: courseInfo.estimatedPrice,
    tags: courseInfo.tags,
    thumbnail: courseInfo.thumbnail,
    level: courseInfo.level,
    demoUrl: courseInfo.demoUrl,

    totalVideos: courseContentData.length,

    benefits: formattedBenefits,
    prerequisites: formattedPrerequisites,

    // IMPORTANT
    courseData: formattedCourseContentData,
  };

  setCourseData(preparedData);
};

  // Update course
  const handleCourseCreate = async () => {
    if (!editCourseData?._id) {
      toast.error("Course ID not found");
      return;
    }

    await editCourse({
      id: editCourseData._id,
      data: courseData,
    });
  };

  return (
    <div className="w-full min-h-screen">

      {/* Main Edit Course Layout */}
      <div className="flex w-full gap-6 px-4 pb-10">

        {/* LEFT SIDE - COURSE EDITOR */}
        <div className="w-full lg:w-[75%]">

          {active === 0 && (
            <CourseInformation
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )}

          {active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )}

          {active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )}

          {active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
              isEdit={true}
            />
          )}

        </div>

        {/* RIGHT SIDE - COURSE OPTIONS */}
        <div className="hidden lg:block lg:w-[25%]">
          <div className="sticky top-[120px]">
            <CourseOptions
              active={active}
              setActive={setActive}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditCourse;