"use client";

import React, { FC, useEffect, useState } from "react";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import SideBarProfile from "./SideBarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [logout, setLogout] = useState(false);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([]);

  const { data } = useGetUsersAllCoursesQuery(undefined, {});

  useLogOutQuery(undefined, {
    skip: !logout,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    setAvatar(user?.avatar?.url || null);
  }, [user]);

  useEffect(() => {
    if (data && user?.courses) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find(
            (course: any) => course._id === userCourse._id || course._id === userCourse.courseId
          )
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#07070c]">
      <div className="mx-auto w-[92%] max-w-[1100px] py-10 md:py-14">

        {/* Page heading */}
        <div className="mb-10">
          <h1 className="font-Poppins text-2xl font-semibold tracking-tight text-black dark:text-white md:text-[28px]">
            Account settings
          </h1>

          <p className="mt-1.5 font-Josefin text-[15px] text-gray-500 dark:text-gray-400">
            Manage your profile, security and courses.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:items-start">

          {/* Sidebar */}
          <aside className="w-full md:sticky md:top-24 md:w-[230px] md:shrink-0">
            <SideBarProfile
              user={user}
              active={active}
              avatar={avatar}
              setActive={setActive}
              logOutHandler={logOutHandler}
            />
          </aside>

          {/* Main content */}
          <section className="min-w-0 flex-1 max-w-[100%] md:border-l md:border-gray-200 md:pl-10 md:dark:border-white/10">

            {active === 1 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-Poppins text-lg font-semibold text-black dark:text-white">
                    Profile information
                  </h2>

                  <p className="mt-1 font-Josefin text-[13.5px] text-gray-500 dark:text-gray-400">
                    Update the information associated with your account.
                  </p>
                </div>

                <ProfileInfo avatar={avatar} user={user} />
              </div>
            )}

            {active === 2 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-Poppins text-lg font-semibold text-black dark:text-white">
                    Change password
                  </h2>

                  <p className="mt-1 font-Josefin text-[13.5px] text-gray-500 dark:text-gray-400">
                    Choose a strong password to keep your account secure.
                  </p>
                </div>

                <ChangePassword />
              </div>
            )}

            {active === 3 && (
              <div className="w-full">
                <div className="mb-7">
                  <h2 className="font-Poppins text-lg font-semibold text-black dark:text-white">
                    Enrolled courses
                  </h2>

                  <p className="mt-1 font-Josefin text-[13.5px] text-gray-500 dark:text-gray-400">
                    Courses you have purchased will appear here.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-8 dark:border-white/10">
                  {courses.length === 0 ? (
                    <p className="font-Josefin text-[14px] text-gray-500 dark:text-gray-400">
                      You haven't enrolled in any courses yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      {courses.map((item: any, index: number) => (
                        <CourseCard item={item} key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;