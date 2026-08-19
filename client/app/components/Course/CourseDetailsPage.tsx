'use client'
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const courseData = data?.course ? (Array.isArray(data.course) ? data.course[0] : data.course) : null;

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (courseData && userData?.user) {
      const isPurchased =
        userData?.user?.role === "admin" ||
        userData?.user?.courses?.find(
          (item: any) =>
            item.courseId === courseData._id || item._id === courseData._id
        );
      const amount = Math.round(courseData.price * 100);
      if (amount > 0 && !isPurchased) {
        createPaymentIntent(amount);
      }
    }
  }, [config, courseData, userData]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading || !courseData ? (
        <Loader />
      ) : (
        <main className="pt-[80px] min-h-[calc(100vh-80px)] bg-white transition-colors duration-300 dark:bg-[#07070c]">
          <Heading
            title={courseData.name + " - LearnEx"}
            description={
              "LearnEx is a programming community which is developed by shahriar sajeeb for helping programmers"
            }
            keywords={courseData.tags}
          />

          {stripePromise && (
            <CourseDetails
              data={courseData}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
        </main>
      )}
    </>
  );
};

export default CourseDetailsPage;