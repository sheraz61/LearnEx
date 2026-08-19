'use client'

import React, {FC} from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (active: number) => void;
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
      ];
    return (
     <div className="flex flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
      {options.map((option:any, index:number) => {
        const isActive = active === index;
        const isCompleted = active > index;
        const isCurrentOrCompleted = active >= index;
        
        return (
          <div key={index} className={`flex lg:w-full items-center lg:items-start flex-shrink-0 cursor-pointer transition-opacity duration-300 ${!isCurrentOrCompleted && 'opacity-60'}`} onClick={() => active > index ? setActive(index) : null}>
            
            <div className="flex flex-col items-center">
              <div
                className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                  ${isCompleted ? "bg-[#45CBA0] text-white shadow-[#45CBA0]/30" : 
                    isActive ? "bg-[var(--hero-accent)] text-white shadow-[var(--hero-accent)]/30 ring-4 ring-[var(--hero-accent)]/20" : 
                    "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  } relative z-10`}
              >
                {isCompleted ? <IoMdCheckmark className="text-[20px]" /> : <span className="font-semibold text-[14px]">{index + 1}</span>}
              </div>
              {/* Vertical Line for Desktop */}
              {index !== options.length - 1 && (
                <div
                  className={`hidden lg:block w-[2px] h-[40px] mt-2 transition-all duration-300 ${
                    isCompleted ? "bg-[#45CBA0]" : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}
            </div>

            <h5
              className={`hidden lg:block pl-4 mt-2 font-Poppins text-[16px] transition-colors duration-300
              ${
                isActive
                  ? "text-[var(--hero-accent)] font-semibold"
                  : isCompleted 
                  ? "text-slate-800 dark:text-slate-200"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {option}
            </h5>
            
            {/* Horizontal Line for Mobile */}
            {index !== options.length - 1 && (
              <div
                className={`lg:hidden h-[2px] w-[30px] sm:w-[50px] mx-3 transition-all duration-300 ${
                  isCompleted ? "bg-[#45CBA0]" : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            )}
          </div>
        );
      })}
     </div>
    )
}

export default CourseOptions