"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

import img1 from "../../../public/assets/banner-img-1.png";
import client1 from "../../../public/assets/client-1.jpg";
import client2 from "../../../public/assets/client-2.jpg";
import client3 from "../../../public/assets/client-3.jpg";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {};

const Hero: FC<Props> = () => {
      const { data, refetch } = useGetHeroDataQuery("Banner", {});

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) {
      return;
    }

    router.push(`/courses?title=${encodeURIComponent(search.trim())}`);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden bg-white transition-colors duration-300 dark:bg-slate-950">

      {/* Background animation */}
      <div className="hero_animation absolute left-[-150px] top-[50px] z-0 h-[400px] w-[400px] rounded-full opacity-70 blur-[1px]" />

      {/* Main Hero */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-[90%] max-w-[1400px] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:gap-10">

        {/* Left Content */}
        <div className="flex w-full flex-col items-center text-center lg:w-[55%] lg:items-start lg:text-left">

          <h1 className="font-Poppins text-[38px] font-[600] leading-[1.2] text-black transition-colors duration-100 sm:text-[48px] md:text-[55px] lg:text-[60px] dark:text-white">
            {data?.layout?.banner?.title !== undefined ? (
              data?.layout?.banner?.title
            ) : (
              <>
                Learn from the
                <span className="text-gradient block">best teachers</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-[650px] font-Josefin text-[18px] font-[400] leading-[1.6] text-gray-600 transition-colors duration-100 sm:text-[20px] dark:text-gray-300">
            {data?.layout?.banner?.subTitle !== undefined
              ? data?.layout?.banner?.subTitle
              : "Join LearnEx and get access to high-quality courses from experienced instructors. Learn new skills and build your future from anywhere."}
          </p>

          {/* Search */}
          <div className="mt-8 flex h-[55px] w-full max-w-[600px] items-center overflow-hidden rounded-[6px] border border-gray-300 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

            <input
              type="search"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="h-full flex-1 bg-transparent px-4 font-Josefin text-[18px] text-black outline-none placeholder:text-gray-400 transition-colors duration-300 dark:text-white dark:placeholder:text-gray-300"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="flex h-full w-[60px] items-center justify-center bg-[#37a39a] transition hover:bg-[#2d8d85]"
            >
              <BiSearch
                size={25}
                className="text-white"
              />
            </button>
          </div>

          {/* Users + Courses */}
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row lg:items-center">

            <div className="flex items-center">
              <Image
                src={client1}
                width={45}
                height={45}
                alt="LearnEx student"
                className="h-[45px] w-[45px] rounded-full border-2 border-slate-200 object-cover dark:border-slate-900"
              />

              <Image
                src={client2}
                width={45}
                height={45}
                alt="LearnEx student"
                className="-ml-3 h-[45px] w-[45px] rounded-full border-2 border-slate-200 object-cover dark:border-slate-900"
              />

              <Image
                src={client3}
                width={45}
                height={45}
                alt="LearnEx student"
                className="-ml-3 h-[45px] w-[45px] rounded-full border-2 border-slate-200 object-cover dark:border-slate-900"
              />
            </div>

            <p className="font-Josefin text-[16px] text-gray-600 transition-colors duration-100 dark:text-gray-300">
              <span className="font-[600] text-black dark:text-white">
                500K+
              </span>{" "}
              people already trust LearnEx.
            </p>

            <Link
              href="/courses"
              className="rounded-[6px] px-6 py-3 font-Poppins text-[16px] font-[600] bg-black text-white shadow-sm transition-colors duration-100 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              View Courses
            </Link>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex w-full items-center justify-center lg:w-[45%]">

          {/* Decorative circle */}
          <div className="absolute right-[5%] top-[5%] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#5c5bd6]/40 to-transparent blur-[2px] transition-opacity duration-300 dark:from-[#37a39a]/30 dark:to-transparent sm:h-[350px] sm:w-[350px]" />

          <Image
            src={data?.layout?.banner?.image?.url || img1}
            width={600}
            height={600}
            priority
            alt="LearnEx online learning"
            className="relative z-10 h-auto w-[80%] max-w-[550px] object-contain sm:w-[70%] lg:w-full"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;