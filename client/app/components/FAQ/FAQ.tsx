"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Question = {
  _id: string;
  question: string;
  answer: string;
};

const FAQ = () => {
  const { data } = useGetHeroDataQuery("FAQ", {});

  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion((current) => (current === id ? null : id));
  };

  return (
    <main className="w-[92%] md:w-[80%] xl:w-[75%] mx-auto pt-12 md:pt-16 pb-16">
      {/* Heading */}
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[#7c5cff] font-Poppins mb-3">
          Help Center
        </p>

        <h1 className="font-Poppins text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Frequently asked questions
        </h1>

        <p className="mt-4 text-sm md:text-base leading-7 text-slate-500 dark:text-slate-400 font-Poppins">
          Find answers to common questions about LearnEx, courses, accounts,
          and learning.
        </p>
      </div>

      {/* Questions */}
      <div className="mt-12 border-t border-slate-200 dark:border-white/10">
        {questions.map((question) => {
          const isOpen = activeQuestion === question._id;

          return (
            <div
              key={question._id}
              className="border-b border-slate-200 dark:border-white/10"
            >
              <button
                type="button"
                onClick={() => toggleQuestion(question._id)}
                className="w-full py-6 flex items-center justify-between gap-6 text-left"
              >
                <span className="text-[15px] md:text-base font-medium font-Poppins text-slate-900 dark:text-white">
                  {question.question}
                </span>

                <span className="shrink-0 text-slate-400 dark:text-slate-500">
                  {isOpen ? (
                    <HiMinus size={18} />
                  ) : (
                    <HiPlus size={18} />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="pb-6 pr-10">
                  <p className="text-sm md:text-[15px] leading-7 font-Poppins text-slate-500 dark:text-slate-400">
                    {question.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default FAQ;