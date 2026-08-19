import React from "react";

const About = () => {
  return (
    <main className="w-[92%] md:w-[85%] mx-auto pt-12 md:pt-16 pb-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[#7c5cff] font-Poppins mb-3">
          About LearnEx
        </p>

        <h1 className="font-Poppins text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Learn with purpose.
          <br />
          Build with confidence.
        </h1>

        <p className="mt-5 text-base md:text-lg leading-8 text-slate-500 dark:text-slate-400 font-Poppins">
          LearnEx is a learning platform focused on helping aspiring
          developers turn programming knowledge into practical skills.
        </p>
      </div>

      {/* Content */}
      <div className="mt-14 max-w-4xl">
        <div className="space-y-8 text-[15px] md:text-base leading-8 text-slate-600 dark:text-slate-300 font-Poppins">
          <p>
            Learning to program can feel overwhelming. There are countless
            technologies to learn, tutorials to watch, and projects to build.
            LearnEx was created to make that journey simpler and more focused.
          </p>

          <p>
            Our goal is straightforward: help developers learn the skills they
            actually need to build useful software. Instead of focusing only
            on theory, LearnEx encourages learning through practical examples,
            projects, and real development workflows.
          </p>

          <p>
            Whether you are writing your first lines of code or working toward
            becoming a professional developer, the platform is designed to
            give you a clear place to learn, practice, and grow.
          </p>

          <p>
            We believe quality education should be accessible. That is why
            LearnEx focuses on creating useful courses and learning resources
            without making the learning experience unnecessarily complicated.
          </p>

          <p>
            More than a collection of courses, LearnEx aims to become a place
            where developers can continue learning, share knowledge, and build
            the confidence required to work on real-world applications.
          </p>
        </div>

        {/* Founder */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-white/10">
          <p className="text-lg font-medium font-Poppins text-slate-900 dark:text-white">
            Sheraz Hussain
          </p>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-Poppins">
            Founder & CEO, LearnEx
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;