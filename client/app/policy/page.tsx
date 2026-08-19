"use client";
import React from "react";
import Heading from "../utils/Heading";
import Policy from "./Policy";

type Props = {};

const Page = (props: Props) => {

  return (
    <div className="pt-[65px] min-h-screen">
      <Heading
        title="Policy - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <Policy />
    </div>
  );
};

export default Page;