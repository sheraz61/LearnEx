"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch, BiRightArrowAlt } from "react-icons/bi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useRouter } from "next/navigation";

import img1 from "../../../public/assets/banner-img-1.png";
import client1 from "../../../public/assets/client-1.jpg";
import client2 from "../../../public/assets/client-2.jpg";
import client3 from "../../../public/assets/client-3.jpg";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Banner", {});

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) {
      return;
    }

    router.push(`/courses?title=${encodeURIComponent(search.trim())}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden bg-white transition-colors duration-300 dark:bg-[#07070c]">

      {/* Background layer: subtle grid + floating gradient mesh */}
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 z-0" />
      <div className="hero-blob hero-blob-violet pointer-events-none absolute -left-32 top-10 z-0 h-[420px] w-[420px]" />
      <div className="hero-blob hero-blob-amber pointer-events-none absolute -right-24 bottom-0 z-0 h-[380px] w-[380px]" />

      {/* Main Hero */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-[90%] max-w-[1400px] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:gap-10">

        {/* Left Content */}
        <div className="flex w-full flex-col items-center text-center lg:w-[55%] lg:items-start lg:text-left">

          {/* Eyebrow badge */}
          <div className="hero-glass mb-6 flex items-center gap-2 rounded-full border border-slate-200/60 px-4 py-1.5 shadow-sm dark:border-white/10">
            <HiOutlineSparkles size={16} className="text-[#7c5cff]" />
            <span className="font-Josefin text-[13px] font-[500] tracking-wide text-slate-700 dark:text-slate-200">
              Online Learning Platform
            </span>
          </div>

          <h1 className="font-Poppins text-[38px] font-[600] leading-[1.15] tracking-tight text-black transition-colors duration-100 sm:text-[48px] md:text-[55px] lg:text-[60px] dark:text-white">
            {data?.layout?.banner?.title !== undefined ? (
              data?.layout?.banner?.title
            ) : (
              <>
                Learn from the
                <span className="hero-gradient-text block">best teachers</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-[650px] font-Josefin text-[18px] font-[400] leading-[1.6] text-gray-600 transition-colors duration-100 sm:text-[20px] dark:text-gray-400">
            {data?.layout?.banner?.subTitle !== undefined
              ? data?.layout?.banner?.subTitle
              : "Join LearnEx and get access to high-quality courses from experienced instructors. Learn new skills and build your future from anywhere."}
          </p>

          {/* Search */}
          <div className="hero-glass mt-8 flex h-[56px] w-full max-w-[600px] items-center overflow-hidden rounded-full border border-slate-200/70 shadow-sm ring-1 ring-transparent transition-all duration-300 focus-within:ring-[#7c5cff]/50 dark:border-white/10">

            <BiSearch
              size={20}
              className="ml-5 shrink-0 text-slate-400 dark:text-slate-500"
            />

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
              className="h-full flex-1 bg-transparent px-3 font-Josefin text-[17px] text-black outline-none placeholder:text-gray-400 transition-colors duration-300 dark:text-white dark:placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="mr-1.5 flex h-[44px] items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#b06bff] px-5 font-Poppins text-[14px] font-[600] text-white shadow-[0_8px_20px_-6px_rgba(124,92,255,0.6)] transition hover:opacity-90"
            >
              Search
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
                className="h-[45px] w-[45px] rounded-full border-2 border-white object-cover shadow-sm dark:border-[#0d0e16]"
              />

              <Image
                src={client2}
                width={45}
                height={45}
                alt="LearnEx student"
                className="-ml-3 h-[45px] w-[45px] rounded-full border-2 border-white object-cover shadow-sm dark:border-[#0d0e16]"
              />

              <Image
                src={client3}
                width={45}
                height={45}
                alt="LearnEx student"
                className="-ml-3 h-[45px] w-[45px] rounded-full border-2 border-white object-cover shadow-sm dark:border-[#0d0e16]"
              />
            </div>

            <p className="font-Josefin text-[16px] text-gray-600 transition-colors duration-100 dark:text-gray-400">
              <span className="font-[600] text-black dark:text-white">
                500K+
              </span>{" "}
              people already trust LearnEx.
            </p>

            <Link
              href="/courses"
              className="group flex items-center gap-2 rounded-full bg-black px-6 py-3 font-Poppins text-[16px] font-[600] text-white shadow-sm transition-all duration-200 hover:gap-3 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              View Courses
              <BiRightArrowAlt
                size={20}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex w-full items-center justify-center lg:w-[45%]">

          {/* Dashed orbit ring */}
          <div className="hero-orbit-ring pointer-events-none absolute h-[310px] w-[310px] rounded-full border border-dashed border-[#7c5cff]/25 sm:h-[380px] sm:w-[380px] dark:border-[#b06bff]/20" />

          {/* Framed / glowing image container */}
          <div className="relative z-10 rounded-[28px] bg-gradient-to-br from-[#7c5cff] via-[#b06bff]/50 to-[#f5b74d]/60 p-[2px] shadow-[0_30px_80px_-30px_rgba(124,92,255,0.45)]">
            <div className="rounded-[26px] bg-white p-6 dark:bg-[#0d0e16]">
              <Image
                src={data?.layout?.banner?.image?.url || img1}
                width={600}
                height={600}
                priority
                alt="LearnEx online learning"
                className="h-auto w-[78vw] max-w-[420px] object-contain sm:w-[340px] lg:w-[380px]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;