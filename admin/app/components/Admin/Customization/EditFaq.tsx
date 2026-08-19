import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq || []);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        question: "",
        answer: "",
      },
    ]);
  };

  // Function to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="w-full mt-0 hero-glass dark:bg-[#111C43]/60 bg-white/80 border border-slate-200 dark:border-white/10 shadow-lg p-8 rounded-xl max-w-[800px] mx-auto mb-[100px]">
            <h1 className={`${styles.title} !text-[24px] font-semibold text-slate-800 dark:text-white mb-6 text-center`}>
              Edit FAQ
            </h1>
            <div className="space-y-4">
              <dl className="space-y-4">
                {questions?.map((q: any) => (
                  <div
                    key={q._id}
                    className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-white/10 transition-colors hover:border-slate-300 dark:hover:border-white/20"
                  >
                    <dt className="text-lg">
                      <div className="flex items-start justify-between w-full">
                        <input
                          className="flex-1 bg-transparent outline-none font-Poppins text-[16px] font-medium text-slate-800 dark:text-white placeholder:text-slate-400"
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                          placeholder={"Add your question..."}
                        />

                        <button
                          className="ml-4 p-2 text-slate-500 hover:text-[var(--hero-accent)] hover:bg-[var(--hero-accent)]/10 rounded-full transition-colors flex-shrink-0"
                          onClick={() => toggleQuestion(q._id)}
                        >
                          {q.active ? (
                            <HiMinus className="h-5 w-5" />
                          ) : (
                            <HiPlus className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </dt>
                    {q.active && (
                      <dd className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex items-start gap-4">
                        <textarea
                          className="flex-1 bg-transparent outline-none font-Poppins text-[14px] text-slate-600 dark:text-slate-300 placeholder:text-slate-400 resize-none min-h-[80px]"
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder={"Add your answer..."}
                        />
                        <button
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors flex-shrink-0"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        >
                          <AiOutlineDelete className="text-[20px]" />
                        </button>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
              
              <div className="w-full flex justify-center mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--hero-accent)] bg-[var(--hero-accent)]/10 hover:bg-[var(--hero-accent)]/20 transition-colors font-Poppins font-medium"
                  onClick={newFaqHandler}
                >
                  <IoMdAddCircleOutline className="text-[20px]" />
                  Add Question
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                className={`
                  px-6 py-2.5 rounded-lg font-Poppins font-medium transition-all shadow-md
                  ${
                    areQuestionsUnchanged(data.layout?.faq, questions) ||
                    isAnyQuestionEmpty(questions)
                      ? "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-[#45CBA0] hover:bg-[#3ba885] text-white hover:shadow-lg hover:-translate-y-0.5"
                  }
                `}
                disabled={areQuestionsUnchanged(data.layout?.faq, questions) || isAnyQuestionEmpty(questions)}
                onClick={
                  areQuestionsUnchanged(data.layout?.faq, questions) ||
                  isAnyQuestionEmpty(questions)
                    ? () => null
                    : handleEdit
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default EditFaq;