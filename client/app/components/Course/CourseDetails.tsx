'use client'
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/coursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
    user?.role === "admin" ||
    (user &&
      user?.courses?.find(
        (item: any) => item.courseId === data._id || item._id === data._id
      ));

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { route: "Login" } }));
    }
  };

  return (
    <div className="w-[92%] max-w-[1400px] mx-auto py-10">
      <div className="w-full flex flex-col-reverse lg:flex-row gap-10">
        <div className="w-full lg:w-[65%]">
          <h1 className="text-[28px] md:text-[36px] font-Poppins font-[600] tracking-tight leading-[1.2] text-slate-900 dark:text-white">
            {data.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              <Ratings rating={data.ratings} />
              <h5 className="text-slate-600 dark:text-slate-400 text-[14px]">
                {data.reviews?.length} Reviews
              </h5>
            </div>
            <h5 className="text-slate-600 dark:text-slate-400 text-[14px]">
              {data.purchased} Students
            </h5>
          </div>

          <div className="mt-10">
            <h2 className="text-[19px] font-Poppins font-[600] text-slate-900 dark:text-white mb-4">
              What you will learn from this course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {data.benefits?.map((item: any, index: number) => (
                <div className="flex items-start gap-2.5" key={index}>
                  <IoCheckmarkDoneOutline
                    size={18}
                    className="mt-0.5 shrink-0 text-[#7c5cff]"
                  />
                  <p className="text-[15px] font-Josefin text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-[19px] font-Poppins font-[600] text-slate-900 dark:text-white mb-4">
              What are the prerequisites for this course?
            </h2>
            <div className="space-y-3">
              {data.prerequisites?.map((item: any, index: number) => (
                <div className="flex items-start gap-2.5" key={index}>
                  <IoCheckmarkDoneOutline
                    size={18}
                    className="mt-0.5 shrink-0 text-[#7c5cff]"
                  />
                  <p className="text-[15px] font-Josefin text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-[19px] font-Poppins font-[600] text-slate-900 dark:text-white mb-4">
              Course Overview
            </h2>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </div>

          <div className="w-full mt-10">
            <h2 className="text-[19px] font-Poppins font-[600] text-slate-900 dark:text-white mb-4">
              Course Details
            </h2>
            <p className="text-[15px] font-Josefin leading-relaxed whitespace-pre-line w-full overflow-hidden text-slate-600 dark:text-slate-400">
              {data.description}
            </p>
          </div>

          <div className="w-full mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <Ratings rating={data?.ratings} />
              <h5 className="text-[16px] font-Poppins text-slate-900 dark:text-white">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings?.toFixed(1)
                  : data?.ratings?.toFixed(2)}{" "}
                Course Rating · {data?.reviews?.length} Reviews
              </h5>
            </div>
            <div className="mt-6 space-y-6">
              {(data?.reviews && [...data?.reviews]?.reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full pb-6 border-b border-slate-200 dark:border-white/10 last:border-0" key={index}>
                    <div className="flex gap-3">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={44}
                        height={44}
                        alt=""
                        className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
                      />
                      <div className="w-full">
                        <div className="flex items-center justify-between w-full">
                          <h5 className="text-[15px] font-Poppins font-[500] text-slate-900 dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="mt-1.5 text-[14px] text-slate-600 dark:text-white/70">
                          {item.comment}
                        </p>
                        <small className="text-slate-400 dark:text-white/40 mt-1 block">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex mt-4 md:ml-14 gap-3" key={index}>
                        <Image
                          src={
                            i.user.avatar
                              ? i.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={40}
                          height={40}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-[14px] font-[500] text-slate-900 dark:text-white">
                              {i.user.name}
                            </h5>
                            <VscVerifiedFilled className="text-[#0095F6] text-[15px]" />
                          </div>
                          <p className="mt-1.5 text-[14px] text-slate-600 dark:text-white/70">
                            {i.comment}
                          </p>
                          <small className="text-slate-400 dark:text-white/40 mt-1 block">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] relative mt-8 lg:mt-0">
          <div className="sticky top-24 left-0 w-full rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d0e16]">
            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

            <div className="flex items-center pt-5">
              <h1 className="text-[26px] font-Poppins font-[600] text-slate-900 dark:text-white">
                {data.price === 0 ? "Free" : data.price + "$"}
              </h1>
              <h5 className="pl-3 text-[16px] mt-1 line-through text-slate-400 font-Josefin">
                {data.estimatedPrice}$
              </h5>
              <span className="ml-auto text-[13px] font-[600] text-[#7c5cff]">
                {discountPercentengePrice}% off
              </span>
            </div>

            <div className="mt-6">
              {isPurchased ? (
                <Link
                  className="flex h-11 w-full items-center justify-center rounded-md bg-[#7c5cff] font-Poppins text-[14px] font-[500] text-white transition-opacity hover:opacity-90"
                  href={`/course-access/${data._id}`}
                >
                  Enter to Course
                </Link>
              ) : (
                <div
                  className="flex h-11 w-full cursor-pointer items-center justify-center rounded-md bg-[#7c5cff] font-Poppins text-[14px] font-[500] text-white transition-opacity hover:opacity-90"
                  onClick={handleOrder}
                >
                  Enroll Now for {data.price}$
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <IoCheckmarkDoneOutline size={16} className="text-[#7c5cff]" />
                <p className="text-[13.5px] font-Poppins text-slate-600 dark:text-white/70">
                  Source code included
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkDoneOutline size={16} className="text-[#7c5cff]" />
                <p className="text-[13.5px] font-Poppins text-slate-600 dark:text-white/70">
                  Full lifetime access
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkDoneOutline size={16} className="text-[#7c5cff]" />
                <p className="text-[13.5px] font-Poppins text-slate-600 dark:text-white/70">
                  Certificate of completion
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkDoneOutline size={16} className="text-[#7c5cff]" />
                <p className="text-[13.5px] font-Poppins text-slate-600 dark:text-white/70">
                  Premium Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="w-full h-screen bg-black/40 fixed top-0 left-0 z-[1000] flex items-center justify-center px-4">
          <div className="w-full sm:w-[500px] min-h-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0d0e16] rounded-xl border border-slate-200 dark:border-white/10 p-4">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={28}
                className="text-slate-500 dark:text-slate-400 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} data={data} user={user} refetch={refetch} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;