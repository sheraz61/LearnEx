"use client";
import React from "react";
import Heading from "../utils/Heading";
import About from "./About";

type Props = {};

const Page = (props: Props) => {

  return (
    <div className="pt-[65px] min-h-screen">
      <Heading
        title="About us - LearnEx"
        description="LearnEx is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <About />
    </div>
  );
};

export default Page;