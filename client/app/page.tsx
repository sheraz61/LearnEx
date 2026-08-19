"use client";
import React, { FC } from "react";
import Heading from "./utils/Heading";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";

interface Props { }

const Page: FC<Props> = (props) => {
  return (
    <div className="pt-[65px] min-h-screen">
      <Heading
        title="LearnEx | Learning Managment System"
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default Page;
