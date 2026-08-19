import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineUnorderedList,
} from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={
        !isProfile
          ? `/course/${item._id}`
          : `course-access/${item._id}`
      }
      className="group block h-full"
    >
      <div
        className="
          relative flex h-full min-h-[360px] flex-col overflow-hidden
          rounded-2xl
          border border-slate-200/80
          bg-white/70
          p-3
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          backdrop-blur-xl
          transition-all duration-500
          hover:-translate-y-1
          hover:border-[#7c5cff]/25
          hover:shadow-[0_18px_45px_rgba(124,92,255,0.10)]
          dark:border-white/[0.08]
          dark:bg-white/[0.025]
          dark:shadow-[0_8px_30px_rgba(0,0,0,0.18)]
          dark:hover:border-[#7c5cff]/25
          dark:hover:shadow-[0_18px_45px_rgba(124,92,255,0.10)]
        "
      >
        {/* Subtle top glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#7c5cff]/10 blur-3xl transition-all duration-500 group-hover:bg-[#7c5cff]/20" />

        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-white/[0.04]">
          <Image
            src={
              item?.thumbnail?.url ||
              item?.thumbnail ||
              "/assets/business-img.png"
            }
            width={500}
            height={300}
            className="
              aspect-[16/9]
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
            alt={item?.name || "Course thumbnail"}
          />

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-1 pt-4">
          {/* Course title */}
          <h1
            className="
              line-clamp-2
              min-h-[48px]
              font-Poppins
              text-[16px]
              font-semibold
              leading-6
              text-slate-900
              transition-colors
              duration-300
              group-hover:text-[#7c5cff]
              dark:text-white
            "
          >
            {item.name}
          </h1>

          {/* Rating + students */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <Ratings rating={item.ratings} />

            <h5
              className={`
                text-xs
                text-slate-500
                dark:text-slate-400
                ${
                  isProfile
                    ? "hidden 800px:inline"
                    : ""
                }
              `}
            >
              {item.purchased} Students
            </h5>
          </div>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-slate-200/80 dark:bg-white/[0.07]" />

          {/* Price + lectures */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-Poppins text-lg font-semibold text-slate-900 dark:text-white">
                {item.price === 0 ? "Free" : `${item.price}$`}
              </h3>

              {item.price !== 0 && (
                <h5 className="text-xs text-slate-400 line-through dark:text-slate-500">
                  {item.estimatedPrice}$
                </h5>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <AiOutlineUnorderedList size={15} />

              <h5 className="text-xs">
                {item.courseData?.length} Lectures
              </h5>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-200/80
              bg-slate-50/80
              px-3
              py-2.5
              transition-all
              duration-300
              group-hover:border-[#7c5cff]/15
              group-hover:bg-[#7c5cff]/5
              dark:border-white/[0.06]
              dark:bg-white/[0.025]
              dark:group-hover:bg-[#7c5cff]/[0.06]
            "
          >
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              View course
            </span>

            <AiOutlineArrowRight
              size={16}
              className="
                text-slate-400
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-[#7c5cff]
              "
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;