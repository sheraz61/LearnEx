"use client";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState, Suspense } from "react";

import Loader from "../components/Loader/Loader";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";

const CoursesContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title") || "";

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [category, setCategory] = useState("All");

  const courses = data?.courses || [];
  const categories = categoriesData?.layout?.categories || [];

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (category !== "All") {
      result = result.filter(
        (course: any) => course.categories === category
      );
    }

    if (search.trim()) {
      result = result.filter((course: any) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [courses, category, search]);

  return (
    <div className="pt-[65px] min-h-screen bg-white transition-colors duration-300 dark:bg-[#07070c]">
      <Heading
        title="All Courses - LearnEx"
        description="Explore programming courses and build practical skills with LearnEx."
        keywords="programming courses, web development, MERN, React, Node.js"
      />

      {isLoading ? (
        <Loader />
      ) : (
        <main className="relative min-h-[calc(100vh-80px)] overflow-hidden">
          {/* Background layer: subtle grid + floating gradient mesh */}
          <div className="hero-grid-pattern pointer-events-none absolute inset-0 z-0" />
          <div className="hero-blob hero-blob-violet pointer-events-none absolute -left-32 top-10 z-0 h-[420px] w-[420px]" />
          <div className="hero-blob hero-blob-amber pointer-events-none absolute -right-24 top-[400px] z-0 h-[380px] w-[380px]" />

          <div className="relative z-10 mx-auto w-[92%] max-w-[1400px] py-14 md:w-[88%] md:py-16 xl:w-[85%]">

            {/* Heading */}
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center mt-6">
              <div className="hero-glass mb-6 flex items-center gap-2 rounded-full border border-slate-200/60 px-4 py-1.5 shadow-sm dark:border-white/10">
                <span className="font-Josefin text-[13px] font-[500] tracking-wide text-slate-700 dark:text-slate-200">
                  World-class Curriculum
                </span>
              </div>
              <h1 className="font-Poppins text-4xl md:text-5xl lg:text-6xl font-[600] tracking-tight text-slate-900 dark:text-white">
                Explore our{" "}
                <span className="hero-gradient-text block mt-1">premium courses</span>
              </h1>

              <p className="mt-5 max-w-[650px] text-base md:text-[18px] leading-[1.6] text-slate-600 dark:text-slate-400 font-Josefin">
                Learn practical skills through high-quality courses built around real-world development. Join our community to elevate your programming journey.
              </p>
            </div>

            {/* Search result */}
            {search && (
              <div className="mt-10 flex items-center justify-center gap-2 font-Josefin text-[16px] text-slate-500 dark:text-slate-400">
                <span>Search results for</span>
                <span className="font-[600] text-[#7c5cff]">
                  &quot;{search}&quot;
                </span>
              </div>
            )}

            {/* Categories */}
            <div className="mt-12 flex w-full justify-center px-4">
              <div className="hero-glass flex items-center gap-2 overflow-x-auto rounded-full border border-slate-200/60 p-2 shadow-sm dark:border-white/10 scrollbar-hide max-w-full">
                <button
                  type="button"
                  onClick={() => setCategory("All")}
                  className={`
                    shrink-0 rounded-full px-6 py-2.5 font-Poppins text-[14px] font-[500] transition-all duration-300
                    ${category === "All"
                      ? "bg-gradient-to-r from-[#7c5cff] to-[#b06bff] text-white shadow-[0_4px_15px_-4px_rgba(124,92,255,0.6)]"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    }
                  `}
                >
                  All Courses
                </button>

                {categories.map((item: any, index: number) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCategory(item.title)}
                    className={`
                      shrink-0 rounded-full px-6 py-2.5 font-Poppins text-[14px] font-[500] transition-all duration-300
                      ${category === item.title
                        ? "bg-gradient-to-r from-[#7c5cff] to-[#b06bff] text-white shadow-[0_4px_15px_-4px_rgba(124,92,255,0.6)]"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Results header */}
            <div className="mb-8 mt-16 flex items-end justify-between border-b border-slate-200/60 pb-4 dark:border-white/10">
              <div>
                <h2 className="font-Poppins text-2xl font-[600] text-slate-900 dark:text-white">
                  {category === "All" ? "Available Courses" : category}
                </h2>
              </div>
              <p className="font-Josefin text-[15px] text-slate-500 dark:text-slate-400">
                <span className="font-[600] text-[#7c5cff]">{filteredCourses.length}</span>{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </p>
            </div>

            {/* Courses */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {filteredCourses.map((item: any) => (
                  <CourseCard item={item} key={item._id} />
                ))}
              </div>
            ) : (
              <div className="min-h-[380px] hero-glass mt-8 flex flex-col items-center justify-center rounded-[24px] border border-slate-200/60 p-10 text-center shadow-sm dark:border-white/10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-[#0d0e16]">
                  <span className="text-2xl text-slate-400 dark:text-slate-500">
                    🔍
                  </span>
                </div>
                <h3 className="font-Poppins text-xl font-[600] text-slate-900 dark:text-white">
                  No courses found
                </h3>

                <p className="mt-3 max-w-md font-Josefin text-[16px] leading-[1.6] text-slate-500 dark:text-slate-400">
                  {search
                    ? `We couldn't find any courses matching "${search}". Try adjusting your search query.`
                    : "There are no courses available in this category yet. Check back soon!"}
                </p>

                {(search || category !== "All") && (
                  <button
                    type="button"
                    onClick={() => setCategory("All")}
                    className="mt-6 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#b06bff] px-6 py-2.5 font-Poppins text-[14px] font-[600] text-white shadow-[0_4px_15px_-4px_rgba(124,92,255,0.6)] transition-all hover:opacity-90"
                  >
                    View All Courses
                  </button>
                )}
              </div>
            )}

            {/* Bottom spacing */}
            <div className="h-16" />
          </div>
        </main>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesContent />
    </Suspense>
  );
};

export default Page;