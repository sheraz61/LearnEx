import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div className={`w-full ${!props.isDemo ? 'lg:sticky lg:top-24 lg:left-0 z-30' : ''}`}>
      {videoSections.map((section: string, sectionIndex: number) => {

        const isSectionVisible = visibleSections.has(section);

        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div
            className={`mb-3 overflow-hidden rounded-lg ${!props.isDemo ? 'border border-slate-200 dark:border-white/10' : 'border-b border-slate-200 dark:border-white/10 last:border-0'}`}
            key={section}
          >
            <button
              type="button"
              className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
              onClick={() => toggleSection(section)}
            >
              <div>
                <h2 className="text-[15px] font-Poppins font-[600] text-slate-900 dark:text-white">
                  {section}
                </h2>
                <p className="mt-0.5 font-Josefin text-[13px] text-slate-500 dark:text-slate-400">
                  {sectionVideoCount} lessons ·{" "}
                  {sectionVideoLength < 60
                    ? sectionVideoLength
                    : sectionContentHours.toFixed(2)}{" "}
                  {sectionVideoLength > 60 ? "hours" : "minutes"}
                </p>
              </div>
              <span className="text-slate-400 dark:text-slate-500">
                {isSectionVisible ? (
                  <BsChevronUp size={16} />
                ) : (
                  <BsChevronDown size={16} />
                )}
              </span>
            </button>

            {isSectionVisible && (
              <div className="border-t border-slate-200 dark:border-white/10">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  const isActive = videoIndex === props.activeVideo;

                  return (
                    <div
                      className={`w-full flex items-center gap-3 py-3 px-4 cursor-pointer transition-colors ${
                        isActive
                          ? "bg-[#7c5cff]/[0.06]"
                          : "hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                      }`}
                      key={item._id}
                      onClick={() => props.isDemo ? null : props?.setActiveVideo(videoIndex)}
                    >
                      <MdOutlineOndemandVideo
                        size={18}
                        className={`shrink-0 ${isActive ? 'text-[#7c5cff]' : 'text-slate-400 dark:text-slate-500'}`}
                      />
                      <div className="flex-1 min-w-0">
                        <h1 className={`text-[14px] font-Poppins truncate ${isActive ? 'font-[600] text-[#7c5cff]' : 'font-[500] text-slate-800 dark:text-slate-200'}`}>
                          {item.title}
                        </h1>
                      </div>
                      <span className="shrink-0 font-Josefin text-[13px] text-slate-400 dark:text-slate-500">
                        {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength}
                        {item.videoLength > 60 ? "h" : "m"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;