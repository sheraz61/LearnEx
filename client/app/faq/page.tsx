"use client";
import React from "react";
import Heading from "../utils/Heading";
import FAQ from "../components/FAQ/FAQ";

type Props = {};

const Page = (props: Props) => {

  return (
    <div className="pt-[65px] min-h-screen">
      <Heading
        title="FAQ - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <br />
      <FAQ />
    </div>
  );
};

export default Page;