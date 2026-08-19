'use client'
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

type Props = {};

const Page: FC<Props> = (props) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="pt-[65px] min-h-screen">
      <Heading
        title={`${user?.name} Profile - LearnEx`}
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />

      <Protected>
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;