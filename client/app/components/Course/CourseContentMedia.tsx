import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/coursePlayer";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setactiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const course = courseData?.course;
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      toast.success('question create successfully')
      refetch();
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: `New Reply Received`,
          message: `You have a new question in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-full py-4">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      <div className="w-full flex items-center justify-between mt-4">
        <button
          type="button"
          disabled={activeVideo === 0}
          className={`flex items-center gap-1.5 rounded-md border px-4 py-2 font-Poppins text-[13px] font-[500] transition-colors ${activeVideo === 0
              ? "cursor-not-allowed border-slate-200 text-slate-300 dark:border-white/10 dark:text-white/20"
              : "border-slate-200 text-slate-700 hover:border-[#7c5cff] hover:text-[#7c5cff] dark:border-white/10 dark:text-slate-300"
            }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft size={14} />
          Prev Lesson
        </button>

        <button
          type="button"
          disabled={data.length - 1 === activeVideo}
          className={`flex items-center gap-1.5 rounded-md border px-4 py-2 font-Poppins text-[13px] font-[500] transition-colors ${data.length - 1 === activeVideo
              ? "cursor-not-allowed border-slate-200 text-slate-300 dark:border-white/10 dark:text-white/20"
              : "border-slate-200 text-slate-700 hover:border-[#7c5cff] hover:text-[#7c5cff] dark:border-white/10 dark:text-slate-300"
            }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight size={14} />
        </button>
      </div>

      <h1 className="mt-5 text-[22px] md:text-[26px] font-Poppins font-[600] text-slate-900 dark:text-white leading-tight">
        {data[activeVideo].title}
      </h1>

      <div className="mt-5 flex w-full items-center gap-6 border-b border-slate-200 dark:border-white/10 ">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <button
            type="button"
            key={index}
            className={`shrink-0 -mb-px border-b-2 px-1 py-3 font-Poppins text-[14px] font-[500] transition-colors ${activeBar === index
                ? "border-[#7c5cff] text-[#7c5cff]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            onClick={() => setactiveBar(index)}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {activeBar === 0 && (
          <p className="text-[16px] leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
            {data[activeVideo]?.description}
          </p>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div className="mb-4" key={index}>
                <span className="font-Poppins text-[15px] font-[500] text-slate-900 dark:text-white">
                  {item.title && item.title + " : "}
                </span>
                <a
                  className="text-[15px] text-[#7c5cff] hover:underline"
                  href={item.url}
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex w-full gap-3">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                }
                width={44}
                height={44}
                alt=""
                className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
              />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                placeholder="Write your question..."
                className="w-full rounded-md border border-slate-200 bg-transparent p-3 text-[15px] font-Poppins text-slate-900 outline-none focus:border-[#7c5cff] dark:border-white/10 dark:text-white"
              ></textarea>
            </div>
            <div className="w-full flex justify-end mt-3">
              <button
                type="button"
                disabled={questionCreationLoading}
                className="rounded-md bg-[#7c5cff] px-5 py-2 font-Poppins text-[14px] font-[500] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                onClick={questionCreationLoading ? () => { } : handleQuestion}
              >
                Submit
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                questionId={questionId}
                setQuestionId={setQuestionId}
                answerCreationLoading={answerCreationLoading}
              />
            </div>
          </>
        )}

        {activeBar === 3 && (
          <div className="w-full">
            {!isReviewExists && (
              <>
                <div className="flex w-full gap-3">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    width={44}
                    height={44}
                    alt=""
                    className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
                  />
                  <div className="w-full">
                    <h5 className="text-[15px] font-[500] text-slate-900 dark:text-white mb-1">
                      Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={22}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={22}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      placeholder="Write your comment..."
                      className="w-full rounded-md border border-slate-200 bg-transparent p-3 text-[15px] font-Poppins text-slate-900 outline-none focus:border-[#7c5cff] dark:border-white/10 dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end mt-3">
                  <button
                    type="button"
                    disabled={reviewCreationLoading}
                    className="rounded-md bg-[#7c5cff] px-5 py-2 font-Poppins text-[14px] font-[500] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    onClick={
                      reviewCreationLoading ? () => { } : handleReviewSubmit
                    }
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 space-y-6">
              {(course?.reviews && [...course.reviews].reverse())?.map(
                (item: any, index: number) => {
                  return (
                    <div className="w-full" key={index}>
                      <div className="w-full flex gap-3">
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={44}
                          height={44}
                          alt=""
                          className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
                        />
                        <div className="w-full">
                          <h1 className="text-[15px] font-[500] text-slate-900 dark:text-white">{item?.user.name}</h1>
                          <Ratings rating={item.rating} />
                          <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-300">{item.comment}</p>
                          <small className="text-slate-400 dark:text-white/40">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>

                      {user.role === "admin" && item.commentReplies.length === 0 && (
                        <button
                          type="button"
                          className="mt-2 ml-[56px] text-[13px] font-[500] text-[#7c5cff] hover:underline"
                          onClick={() => {
                            setIsReviewReply(true);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply
                        </button>
                      )}

                      {isReviewReply && reviewId === item._id && (
                        <div className="w-full flex relative ml-[56px] mt-2">
                          <input
                            type="text"
                            placeholder="Enter your reply..."
                            value={reply}
                            onChange={(e: any) => setReply(e.target.value)}
                            className="block outline-none bg-transparent border-b border-slate-300 dark:border-white/20 p-1 w-full text-[14px] text-slate-900 dark:text-white"
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1 text-[13px] font-[500] text-[#7c5cff]"
                            onClick={handleReviewReplySubmit}
                          >
                            Submit
                          </button>
                        </div>
                      )}

                      {item.commentReplies.map((i: any, index: number) => (
                        <div className="w-full flex gap-3 mt-4 ml-[56px]" key={index}>
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={40}
                            height={40}
                            alt=""
                            className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-[14px] font-[500] text-slate-900 dark:text-white">
                                {i.user.name}
                              </h5>
                              <VscVerifiedFilled className="text-[#0095F6] text-[16px]" />
                            </div>
                            <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-300">{i.comment}</p>
                            <small className="text-slate-400 dark:text-white/40">
                              {format(i.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <div className="w-full space-y-6">
      {data[activeVideo].questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          item={item}
          index={index}
          answer={answer}
          setAnswer={setAnswer}
          questionId={questionId}
          setQuestionId={setQuestionId}
          handleAnswerSubmit={handleAnswerSubmit}
          answerCreationLoading={answerCreationLoading}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);
  return (
    <div>
      <div className="flex gap-3 mb-2">
        <Image
          src={
            item.user.avatar
              ? item.user.avatar.url
              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
          }
          width={44}
          height={44}
          alt=""
          className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
        />
        <div>
          <h5 className="text-[15px] font-[500] text-slate-900 dark:text-white">{item?.user.name}</h5>
          <p className="text-[14px] text-slate-600 dark:text-slate-300">{item?.question}</p>
          <small className="text-slate-400 dark:text-white/40">
            {!item.createdAt ? "" : format(item?.createdAt)}
          </small>
        </div>
      </div>

      <div className="w-full flex items-center gap-1.5 ml-[56px]">
        <button
          type="button"
          className="text-[13px] font-[500] text-slate-500 hover:text-[#7c5cff] dark:text-slate-400"
          onClick={() => {
            setreplyActive(!replyActive);
            setQuestionId(item._id);
          }}
        >
          {!replyActive
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </button>
        <BiMessage size={16} className="text-slate-400 dark:text-slate-500 ml-2" />
        <span className="text-[13px] text-slate-400 dark:text-slate-500">
          {item.questionReplies.length}
        </span>
      </div>

      {replyActive && questionId === item._id && (
        <>
          {item.questionReplies.map((item: any) => (
            <div className="w-full flex gap-3 mt-4 ml-[56px]" key={item._id}>
              <Image
                src={
                  item.user.avatar
                    ? item.user.avatar.url
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                }
                width={40}
                height={40}
                alt=""
                className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="text-[14px] font-[500] text-slate-900 dark:text-white">{item.user.name}</h5>
                  {item.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[#0095F6] text-[16px]" />
                  )}
                </div>
                <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-300">{item.answer}</p>
                <small className="text-slate-400 dark:text-white/40">
                  {format(item.createdAt)}
                </small>
              </div>
            </div>
          ))}

          <div className="w-full flex relative ml-[56px] mt-3">
            <input
              type="text"
              placeholder="Enter your answer..."
              value={answer}
              onChange={(e: any) => setAnswer(e.target.value)}
              className="block outline-none bg-transparent border-b border-slate-300 dark:border-white/20 p-1 w-full text-[14px] text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-0 bottom-1 text-[13px] font-[500] text-[#7c5cff] disabled:opacity-40"
              onClick={handleAnswerSubmit}
              disabled={answer === "" || answerCreationLoading}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseContentMedia;