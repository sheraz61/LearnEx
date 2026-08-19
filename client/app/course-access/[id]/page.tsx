'use client'
import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: any;
}

const Page = ({ params }: Props) => {
  const unwrappedParams = React.use(params) as any;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const isPurchased =
        data.user.role === "admin" ||
        data.user.courses.find(
          (item: any) => item.courseId === unwrappedParams.id || item._id === unwrappedParams.id
        );
      if (!isPurchased) {
        router.push("/");
      }
    }
    if (error) {
      router.push("/");
    }
  }, [data, error, router, unwrappedParams.id]);

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="pt-[65px]">
            <CourseContent id={unwrappedParams.id} user={data.user} />
          </div>

        )
      }
    </>
  )
}

export default Page