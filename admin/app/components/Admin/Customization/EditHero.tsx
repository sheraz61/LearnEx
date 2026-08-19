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
    <div className="w-full mt-0 hero-glass dark:bg-[#111C43]/60 bg-white/80 border border-slate-200 dark:border-white/10 shadow-lg p-8 rounded-xl max-w-[1200px] mx-auto mb-[100px]">
      <h1 className={`${styles.title} !text-[24px] font-semibold text-slate-800 dark:text-white mb-6 text-center`}>
        Edit Hero Section
      </h1>

      <section className="relative w-full overflow-hidden bg-transparent transition-colors duration-300 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
        {/* Main Hero Preview */}
        <div className="relative z-10 mx-auto flex w-[90%] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:gap-10">
          {/* Left Content */}
          <div className="flex w-full flex-col items-center text-center lg:w-[55%] lg:items-start lg:text-left">
            <textarea
              className="font-Poppins text-[38px] font-[600] leading-[1.2] text-slate-800 transition-colors duration-100 sm:text-[48px] md:text-[55px] lg:text-[60px] dark:text-white bg-transparent outline-none resize-none w-full text-center lg:text-left border border-transparent hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-2 focus:border-[#45CBA0]"
              placeholder="Learn from the best teachers"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={2}
            />

            <textarea
              className="mt-4 w-full max-w-[650px] font-Josefin text-[18px] font-[400] leading-[1.6] text-slate-600 transition-colors duration-100 sm:text-[20px] dark:text-slate-300 bg-transparent outline-none resize-none text-center lg:text-left border border-transparent hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-2 focus:border-[#45CBA0]"
              placeholder="Join LearnEx and get access to high-quality courses from experienced instructors. Learn new skills and build your future from anywhere."
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              rows={3}
            />

            {/* Search (Static Preview) */}
            <div className="mt-8 flex h-[55px] w-full max-w-[600px] items-center overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 opacity-60 pointer-events-none">
              <input
                type="search"
                placeholder="Search Courses..."
                readOnly
                className="h-full flex-1 bg-transparent px-4 font-Josefin text-[18px] text-slate-800 outline-none placeholder:text-slate-400 transition-colors duration-300 dark:text-white dark:placeholder:text-slate-400"
              />
              <button
                type="button"
                className="flex h-full w-[60px] items-center justify-center bg-[#45CBA0] transition"
              >
                <BiSearch size={25} className="text-white" />
              </button>
            </div>

            {/* Users + Courses (Static Preview) */}
            <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row lg:items-center opacity-60 pointer-events-none">
              <div className="flex items-center">
                <Image
                  src={client1}
                  width={45}
                  height={45}
                  alt="LearnEx student"
                  className="h-[45px] w-[45px] rounded-full border-2 border-slate-200 object-cover dark:border-slate-800"
                />
                <Image
                  src={client2}
                  width={45}
                  height={45}
                  alt="LearnEx student"
                  className="-ml-3 h-[45px] w-[45px] rounded-full border-2 border-slate-200 object-cover dark:border-slate-800"
                />
                <Image
                  src={client3}
                  width={45}
                  height={45}
                  alt="LearnEx student"
                  className="-ml-3 h-[45px] w-[45px] rounded-full border-2 border-slate-200 object-cover dark:border-slate-800"
                />
              </div>
              <p className="font-Josefin text-[16px] text-slate-600 transition-colors duration-100 dark:text-slate-300">
                <span className="font-[600] text-slate-800 dark:text-white">
                  500K+
                </span>{" "}
                people already trust LearnEx.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex w-full items-center justify-center lg:w-[45%]">
            <div className="relative z-10 w-[80%] max-w-[550px] sm:w-[70%] lg:w-full flex items-center justify-center min-h-[300px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-full bg-white/50 dark:bg-black/20">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-auto w-full object-contain max-h-[400px] rounded-full"
                />
              ) : (
                <p className="text-slate-500 dark:text-slate-400 font-Poppins">No Image Uploaded</p>
              )}
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
                className="absolute bottom-4 right-4 z-20 bg-white dark:bg-slate-800 p-4 rounded-full cursor-pointer shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform"
              >
                <AiOutlineCamera className="text-slate-800 dark:text-white text-[25px]" />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          className={`
            px-6 py-2.5 rounded-lg font-Poppins font-medium transition-all shadow-md
            ${
              data?.layout?.banner?.title === title &&
              data?.layout?.banner?.subTitle === subTitle &&
              data?.layout?.banner?.image?.url === image
                ? "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-[#45CBA0] hover:bg-[#3ba885] text-white hover:shadow-lg hover:-translate-y-0.5"
            }
          `}
          disabled={
            data?.layout?.banner?.title === title &&
            data?.layout?.banner?.subTitle === subTitle &&
            data?.layout?.banner?.image?.url === image
          }
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? handleEdit
              : () => null
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditHero;