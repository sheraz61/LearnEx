'use client'

import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("section can't be empty!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-Poppins font-semibold text-slate-800 dark:text-white mb-6">
        Course Content
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <React.Fragment key={index}>
              {showSectionInput && (
                <div className="flex w-full items-center mt-8 mb-4">
                  <input
                    type="text"
                    className={`text-[20px] ${
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins font-semibold cursor-pointer dark:text-white text-slate-800 bg-transparent outline-none border-b border-transparent focus:border-[var(--hero-accent)] transition-colors`}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BsPencil className="cursor-pointer dark:text-white text-slate-600 ml-3 hover:text-[var(--hero-accent)] transition-colors" />
                </div>
              )}

              <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-6 transition-all shadow-sm hover:shadow-md">
                <div className="flex w-full items-center justify-between">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins font-medium dark:text-white text-slate-800">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* arrow button for collasped video content */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`p-2 rounded-full transition-colors ${
                        index > 0 
                          ? "hover:bg-red-500/10 text-slate-400 hover:text-red-500 cursor-pointer" 
                          : "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    >
                      <AiOutlineDelete className="text-[20px]" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
                      onClick={() => handleCollapseToggle(index)}
                    >
                      <MdOutlineKeyboardArrowDown
                        fontSize="large"
                        style={{
                          transform: isCollapsed[index]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease"
                        }}
                      />
                    </button>
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-[14px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Video Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Project Plan..."
                        className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Video Url</label>
                      <input
                        type="text"
                        placeholder="e.g. https://youtube.com/..."
                        className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 20"
                        className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400"
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2">Video Description</label>
                      <textarea
                        rows={4}
                        placeholder="Enter Video Description"
                        className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400 resize-none"
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    
                    {/* Links */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
                      {item?.links.map((link: any, linkIndex: number) => (
                        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-white/5" key={linkIndex}>
                          <div className="w-full flex items-center justify-between mb-3">
                            <label className="text-[14px] font-Poppins font-medium text-slate-700 dark:text-slate-300">
                              Resource Link {linkIndex + 1}
                            </label>
                            <button
                              type="button"
                              className={`p-1.5 rounded-full transition-colors ${
                                linkIndex === 0
                                  ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                                  : "hover:bg-red-500/10 text-slate-400 hover:text-red-500 cursor-pointer"
                              }`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                            >
                              <AiOutlineDelete className="text-[18px]" />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="e.g. Source Code (Link title)"
                              className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400 text-[14px]"
                              value={link.title}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links[linkIndex].title = e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                            <input
                              type="url"
                              placeholder="e.g. https://github.com/... (Link URL)"
                              className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 outline-none focus:border-[var(--hero-accent)] transition-colors text-slate-800 dark:text-white placeholder:text-slate-400 text-[14px]"
                              value={link.url}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links[linkIndex].url = e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        className="flex items-center gap-2 mt-2 text-[14px] text-[var(--hero-accent)] font-Poppins font-medium hover:text-[var(--hero-accent-2)] transition-colors"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="text-[18px]" /> Add Another Link
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Add new content in same section */}
                {index === courseContentData.length - 1 && (
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-[15px] text-[var(--hero-accent)] font-Poppins font-medium hover:text-[var(--hero-accent-2)] transition-colors"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="text-[20px]" /> Add New Lesson
                    </button>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
        
        <div className="pt-6">
          <button
            type="button"
            className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-[var(--hero-accent)] hover:border-[var(--hero-accent)] hover:bg-[var(--hero-accent)]/5 transition-all font-Poppins font-medium"
            onClick={() => addNewSection()}
          >
            <AiOutlinePlusCircle className="mr-2 text-[20px]" /> Add New Section
          </button>
        </div>
      </form>
      
      <div className="w-full flex items-center justify-between mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
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
  );
};

export default CourseContent;