"use client";

import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const [register, { data, error, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: async ({ name, email, password }) => {
      await register({
        name,
        email,
        password,
      });
    },
  });

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
      <div className="text-center ">
        <h1 className="text-[22px] sm:text-[24px] font-Poppins font-semibold text-black dark:text-white">
          Create your account
        </h1>

        <p className="text-[13px] mt-1 text-slate-500 dark:text-slate-400">
          Start learning with LearnEx
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-3.5">
          <label
            className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            htmlFor="name"
          >
            Full name
          </label>

          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="John Doe"
            className={`
              w-full h-[40px]
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
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-slate-200 dark:border-white/10"
              }
            `}
          />

          {errors.name && touched.name && (
            <span className="text-red-500 text-[11px] mt-1 block">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mb-3.5">
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
            placeholder="you@example.com"
            className={`
              w-full h-[40px]
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
                w-full h-[40px]
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

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full h-[40px]
            rounded-lg
            text-[13px]
            font-semibold
            text-white
            bg-gradient-to-r
            from-[#7c5cff]
            to-[#a66cff]
            shadow-[0_8px_25px_-10px_rgba(124,92,255,0.7)]
            hover:-translate-y-[1px]
            transition-all
          "
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

          <span className="text-[10px] text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        {/* Social */}
        <div className="flex justify-center gap-3">

          <button
            type="button"
            className="
              w-[44px] h-[38px]
              flex items-center justify-center
              rounded-lg
              border border-slate-200 dark:border-white/10
              bg-slate-50 dark:bg-white/[0.03]
            "
          >
            <FcGoogle size={20} />
          </button>

          <button
            type="button"
            className="
              w-[44px] h-[38px]
              flex items-center justify-center
              rounded-lg
              border border-slate-200 dark:border-white/10
              bg-slate-50 dark:bg-white/[0.03]
            "
          >
            <AiFillGithub
              size={20}
              className="text-black dark:text-white"
            />
          </button>

        </div>

        {/* Login */}
        <p className="text-center text-[12px] mt-4 text-slate-500 dark:text-slate-400">
          Already have an account?

          <button
            type="button"
            className="ml-1 text-[#7c5cff] font-medium"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </button>
        </p>

      </form>
    </div>
  );
};

export default Signup;