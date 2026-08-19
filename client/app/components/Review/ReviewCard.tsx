import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div
      className="
        group relative w-full overflow-hidden rounded-2xl
        border border-slate-200/80
        bg-white/70
        p-5
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1
        hover:border-[#7c5cff]/20
        hover:shadow-[0_18px_45px_rgba(124,92,255,0.08)]
        dark:border-white/[0.08]
        dark:bg-white/[0.025]
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.18)]
        dark:hover:border-[#7c5cff]/20
        dark:hover:shadow-[0_18px_45px_rgba(124,92,255,0.08)]
      "
    >
      {/* Soft ambient glow */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-36 w-36
          rounded-full
          bg-[#7c5cff]/[0.06]
          blur-3xl
          transition-all duration-500
          group-hover:bg-[#7c5cff]/[0.12]
        "
      />

      {/* Quote icon */}
      <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-[#7c5cff]/10 bg-[#7c5cff]/5">
        <FaQuoteLeft
          size={18}
          className="text-[#7c5cff]/70"
        />
      </div>

      {/* User information */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={props.item.avatar}
              alt={props.item.name}
              width={52}
              height={52}
              className="
                h-[52px] w-[52px]
                rounded-full
                object-cover
                ring-2
                ring-white
                dark:ring-white/[0.08]
              "
            />

            {/* Online/status dot */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 dark:border-[#101014]" />
          </div>

          <div>
            <h5 className="font-Poppins text-[16px] font-semibold text-slate-900 dark:text-white">
              {props.item.name}
            </h5>

            <h6 className="mt-0.5 max-w-[220px] text-xs leading-5 text-slate-500 dark:text-slate-400">
              {props.item.profession}
            </h6>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="relative mt-4">
        <Ratings rating={5} />
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-slate-200/80 dark:bg-white/[0.06]" />

      {/* Review */}
      <p className="relative font-Poppins text-sm leading-6 text-slate-600 dark:text-slate-300">
        {props.item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;