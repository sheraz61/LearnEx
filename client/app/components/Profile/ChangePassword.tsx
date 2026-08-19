"use client";

import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";

type Props = {};

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [
    updatePassword,
    { isSuccess, error, isLoading },
  ] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await updatePassword({
      oldPassword,
      newPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error]);

  const fields = [
    {
      id: "old-password",
      label: "Current password",
      value: oldPassword,
      set: setOldPassword,
      show: showOld,
      setShow: setShowOld,
    },
    {
      id: "new-password",
      label: "New password",
      value: newPassword,
      set: setNewPassword,
      show: showNew,
      setShow: setShowNew,
    },
    {
      id: "confirm-password",
      label: "Confirm new password",
      value: confirmPassword,
      set: setConfirmPassword,
      show: showConfirm,
      setShow: setShowConfirm,
    },
  ];

  return (
    <form
      onSubmit={passwordChangeHandler}
      className="w-full max-w-md"
    >
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-2 block font-Poppins text-sm font-medium text-black dark:text-white"
            >
              {field.label}
            </label>

            <div className="relative">
              <input
                id={field.id}
                type={field.show ? "text" : "password"}
                required
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-gray-200
                  bg-transparent
                  px-3
                  pr-10
                  font-Josefin
                  text-[15px]
                  text-black
                  outline-none
                  transition-colors
                  focus:border-[#7c5cff]
                  dark:border-white/10
                  dark:text-white
                  dark:focus:border-[#7c5cff]
                "
              />

              <button
                type="button"
                onClick={() => field.setShow(!field.show)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                {field.show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="
              rounded-md
              bg-[#7c5cff]
              px-5
              py-2
              font-Poppins
              text-[14px]
              font-[500]
              text-white
              transition-colors
              hover:bg-[#6f51e8]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isLoading ? "Updating..." : "Update password"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;