"use client";

import React, { FC } from "react";
import CoursePlayer from "../../../../app/utils/coursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const discountPercentage =
    courseData?.estimatedPrice > 0
      ? ((courseData.estimatedPrice - courseData.price) /
          courseData.estimatedPrice) *
        100
      : 0;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-Poppins font-semibold text-slate-800 dark:text-white mb-6">
        Course Preview
      </h2>
      <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-6 md:p-8">
        <div className="w-full relative">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/10">
            <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.title}
            />
          </div>
          
          <div className="flex items-center mt-6">
            <h1 className="text-[32px] font-Poppins font-bold text-slate-800 dark:text-white">
              {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
            </h1>
            <h5 className="pl-4 text-[20px] line-through text-slate-500 dark:text-slate-400">
              {courseData?.estimatedPrice}$
            </h5>
            <h4 className="pl-4 text-[20px] font-semibold text-[var(--hero-accent)]">
              {discountPercentagePrice}% Off
            </h4>
          </div>

          <div className="flex items-center mt-4">
            <div className="w-full md:w-[200px] py-3 bg-red-500 text-white text-center font-Poppins font-semibold rounded-lg shadow-md opacity-80 cursor-not-allowed">
              Buy Now {courseData?.price}$
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <input
              type="text"
              placeholder="Discount code..."
              className="w-full md:w-[60%] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
            />
            <div className="w-[120px] py-3 bg-[var(--hero-accent)] text-white text-center font-Poppins font-semibold rounded-lg shadow-md cursor-pointer hover:bg-[var(--hero-accent-2)] transition-colors">
              Apply
            </div>
          </div>
          
          <div className="mt-6 space-y-2 text-slate-600 dark:text-slate-300 font-Poppins">
            <p className="flex items-center gap-2"><IoCheckmarkDoneOutline className="text-[var(--hero-accent)]" /> Source code included</p>
            <p className="flex items-center gap-2"><IoCheckmarkDoneOutline className="text-[var(--hero-accent)]" /> Full lifetime access</p>
            <p className="flex items-center gap-2"><IoCheckmarkDoneOutline className="text-[var(--hero-accent)]" /> Certificate of completion</p>
            <p className="flex items-center gap-2"><IoCheckmarkDoneOutline className="text-[var(--hero-accent)]" /> Premium Support</p>
          </div>
        </div>
        
        <div className="w-full mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
          <div className="w-full">
            <h1 className="text-[32px] font-Poppins font-bold text-slate-800 dark:text-white leading-tight">
              {courseData?.name}
            </h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Ratings rating={0} />
                <span className="text-slate-600 dark:text-slate-400 font-Poppins">0 Reviews</span>
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-Poppins">0 Students</span>
            </div>
            
            <h2 className="text-[24px] font-Poppins font-semibold text-slate-800 dark:text-white mt-10 mb-4">
              What you will learn from this course?
            </h2>
            <div className="space-y-3">
              {courseData?.benefits?.map((item: any, index: number) => (
                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-Poppins" key={index}>
                  <IoCheckmarkDoneOutline className="text-[var(--hero-accent)] text-[24px] flex-shrink-0 mt-0.5" />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-[24px] font-Poppins font-semibold text-slate-800 dark:text-white mt-10 mb-4">
              What are the prerequisites for starting this course?
            </h2>
            <div className="space-y-3">
              {courseData?.prerequisites?.map((item: any, index: number) => (
                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-Poppins" key={index}>
                  <IoCheckmarkDoneOutline className="text-[var(--hero-accent)] text-[24px] flex-shrink-0 mt-0.5" />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-[24px] font-Poppins font-semibold text-slate-800 dark:text-white mt-10 mb-4">
              Course Details
            </h2>
            <p className="text-[16px] text-slate-600 dark:text-slate-300 font-Poppins leading-relaxed whitespace-pre-line">
              {courseData?.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full flex items-center justify-between mt-8">
        <button
          className="w-full md:w-auto px-8 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-800 dark:text-white font-Poppins font-semibold rounded-lg shadow-md cursor-pointer"
          onClick={() => prevButton()}
        >
          Previous
        </button>
        <button
          className="w-full md:w-auto px-8 py-3 bg-[#45CBA0] hover:bg-[#3ba885] transition-colors text-white font-Poppins font-semibold rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
          onClick={() => createCourse()}
        >
          {isEdit ? "Update Course" : "Create Course"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
