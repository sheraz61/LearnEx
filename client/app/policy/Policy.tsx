import React from "react";

const Policy = () => {
  return (
    <main className="w-[92%] md:w-[85%] mx-auto pt-12 md:pt-16 pb-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[#7c5cff] font-Poppins mb-3">
          LearnEx
        </p>

        <h1 className="font-Poppins text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-sm md:text-base leading-7 text-slate-500 dark:text-slate-400 font-Poppins">
          Please read these terms carefully before using the LearnEx
          platform.
        </p>
      </div>

      {/* Content */}
      <article className="mt-12 max-w-4xl space-y-10">
        <section>
          <h2 className="text-lg md:text-xl font-medium font-Poppins text-slate-900 dark:text-white mb-3">
            1. Acceptance of Terms
          </h2>

          <p className="text-sm md:text-[15px] leading-8 font-Poppins text-slate-600 dark:text-slate-400">
            By accessing or using LearnEx, you agree to follow these terms and
            conditions. If you do not agree with any part of these terms, you
            should not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-medium font-Poppins text-slate-900 dark:text-white mb-3">
            2. Use of the Platform
          </h2>

          <p className="text-sm md:text-[15px] leading-8 font-Poppins text-slate-600 dark:text-slate-400">
            LearnEx provides educational content and resources intended for
            personal learning and development. Users are expected to use the
            platform responsibly and respect the rights of other users.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-medium font-Poppins text-slate-900 dark:text-white mb-3">
            3. User Accounts
          </h2>

          <p className="text-sm md:text-[15px] leading-8 font-Poppins text-slate-600 dark:text-slate-400">
            Users are responsible for maintaining the security of their
            accounts and for the information associated with them. You should
            notify LearnEx if you believe your account has been accessed
            without authorization.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-medium font-Poppins text-slate-900 dark:text-white mb-3">
            4. Course Content
          </h2>

          <p className="text-sm md:text-[15px] leading-8 font-Poppins text-slate-600 dark:text-slate-400">
            Course materials available through LearnEx are provided for
            educational purposes. Course content should not be copied,
            redistributed, or used commercially without appropriate
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-medium font-Poppins text-slate-900 dark:text-white mb-3">
            5. Changes to These Terms
          </h2>

          <p className="text-sm md:text-[15px] leading-8 font-Poppins text-slate-600 dark:text-slate-400">
            LearnEx may update these terms when necessary. Any changes will be
            reflected on this page. Continued use of the platform after
            changes are published means you accept the updated terms.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200 dark:border-white/10">
          <p className="text-sm text-slate-400 dark:text-slate-500 font-Poppins">
            Last updated: 2026
          </p>
        </section>
      </article>
    </main>
  );
};

export default Policy;