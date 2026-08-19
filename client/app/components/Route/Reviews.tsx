import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment:
      "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-learning!",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer systems engineering student | Zimbabwe",
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment:
      "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. For that any person at beginner-level can complete an integrated project when he watches the videos. Thank you very much.",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full stack web developer | Canada",
    comment:
      "Join E-learning! E-learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish.",
  },
];

const Reviews = (props: Props) => {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-120px] top-20 -z-10 h-[350px] w-[350px] rounded-full bg-[#7c5cff]/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-[-120px] -z-10 h-[350px] w-[350px] rounded-full bg-[#f5b74d]/5 blur-[120px]" />

      <div className="w-[92%] md:w-[88%] lg:w-[84%] mx-auto">
        {/* Intro */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* Glow behind image */}
            <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/10 blur-[80px]" />

            <div
              className="
                relative overflow-hidden rounded-3xl
                border border-slate-200/80
                bg-white/60
                p-3
                shadow-[0_20px_60px_rgba(15,23,42,0.06)]
                backdrop-blur-xl
                dark:border-white/[0.08]
                dark:bg-white/[0.025]
                dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]
              "
            >
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={require("../../../public/assets/business-img.png")}
                  alt="LearnEx students"
                  width={700}
                  height={700}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* Floating rating badge */}
              <div
                className="
                  absolute bottom-7 left-7
                  flex items-center gap-3
                  rounded-2xl
                  border border-white/20
                  bg-white/80
                  px-4 py-3
                  shadow-lg
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-[#111116]/80
                "
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7c5cff]/10">
                  <span className="text-sm text-[#7c5cff]">★</span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Student Reviews
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real learning experiences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/15 bg-[#7c5cff]/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7c5cff]" />

              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Student Feedback
              </span>
            </div>

            <h3 className="font-Poppins text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[42px]">
              Our Students Are{" "}
              <span className="hero-gradient-text">
                Our Strength
              </span>
              <br />
              See What They Say About Us
            </h3>

            <p className="mt-6 max-w-xl font-Poppins text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              Every learner has a different journey. Here's what some of our
              students and developers have to say about their experience
              learning with LearnEx.
            </p>

            {/* Small stats */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.025]">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  5.0
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Average rating
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.025]">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  100%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Student focused
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          {reviews.map((item, index) => (
            <ReviewCard item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;