"use client";

import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
      refetch();
      router.push("/admin");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="text-[22px] sm:text-[24px] font-Poppins font-semibold text-black dark:text-white">
          Admin Portal
        </h1>

        <p className="text-[13px] mt-1 text-slate-500 dark:text-slate-400">
          Sign in to access the LearnEx Dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            htmlFor="email"
          >
            Email address
          </label>

          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="admin@learnex.com"
            className={`
              w-full h-[42px]
              px-3
              rounded-lg
              border
              bg-slate-50 dark:bg-white/[0.03]
              text-[13px]
              text-black dark:text-white
              placeholder:text-slate-400
              outline-none
              transition-all
              focus:border-[#7c5cff]
              focus:ring-2
              focus:ring-[#7c5cff]/10
              ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-slate-200 dark:border-white/10"
              }
            `}
          />

          {errors.email && touched.email && (
            <span className="text-red-500 text-[11px] mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            htmlFor="password"
          >
            Password
          </label>

          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="••••••••"
              className={`
                w-full h-[42px]
                px-3 pr-10
                rounded-lg
                border
                bg-slate-50 dark:bg-white/[0.03]
                text-[13px]
                text-black dark:text-white
                placeholder:text-slate-400
                outline-none
                transition-all
                focus:border-[#7c5cff]
                focus:ring-2
                focus:ring-[#7c5cff]/10
                ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-slate-200 dark:border-white/10"
                }
              `}
            />

            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-[#7c5cff]"
                size={18}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-[#7c5cff]"
                size={18}
                onClick={() => setShow(false)}
              />
            )}
          </div>

          {errors.password && touched.password && (
            <span className="text-red-500 text-[11px] mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="
            w-full
            h-[42px]
            rounded-lg
            mt-2
            text-[13px]
            font-semibold
            text-white
            bg-gradient-to-r
            from-[#7c5cff]
            to-[#a66cff]
            shadow-[0_8px_25px_-10px_rgba(124,92,255,0.7)]
            hover:shadow-[0_10px_30px_-8px_rgba(124,92,255,0.8)]
            hover:-translate-y-[1px]
            transition-all
          "
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;