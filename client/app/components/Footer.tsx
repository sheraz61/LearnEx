import Link from "next/link";
import React from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { SiLeetcode, SiMedium } from "react-icons/si";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* ==================== AMBIENT GLOW ==================== */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/2
          h-64
          w-96
          -translate-x-1/2
          rounded-full
          bg-[#7c5cff]/5
          blur-[100px]
        "
      />

      {/* ==================== TOP BORDER ==================== */}
      <div className="mx-auto w-[92%]">
        <div
          className="
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-slate-300
            to-transparent
            dark:via-white/10
          "
        />
      </div>

      {/* ==================== FOOTER CONTENT ==================== */}
      <div className="relative mx-auto w-[92%] max-w-[1400px] px-0 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* ==================== BRAND ==================== */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="
                inline-block
                font-Poppins
                text-2xl
                font-semibold
                tracking-[-0.04em]
                text-slate-950
                dark:text-white
              "
            >
              Learn
              <span className="hero-gradient-text">Ex</span>
            </Link>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                leading-7
                text-slate-500
                dark:text-white/40
              "
            >
              A modern learning platform built to help you
              learn practical skills, explore new ideas, and
              keep growing.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              <Link
                href="https://github.com/sheraz61"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white/50
                  text-slate-500
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#7c5cff]/30
                  hover:bg-[#7c5cff]/10
                  hover:text-[#7c5cff]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                  dark:text-white/50
                  dark:hover:border-[#7c5cff]/30
                  dark:hover:bg-[#7c5cff]/10
                  dark:hover:text-[#a994ff]
                "
              >
                <FiGithub size={18} />
              </Link>

              <Link
                href="https://linkedin.com/in/hsheraz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white/50
                  text-slate-500
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#7c5cff]/30
                  hover:bg-[#7c5cff]/10
                  hover:text-[#7c5cff]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                  dark:text-white/50
                  dark:hover:border-[#7c5cff]/30
                  dark:hover:bg-[#7c5cff]/10
                  dark:hover:text-[#a994ff]
                "
              >
                <FiLinkedin size={18} />
              </Link>

              <Link
                href="https://leetcode.com/sheraz1_2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white/50
                  text-slate-500
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#7c5cff]/30
                  hover:bg-[#7c5cff]/10
                  hover:text-[#7c5cff]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                  dark:text-white/50
                  dark:hover:border-[#7c5cff]/30
                  dark:hover:bg-[#7c5cff]/10
                  dark:hover:text-[#a994ff]
                "
              >
                <SiLeetcode size={17} />
              </Link>

              <Link
                href="https://medium.com/@sheraz12"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white/50
                  text-slate-500
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#7c5cff]/30
                  hover:bg-[#7c5cff]/10
                  hover:text-[#7c5cff]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                  dark:text-white/50
                  dark:hover:border-[#7c5cff]/30
                  dark:hover:bg-[#7c5cff]/10
                  dark:hover:text-[#a994ff]
                "
              >
                <SiMedium size={18} />
              </Link>
            </div>
          </div>

          {/* ==================== ABOUT ==================== */}
          <div className="lg:col-span-2">
            <h3 className="font-Poppins text-sm font-semibold text-slate-900 dark:text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-300
                    hover:text-[#7c5cff]
                    dark:text-white/40
                    dark:hover:text-[#a994ff]
                  "
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-300
                    hover:text-[#7c5cff]
                    dark:text-white/40
                    dark:hover:text-[#a994ff]
                  "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-300
                    hover:text-[#7c5cff]
                    dark:text-white/40
                    dark:hover:text-[#a994ff]
                  "
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* ==================== QUICK LINKS ==================== */}
          <div className="lg:col-span-2">
            <h3 className="font-Poppins text-sm font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-300
                    hover:text-[#7c5cff]
                    dark:text-white/40
                    dark:hover:text-[#a994ff]
                  "
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-300
                    hover:text-[#7c5cff]
                    dark:text-white/40
                    dark:hover:text-[#a994ff]
                  "
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-300
                    hover:text-[#7c5cff]
                    dark:text-white/40
                    dark:hover:text-[#a994ff]
                  "
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* ==================== CONTACT ==================== */}
          <div className="lg:col-span-4">
            <h3 className="font-Poppins text-sm font-semibold text-slate-900 dark:text-white">
              Get in touch
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#7c5cff]/10
                    text-[#7c5cff]
                  "
                >
                  <FiMail size={15} />
                </span>

                <div>
                  <p className="text-xs text-slate-400 dark:text-white/25">
                    Email
                  </p>

                  <a
                    href="mailto:hello@elearning.com"
                    className="
                      text-sm
                      text-slate-600
                      transition-colors
                      hover:text-[#7c5cff]
                      dark:text-white/50
                      dark:hover:text-[#a994ff]
                    "
                  >
                    hsheraz271@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#7c5cff]/10
                    text-[#7c5cff]
                  "
                >
                  <FiMapPin size={15} />
                </span>

                <div>
                  <p className="text-xs text-slate-400 dark:text-white/25">
                    Location
                  </p>

                  <p className="text-sm text-slate-600 dark:text-white/50">
                    Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM ==================== */}
        <div
          className="
            mt-14
            flex
            flex-col
            gap-4
            border-t
            border-slate-200/70
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.07]
          "
        >
          <p className="text-xs text-slate-400 dark:text-white/30">
            © 2026 LearnEx. All rights reserved.
          </p>

          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-medium
              text-slate-400
              transition-colors
              hover:text-[#7c5cff]
              dark:text-white/30
              dark:hover:text-[#a994ff]
            "
          >
            Back to top
            <FiArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;