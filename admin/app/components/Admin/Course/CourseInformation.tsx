'use client'
import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-Poppins font-semibold text-slate-800 dark:text-white mb-6">
        Course Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="name">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="e.g. MERN stack LMS platform with next 13"
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
          />
        </div>
        
        <div>
          <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400 resize-none"
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="e.g. 29"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="e.g. 79"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="tags">
              Course Tags
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="e.g. MERN, Next 13, Tailwind CSS"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">
              Course Categories
            </label>
            <select
              name=""
              id=""
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white"
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
               <option className="dark:bg-slate-800 text-slate-800 dark:text-white" value="">
                Select Category
              </option>
              {categories &&
                categories.map((item: any) => (
                  <option
                    className="dark:bg-slate-800 text-slate-800 dark:text-white"
                    value={item.title}
                    key={item._id}
                  >
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Course Level</label>
            <input
              type="text"
              name=""
              value={courseInfo.level}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="e.g. Beginner/Intermediate/Expert"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        
        <div className="w-full">
          <label className="block text-[16px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Course Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-colors duration-300 ${
              dragging 
                ? "bg-[var(--hero-accent)]/10 border-[var(--hero-accent)]" 
                : "bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="thumbnail"
                className="max-h-[300px] w-auto object-contain rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <svg className="w-12 h-12 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="font-Poppins font-medium">Click to browse or drag and drop</span>
                <span className="text-sm mt-1">PNG, JPG, JPEG</span>
              </div>
            )}
          </label>
        </div>
        
        <div className="w-full flex items-center justify-end mt-8">
          <input
            type="submit"
            value="Next Step"
            className="w-full md:w-auto px-8 py-3 bg-[#45CBA0] hover:bg-[#3ba885] transition-colors text-white font-Poppins font-semibold rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;