import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Loader from "../Loader/Loader";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#7c5cff]/5 blur-[120px]" />

      <div className="w-[92%] md:w-[88%] lg:w-[84%] mx-auto">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/15 bg-[#7c5cff]/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7c5cff]" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">
              Learn & Grow
            </span>
          </div>

          <h1 className="font-Poppins text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Expand Your Career{" "}
            <span className="hero-gradient-text">
              Opportunities
            </span>
            <br />
            With Our Courses
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            Build practical skills, learn from structured courses, and take
            the next step in your career.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;