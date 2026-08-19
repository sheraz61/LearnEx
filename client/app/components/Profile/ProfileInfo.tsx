"use client";

import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.png";

import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [loadUser, setLoadUser] = useState(false);

  const [updateAvatar, { isSuccess, error, isLoading: avatarLoading }] =
    useUpdateAvatarMutation();

  const [
    editProfile,
    {
      isSuccess: success,
      error: updateError,
      isLoading: profileLoading,
    },
  ] = useEditProfileMutation();

  useLoadUserQuery(undefined, {
    skip: !loadUser,
  });

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success("Profile picture updated successfully!");
    }

    if (success) {
      setLoadUser(true);
      toast.success("Profile updated successfully!");
    }

    if (error || updateError) {
      console.log(error || updateError);
    }
  }, [isSuccess, error, success, updateError]);

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        updateAvatar(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    await editProfile({
      name: name.trim(),
    });
  };

  const profileImage =
    user?.avatar?.url || avatar || avatarIcon;

  const nameUnchanged = name.trim() === (user?.name || "").trim();

  return (
    <div className="w-full max-w-md">
      {/* Avatar */}
      <div className="mb-9 flex items-center gap-5">
        <div className="relative">
          <Image
            src={profileImage}
            alt="Profile avatar"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10"
          />

          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
            disabled={avatarLoading}
          />

          <label
            htmlFor="avatar"
            className={`absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cff] text-white transition-colors hover:bg-[#6f51e8] ${
              avatarLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            <AiOutlineCamera size={14} />
          </label>
        </div>

        <div>
          <p className="font-Poppins text-sm font-medium text-black dark:text-white">
            Profile photo
          </p>

          <p className="mt-0.5 font-Josefin text-[13px] text-gray-500 dark:text-gray-400">
            {avatarLoading ? "Uploading..." : "JPG, PNG or WebP. Max 5MB."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="full-name"
              className="mb-2 block font-Poppins text-sm font-medium text-black dark:text-white"
            >
              Full name
            </label>

            <input
              id="full-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                h-10
                w-full
                rounded-md
                border
                border-gray-200
                bg-transparent
                px-3
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
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-Poppins text-sm font-medium text-black dark:text-white"
            >
              Email address
            </label>

            <input
              id="email"
              type="text"
              readOnly
              value={user?.email || ""}
              className="
                h-10
                w-full
                cursor-not-allowed
                rounded-md
                border
                border-gray-200
                bg-gray-50
                px-3
                font-Josefin
                text-[15px]
                text-gray-500
                outline-none
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-gray-500
              "
            />

            <p className="mt-2 font-Josefin text-xs text-gray-400 dark:text-gray-500">
              Email address cannot be changed here.
            </p>
          </div>

          {/* Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={profileLoading || nameUnchanged || !name.trim()}
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
              {profileLoading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;