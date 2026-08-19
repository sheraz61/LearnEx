import {
  useActivationMutation,
} from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);

  const [activation, { isSuccess, error }] =
    useActivationMutation();

  const [invalidError, setInvalidError] =
    useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] =
    useState<VerifyNumber>({
      0: "",
      1: "",
      2: "",
      3: "",
    });

  const verificationHandler = async () => {
    const verificationNumber =
      Object.values(verifyNumber).join("");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activationToken: token,
      activationCode: verificationNumber,
    });
  };

  const handleInputChange = (
    index: number,
    value: string
  ) => {
    setInvalidError(false);

    const newVerifyNumber = {
      ...verifyNumber,
      [index]: value,
    };

    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="text-center mb-5">
        <div
          className="
            mx-auto
            w-[52px] h-[52px]
            rounded-full
            flex items-center justify-center
            bg-[#7c5cff]/10
            border border-[#7c5cff]/20
          "
        >
          <VscWorkspaceTrusted
            size={25}
            className="text-[#7c5cff]"
          />
        </div>

        <h1 className="text-[22px] mt-3 font-Poppins font-semibold text-black dark:text-white">
          Verify your account
        </h1>

        <p className="text-[12px] mt-1 text-slate-500 dark:text-slate-400">
          Enter the 4-digit code sent to your email
        </p>
      </div>

      {/* OTP */}
      <div className="flex justify-center gap-2.5">

        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            inputMode="numeric"
            key={key}
            ref={inputRefs[index]}
            maxLength={1}
            value={
              verifyNumber[
                key as keyof VerifyNumber
              ]
            }
            onChange={(e) =>
              handleInputChange(
                index,
                e.target.value.replace(/\D/g, "")
              )
            }
            className={`
              w-[52px] h-[55px]
              rounded-xl
              border
              bg-slate-50 dark:bg-white/[0.03]
              text-center
              text-[20px]
              font-semibold
              text-black dark:text-white
              outline-none
              transition-all
              focus:border-[#7c5cff]
              focus:ring-2
              focus:ring-[#7c5cff]/10
              ${
                invalidError
                  ? "border-red-500 shake"
                  : "border-slate-200 dark:border-white/10"
              }
            `}
          />
        ))}

      </div>

      {/* Button */}
      <button
        type="button"
        onClick={verificationHandler}
        className="
          w-full
          h-[42px]
          mt-5
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
        Verify Account
      </button>

      {/* Back */}
      <p className="text-center text-[12px] mt-4 text-slate-500 dark:text-slate-400">
        Want to go back?

        <button
          type="button"
          className="ml-1 text-[#7c5cff] font-medium"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </button>
      </p>

    </div>
  );
};

export default Verification;