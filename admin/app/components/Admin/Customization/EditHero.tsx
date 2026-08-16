import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

import client1 from "../../../../public/assets/client-1.jpg";
import client2 from "../../../../public/assets/client-2.jpg";
import client3 from "../../../../public/assets/client-3.jpg";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
      setImage(data?.layout?.banner?.image?.url || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden bg-transparent transition-colors duration-300">
      {/* Background animation */}
      <div className="hero_animation absolute left-[-150px] top-[50px] z-0 h-[400px] w-[400px] rounded-full opacity-70 blur-[1px]" />

      {/* Main Hero */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-[90%] max-w-[1400px] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:gap-10">
        {/* Left Content */}
        <div className="flex w-full flex-col items-center text-center lg:w-[55%] lg:items-start lg:text-left">
          <textarea
            className="font-Poppins text-[38px] font-[600] leading-[1.2] text-black transition-colors duration-100 sm:text-[48px] md:text-[55px] lg:text-[60px] dark:text-white bg-transparent outline-none resize-none w-full text-center lg:text-left"
            placeholder="Learn from the best teachers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
          />

          <textarea
            className="mt-4 w-full max-w-[650px] font-Josefin text-[18px] font-[400] leading-[1.6] text-gray-600 transition-colors duration-100 sm:text-[20px] dark:text-gray-300 bg-transparent outline-none resize-none text-center lg:text-left"
            placeholder="Join LearnEx and get access to high-quality courses from experienced instructors. Learn new skills and build your future from anywhere."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            rows={3}
          />

          {/* Search (Static Preview) */}
          <div className="mt-8 flex h-[55px] w-full max-w-[600px] items-center overflow-hidden rounded-[6px] border border-gray-300 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 opacity-80 pointer-events-none">
            <input
              type="search"
              placeholder="Search Courses..."
              readOnly
              className="h-full flex-1 bg-transparent px-4 font-Josefin text-[18px] text-black outline-none placeholder:text-gray-400 transition-colors duration-300 dark:text-white dark:placeholder:text-gray-300"
            />
            <button
              type="button"
              className="flex h-full w-[60px] items-center justify-center bg-[#37a39a] transition hover:bg-[#2d8d85]"
            >
              <BiSearch size={25} className="text-white" />
            </button>
          </div>

          {/* Users + Courses (Static Preview) */}
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row lg:items-center opacity-80 pointer-events-none">
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
            <div className="rounded-[6px] px-6 py-3 font-Poppins text-[16px] font-[600] bg-black text-white shadow-sm transition-colors duration-100 dark:bg-white dark:text-black">
              View Courses
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex w-full items-center justify-center lg:w-[45%]">
          {/* Decorative circle */}
          <div className="absolute right-[5%] top-[5%] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#5c5bd6]/40 to-transparent blur-[2px] transition-opacity duration-300 dark:from-[#37a39a]/30 dark:to-transparent sm:h-[350px] sm:w-[350px]" />

          <div className="relative z-10 w-[80%] max-w-[550px] sm:w-[70%] lg:w-full flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt=""
                className="h-auto w-full object-contain"
              />
            ) : null}
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label
              htmlFor="banner"
              className="absolute bottom-4 right-4 z-20 bg-white dark:bg-black p-3 rounded-full cursor-pointer shadow-md border border-gray-300 dark:border-gray-700 hover:scale-105 transition-transform"
            >
              <AiOutlineCamera className="dark:text-white text-black text-[25px]" />
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div
        className={`${
          styles.button
        } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
      ${
        data?.layout?.banner?.title !== title ||
        data?.layout?.banner?.subTitle !== subTitle ||
        data?.layout?.banner?.image?.url !== image
          ? "!cursor-pointer !bg-[#42d383]"
          : "!cursor-not-allowed"
      }
      !rounded fixed bottom-12 right-12 z-[100] shadow-lg`}
        onClick={
          data?.layout?.banner?.title !== title ||
          data?.layout?.banner?.subTitle !== subTitle ||
          data?.layout?.banner?.image?.url !== image
            ? handleEdit
            : () => null
        }
      >
        Save
      </div>
    </section>
  );
};

export default EditHero;