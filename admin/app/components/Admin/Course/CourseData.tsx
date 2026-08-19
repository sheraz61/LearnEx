"use client";

import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-Poppins font-semibold text-slate-800 dark:text-white mb-6">
        Course Prerequisites & Benefits
      </h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-4" htmlFor="benefits">
            What are the benefits for students in this course?
          </label>
          <div className="space-y-3">
            {benefits.map((benefit: any, index: number) => (
              <input
                type="text"
                key={index}
                name="Benefit"
                placeholder="e.g. You will be able to build a full stack LMS Platform..."
                required
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            className="flex items-center gap-2 mt-4 text-[var(--hero-accent)] font-Poppins font-medium hover:text-[var(--hero-accent-2)] transition-colors"
            onClick={handleAddBenefit}
          >
            <AiOutlinePlusCircle className="text-[20px]" />
            Add Benefit
          </button>
        </div>

        <div>
          <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-4" htmlFor="prerequisites">
            What are the prerequisites for starting this course?
          </label>
          <div className="space-y-3">
            {prerequisites.map((prerequisite, index) => (
              <input
                type="text"
                key={index}
                name="prerequisites"
                placeholder="e.g. You need basic knowledge of MERN stack"
                required
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
                value={prerequisite.title}
                onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            className="flex items-center gap-2 mt-4 text-[var(--hero-accent)] font-Poppins font-medium hover:text-[var(--hero-accent-2)] transition-colors"
            onClick={handleAddPrerequisites}
          >
            <AiOutlinePlusCircle className="text-[20px]" />
            Add Prerequisite
          </button>
        </div>
        
        <div className="w-full flex items-center justify-between mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
          <button
            className="w-full md:w-auto px-8 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-800 dark:text-white font-Poppins font-semibold rounded-lg shadow-md cursor-pointer"
            onClick={() => prevButton()}
          >
            Previous
          </button>
          <button
            className="w-full md:w-auto px-8 py-3 bg-[#45CBA0] hover:bg-[#3ba885] transition-colors text-white font-Poppins font-semibold rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
            onClick={() => handleOptions()}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
